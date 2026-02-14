import type { GisuType } from '../domain/model'

/**
 * 날짜 문자열을 YYYY.MM.DD 형식으로 포맷함.
 */
export const formatDateToDot = (value?: string) => {
  if (!value) return '-'

  const isoLike = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoLike) return `${isoLike[1]}.${isoLike[2]}.${isoLike[3]}`

  const dotted = value.match(/^(\d{4})\.(\d{2})\.(\d{2})/)
  if (dotted) return `${dotted[1]}.${dotted[2]}.${dotted[3]}`

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

/**
 * 기수 상세 응답에서 기간 텍스트를 생성함.
 */
export const getGisuPeriodText = (gisu?: GisuType) => {
  if (!gisu || !gisu.startAt || !gisu.endAt) return '-'
  return `${formatDateToDot(gisu.startAt)} ~ ${formatDateToDot(gisu.endAt)}`
}
