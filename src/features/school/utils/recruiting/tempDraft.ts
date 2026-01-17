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

const formatDateString = (value: string | Date | null | undefined) => {
  if (!value) return null
  return dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ')
}

const getInterviewDateKeys = (start: string | null, end: string | null) => {
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
  const interviewStartAt = formatDateString(schedule.interviewStartAt)
  const interviewEndAt = formatDateString(schedule.interviewEndAt)
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
      applyStartAt: formatDateString(schedule.applyStartAt),
      applyEndAt: formatDateString(schedule.applyEndAt),
      docResultAt: formatDateString(schedule.docResultAt),
      interviewStartAt,
      interviewEndAt,
      finalResultAt: formatDateString(schedule.finalResultAt),
      interviewTimeTable: {
        ...schedule.interviewTimeTable,
        dateRange,
        enabled: normalizedEnabled,
      },
    },
  }
}
