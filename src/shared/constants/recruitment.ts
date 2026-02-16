export const formatRecruitmentPeriod = (
  start: string | undefined,
  end: string | undefined,
  separator = ' ~ ',
): string => {
  if (!start || !end) {
    return ''
  }
  const startDate = new Date(start)
  const endDate = new Date(end)
  const editStart = `${startDate.getFullYear()}년 ${(startDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}월 ${startDate.getDate().toString().padStart(2, '0')}일`
  const editEnd = `${endDate.getFullYear()}년 ${(endDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}월 ${endDate.getDate().toString().padStart(2, '0')}일`

  return `${editStart}${separator}${editEnd}`
}

export const formatActivityPeriod = (
  start: string | undefined,
  end: string | undefined,
): string => {
  if (!start || !end) {
    return '추후 공지'
  }
  const editStart =
    new Date(start).getFullYear() +
    '년 ' +
    (new Date(start).getMonth() + 1).toString().padStart(2, '0') +
    '월' +
    (new Date(start).getDate()
      ? ' ' + new Date(start).getDate().toString().padStart(2, '0') + '일'
      : '')
  const editEnd =
    new Date(end).getFullYear() +
    '년 ' +
    (new Date(end).getMonth() + 1).toString().padStart(2, '0') +
    '월' +
    (new Date(end).getDate()
      ? ' ' + new Date(end).getDate().toString().padStart(2, '0') + '일'
      : '')
  return `${editStart} ~ ${editEnd} (약 6개월)`
}
