/**
 * Home 도메인 모델
 * 홈페이지 관련 타입 (추후 확장)
 */

/** 홈페이지 히어로 섹션 */
export interface HeroSection {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

/** 홈페이지 통계 */
export interface HomeStatistics {
  totalMembers: number
  totalUniversities: number
  totalProjects: number
}

/** 홈페이지 공지사항 */
export interface HomeNotice {
  id: number
  title: string
  date: string
  isNew: boolean
}
