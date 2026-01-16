import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'

export const RECRUITING_TEMP_DRAFT_KEY = 'recruitingTempDraftLoad'

export const requestTempDraftLoad = () => {
  sessionStorage.setItem(RECRUITING_TEMP_DRAFT_KEY, '1')
}

export const consumeTempDraftLoad = () => {
  const shouldLoad = sessionStorage.getItem(RECRUITING_TEMP_DRAFT_KEY) === '1'
  if (shouldLoad) {
    sessionStorage.removeItem(RECRUITING_TEMP_DRAFT_KEY)
  }
  return shouldLoad
}

const parseDate = (value: string | Date | null | undefined) => {
  if (!value) return null
  return value instanceof Date ? value : new Date(value)
}

const getInterviewDateKeys = (start: Date | null, end: Date | null) => {
  if (!start || !end) return []
  const startDate = dayjs(start).startOf('day')
  const endDate = dayjs(end).startOf('day')
  if (endDate.isBefore(startDate, 'day')) return []
  const dates: Array<string> = []
  let current = startDate
  while (!current.isAfter(endDate, 'day')) {
    dates.push(current.format('YYYY-MM-DD'))
    current = current.add(1, 'day')
  }
  return dates
}

export const normalizeTempRecruitingForm = (data: RecruitingForms): RecruitingForms => {
  const schedule = data.schedule
  const interviewStartAt = parseDate(schedule.interviewStartAt)
  const interviewEndAt = parseDate(schedule.interviewEndAt)
  const allowedInterviewDates = getInterviewDateKeys(interviewStartAt, interviewEndAt)
  const normalizedEnabled = schedule.interviewTimeTable.enabled.filter((slot) =>
    allowedInterviewDates.includes(slot.date),
  )
  const dateRange =
    interviewStartAt && interviewEndAt
      ? {
          start: dayjs(interviewStartAt).format('YYYY-MM-DD'),
          end: dayjs(interviewEndAt).format('YYYY-MM-DD'),
        }
      : schedule.interviewTimeTable.dateRange

  return {
    ...data,
    schedule: {
      ...schedule,
      applyStartAt: parseDate(schedule.applyStartAt),
      applyEndAt: parseDate(schedule.applyEndAt),
      docResultAt: parseDate(schedule.docResultAt),
      interviewStartAt,
      interviewEndAt,
      finalResultAt: parseDate(schedule.finalResultAt),
      interviewTimeTable: {
        ...schedule.interviewTimeTable,
        dateRange,
        enabled: normalizedEnabled,
      },
    },
  }
}
