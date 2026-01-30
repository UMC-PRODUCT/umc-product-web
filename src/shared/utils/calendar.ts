import dayjs from 'dayjs'

export const getEventDateText = (start: Date, end: Date, separator: string = ' ~ ') => {
  const isSameDay = dayjs(start).isSame(end, 'day')
  const startText = dayjs(start).format('MM.DD')
  const endText = dayjs(end).format('MM.DD')
  return isSameDay ? startText : `${startText}${separator}${endText}`
}
