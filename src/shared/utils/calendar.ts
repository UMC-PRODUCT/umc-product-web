import { addDays, endOfWeek, format, isAfter, isSameDay, parseISO, startOfDay } from 'date-fns'

import type { CalendarEvents, EventSegment } from '@/shared/mocks/apply'

import 'react-calendar/dist/Calendar.css'

// --- 로직: 이벤트 세그먼트 생성 ---
export const processEventsIntoSegments = (events: CalendarEvents): Array<EventSegment> => {
  const segments: Array<EventSegment> = []
  events.forEach((event) => {
    const start = startOfDay(parseISO(event.startDate))
    const end = startOfDay(parseISO(event.endDate))
    let current = start

    while (!isAfter(current, end)) {
      const weekEnd = startOfDay(endOfWeek(current, { weekStartsOn: 0 }))
      const segmentEnd = isAfter(weekEnd, end) ? end : weekEnd
      const span =
        Math.round((segmentEnd.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)) + 1

      segments.push({
        id: event.id,
        title: event.title,
        originalStart: start,
        originalEnd: end,
        segmentStart: current,
        segmentEnd: segmentEnd,
        span: span,
        isStart: isSameDay(current, start),
      })
      current = addDays(segmentEnd, 1)
    }
  })
  return segments
}

// --- 유틸: 날짜 텍스트 생성 ---
export const getEventDateText = (start: Date, end: Date, separator: string = ' ~ ') => {
  const startText = format(start, 'MM.dd')
  const endText = format(end, 'MM.dd')
  return isSameDay(start, end) ? startText : `${startText}${separator}${endText}`
}
