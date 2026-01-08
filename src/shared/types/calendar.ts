export type CalendarEvent = {
  id: number
  title: string
  startDate: string // 'YYYY-MM-DD' 형식
  endDate: string // 'YYYY-MM-DD' 형식
}

export type CalendarEvents = Array<CalendarEvent>

export type EventSegment = {
  id: number
  title: string
  originalStart: Date
  originalEnd: Date
  segmentStart: Date
  segmentEnd: Date
  span: number // 일정이 차지하는 일수
  isStart: boolean // 실제 일정 시작일인가?
}
