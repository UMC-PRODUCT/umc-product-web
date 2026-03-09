import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

const ACTIVE_STATUSES = new Set(['CREATED', 'PENDING', 'PROVISIONING', 'RUNNING', 'CANCELLING'])
const SUCCESS_STATUSES = new Set(['SUCCEED'])
const FAILURE_STATUSES = new Set(['FAILED', 'CANCELLED'])

const requireEnv = (name) => {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`${name} is required.`)
  }

  return value
}

const appId = requireEnv('AMPLIFY_APP_ID')
const branchName = requireEnv('AMPLIFY_BRANCH_NAME')
const commitSha = process.env.AMPLIFY_COMMIT_SHA?.trim() ?? ''
const commitWaitMs = Number.parseInt(process.env.AMPLIFY_COMMIT_WAIT_MS ?? '300000', 10)
const pollIntervalMs = Number.parseInt(process.env.AMPLIFY_POLL_INTERVAL_MS ?? '15000', 10)
const timeoutMs = Number.parseInt(process.env.AMPLIFY_TIMEOUT_MS ?? '2700000', 10)
const summaryFile = process.env.GITHUB_STEP_SUMMARY

const appendSummary = (line = '') => {
  if (!summaryFile) return
  appendFileSync(summaryFile, `${line}\n`)
}

const runAws = (...args) => {
  const output = execFileSync('aws', ['amplify', ...args, '--output', 'json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  return output ? JSON.parse(output) : {}
}

const sortByStartTimeDesc = (jobs) =>
  [...jobs].sort((left, right) => {
    const leftTime = new Date(left.startTime ?? 0).getTime()
    const rightTime = new Date(right.startTime ?? 0).getTime()
    return rightTime - leftTime
  })

const commitMatches = (job) => {
  if (!commitSha) return false

  const jobCommitId = `${job.commitId ?? ''}`.trim()
  if (!jobCommitId) return false

  return (
    commitSha === jobCommitId ||
    commitSha.startsWith(jobCommitId) ||
    jobCommitId.startsWith(commitSha)
  )
}

const listJobs = () => {
  const response = runAws(
    'list-jobs',
    '--app-id',
    appId,
    '--branch-name',
    branchName,
    '--max-items',
    '25',
  )
  return Array.isArray(response.jobSummaries) ? response.jobSummaries : []
}

const selectJob = (jobs, allowFallback) => {
  const sortedJobs = sortByStartTimeDesc(jobs)
  const commitJobs = sortedJobs.filter(commitMatches)
  const activeCommitJob = commitJobs.find((job) => ACTIVE_STATUSES.has(job.status))

  if (activeCommitJob) return activeCommitJob
  if (commitJobs.length > 0) return commitJobs[0]
  if (!allowFallback && commitSha) return null

  const activeJob = sortedJobs.find((job) => ACTIVE_STATUSES.has(job.status))
  if (activeJob) return activeJob

  return sortedJobs[0]
}

const getJobDetails = (jobId) => {
  const response = runAws(
    'get-job',
    '--app-id',
    appId,
    '--branch-name',
    branchName,
    '--job-id',
    `${jobId}`,
  )
  const job = response.job ?? {}

  return {
    summary: job.summary ?? {},
    steps: Array.isArray(job.steps) ? job.steps : [],
  }
}

const formatStepState = (step) => {
  const stepName = step.stepName ?? 'unknown'
  const status = step.status ?? 'UNKNOWN'
  return `${stepName}:${status}`
}

const logStepArtifacts = (steps) => {
  for (const step of steps) {
    if (step.logUrl) {
      console.log(`${step.stepName ?? 'unknown'} log: ${step.logUrl}`)
    }
  }
}

const startedAt = Date.now()

appendSummary('## Amplify Build Status')
appendSummary()
appendSummary(`- App ID: \`${appId}\``)
appendSummary(`- Branch: \`${branchName}\``)
appendSummary(`- Commit: \`${commitSha || 'latest'}\``)
appendSummary()

console.log(`Monitoring Amplify app ${appId} on branch ${branchName}`)
if (commitSha) {
  console.log(`Target commit: ${commitSha}`)
}

let targetJob = null

while (!targetJob && Date.now() - startedAt < timeoutMs) {
  const jobs = listJobs()
  const allowFallback = !commitSha || Date.now() - startedAt >= commitWaitMs

  if (jobs.length === 0) {
    console.log('No Amplify jobs found yet. Waiting for a job to start...')
    await sleep(pollIntervalMs)
    continue
  }

  targetJob = selectJob(jobs, allowFallback)

  if (!targetJob) {
    console.log('Waiting for an Amplify job that matches the current commit...')
    await sleep(pollIntervalMs)
  }
}

if (!targetJob) {
  appendSummary('- Final status: `TIMEOUT`')
  throw new Error(`Timed out after ${timeoutMs}ms while waiting for an Amplify job.`)
}

const jobId = `${targetJob.jobId}`
appendSummary(`- Job ID: \`${jobId}\``)

console.log(`Selected Amplify job ${jobId} (${targetJob.status ?? 'UNKNOWN'})`)

let previousStatus = ''
let previousStepSnapshot = ''

while (Date.now() - startedAt < timeoutMs) {
  const { summary, steps } = getJobDetails(jobId)
  const status = `${summary.status ?? targetJob.status ?? 'UNKNOWN'}`
  const stepSnapshot = steps.map(formatStepState).join(' | ')

  if (status !== previousStatus) {
    console.log(`[${new Date().toISOString()}] Amplify job status: ${status}`)
    previousStatus = status
  }

  if (stepSnapshot && stepSnapshot !== previousStepSnapshot) {
    console.log(`Steps: ${stepSnapshot}`)
    previousStepSnapshot = stepSnapshot
  }

  if (SUCCESS_STATUSES.has(status)) {
    appendSummary(`- Final status: \`${status}\``)
    appendSummary()
    appendSummary('Amplify build completed successfully.')
    logStepArtifacts(steps)
    process.exit(0)
  }

  if (FAILURE_STATUSES.has(status)) {
    appendSummary(`- Final status: \`${status}\``)
    appendSummary()
    appendSummary('Amplify build finished with a failure state. Check the step logs above.')
    logStepArtifacts(steps)
    throw new Error(`Amplify job ${jobId} finished with status ${status}.`)
  }

  await sleep(pollIntervalMs)
}

appendSummary('- Final status: `TIMEOUT`')
throw new Error(`Timed out after ${timeoutMs}ms while monitoring Amplify job ${jobId}.`)
