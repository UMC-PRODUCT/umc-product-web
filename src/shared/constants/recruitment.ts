/**
 * 모집 관련 상수
 * TODO: API 연동 시 해당 값들은 서버에서 받아오도록 변경
 */

export const RECRUITMENT_INFO = {
  schoolName: '중앙대학교',
  generation: '10기',
  recruitmentPeriod: {
    start: '20xx년 x월 x일',
    end: '20xx년 x월 x일',
  },
  activityPeriod: {
    start: '20xx년 x월',
    end: '20xx년 x월',
    duration: '약 6개월',
  },
} as const

export const formatRecruitmentPeriod = (start: string, end: string, separator = ' ~ '): string => {
  return `${start}${separator}${end}`
}

export const formatActivityPeriod = (start: string, end: string, duration: string): string => {
  return `${start} ~ ${end} (${duration})`
}
