import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'

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

type InterviewDateSlot = {
  date: string
  time?: Array<string>
  times?: Array<string>
}

type InterviewTimeTableWithOptionalEnabled = Omit<
  RecruitingForms['schedule']['interviewTimeTable'],
  'enabledByDate'
> & {
  enabled?: Array<{ date: string; time: Array<string> }>
  enabledByDate?: Array<InterviewDateSlot>
}

const resolveInterviewEnabled = (
  table: InterviewTimeTableWithOptionalEnabled,
): Array<{ date: string; time: Array<string> }> => {
  const fromEnabled = table.enabled
  if (Array.isArray(fromEnabled)) {
    return fromEnabled
  }
  const enabledByDate = table.enabledByDate ?? []
  return enabledByDate.map((slot) => ({
    date: slot.date,
    time: slot.times ?? slot.time ?? [],
  }))
}

export const normalizeTempRecruitingForm = (data: RecruitingForms): RecruitingForms => {
  const schedule = data.schedule
  const interviewStartAt = formatDateString(schedule.interviewStartAt)
  const interviewEndAt = formatDateString(schedule.interviewEndAt)
  const allowedInterviewDates = getInterviewDateKeys(interviewStartAt, interviewEndAt)
  const interviewTimeTable = schedule.interviewTimeTable as InterviewTimeTableWithOptionalEnabled
  const normalizedEnabled = resolveInterviewEnabled(interviewTimeTable).filter((slot) =>
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
        enabledByDate: normalizedEnabled,
      },
    },
  }
}
