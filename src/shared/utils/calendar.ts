import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import type { CalendarEvents, EventSegment } from '@/shared/types/calendar'

const toStartOfDay = (value: string | Date) => dayjs(value).startOf('day')

const isSameDay = (left: Date, right: Date) => dayjs(left).isSame(right, 'day')

const isAfterDay = (left: Dayjs, right: Dayjs) => left.isAfter(right, 'day')

const getWeekEnd = (current: Dayjs) => {
  const dayOfWeek = current.day() // 0: Sunday ... 6: Saturday
  return current.add(6 - dayOfWeek, 'day').startOf('day')
}

// --- 로직: 이벤트 세그먼트 생성 ---
export const processEventsIntoSegments = (events: CalendarEvents): Array<EventSegment> => {
  const segments: Array<EventSegment> = []
  events.forEach((event) => {
    const start = toStartOfDay(event.startDate)
    const end = toStartOfDay(event.endDate)
    let current = start

    while (!isAfterDay(current, end)) {
      const weekEnd = getWeekEnd(current)
      const segmentEnd = isAfterDay(weekEnd, end) ? end : weekEnd
      const span = segmentEnd.diff(current, 'day') + 1

      segments.push({
        id: event.id,
        title: event.title,
        originalStart: start.toDate(),
        originalEnd: end.toDate(),
        segmentStart: current.toDate(),
        segmentEnd: segmentEnd.toDate(),
        span: span,
        isStart: current.isSame(start, 'day'),
      })
      current = segmentEnd.add(1, 'day')
    }
  })
  return segments
}

// --- 유틸: 날짜 텍스트 생성 ---
export const getEventDateText = (start: Date, end: Date, separator: string = ' ~ ') => {
  const startText = dayjs(start).format('MM.DD')
  const endText = dayjs(end).format('MM.DD')
  return isSameDay(start, end) ? startText : `${startText}${separator}${endText}`
}
