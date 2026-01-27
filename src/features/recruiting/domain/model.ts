/**
 * Recruiting 도메인 모델
 * 리크루팅 정보, 커리큘럼 관련 타입
 */

import type { RecruitingPart } from '@/shared/types/form'

/** 커리큘럼 항목 */
export interface CurriculumItem {
  week: number
  content: string | null
}

/** 파트 데이터 (커리큘럼 포함) */
export interface PartData {
  id: RecruitingPart
  label: string
  requiredSkill?: string
  curriculum: Array<CurriculumItem>
}

/** 리크루팅 공지 */
export interface RecruitingNotice {
  title: string
  content: string
}

/** 리크루팅 일정 이벤트 */
export interface RecruitingEvent {
  id: number
  title: string
  startDate: string
  endDate: string
}
