export type CalendarEvent = {
  id: number
  title: string
  startDate: string // 'YYYY-MM-DD' 형식
  endDate: string // 'YYYY-MM-DD' 형식
}

export type CalendarEvents = Array<CalendarEvent>
