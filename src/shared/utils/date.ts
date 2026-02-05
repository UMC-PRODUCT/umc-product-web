import 'dayjs/locale/ko'

import dayjs from 'dayjs'

dayjs.locale('ko')

/** 한국어 날짜+시간 포맷: "2024년 1월 15일 14:30" */
export const formatDateTimeKorean = (date: Date | string | number): string =>
  dayjs(date).format('YYYY년 M월 D일 HH:mm')

/** 한국어 날짜 포맷: "2024년 1월 15일" */
export const formatDateKorean = (date: Date | string | number): string =>
  dayjs(date).format('YYYY년 M월 D일')

/** 날짜 범위 텍스트: "01.15 ~ 01.20" 또는 "01.15" (같은 날) */
export const formatDateRange = (start: Date, end: Date, separator = ' ~ '): string => {
  const isSameDay = dayjs(start).isSame(end, 'day')
  const startText = dayjs(start).format('MM.DD')
  const endText = dayjs(end).format('MM.DD')
  return isSameDay ? startText : `${startText}${separator}${endText}`
}

/** 임시저장 시간 포맷: "2024년 1월 15일 14시 30분" */
export const formatTempSavedTime = (date: Date | string | number): string =>
  dayjs(date).format('YYYY년 M월 D일 H시 m분')
