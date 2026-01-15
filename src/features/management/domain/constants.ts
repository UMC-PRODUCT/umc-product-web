/**
 * Management 도메인 상수
 * 학교, 리크루팅 관리 관련 상수
 */

/** 학교 상태 설정 */
export const SCHOOL_STATE_CONFIG = {
  ACTIVE: { label: 'ACTIVE', description: '활성' },
  INACTIVE: { label: 'INACTIVE', description: '비활성' },
} as const

/** 리크루팅 상태 설정 */
export const RECRUITING_STATE_CONFIG = {
  OPEN: { label: 'OPEN', description: '모집 중' },
  CLOSED: { label: 'CLOSED', description: '모집 마감' },
} as const

/** 평가 단계 - 서류 */
export const EVALUATION_DOCUMENT_CONFIG = {
  BEFORE: { label: '서류 평가 전', order: 1 },
  SCHEDULED: { label: '서류 평가 예정', order: 2 },
  IN_PROGRESS: { label: '서류 평가 중', order: 3 },
  COMPLETED: { label: '서류 평가 완료', order: 4 },
} as const

/** 평가 단계 - 면접 */
export const EVALUATION_FINAL_CONFIG = {
  BEFORE: { label: '면접 평가 전', order: 1 },
  SCHEDULED: { label: '면접 평가 예정', order: 2 },
  IN_PROGRESS: { label: '면접 평가 중', order: 3 },
  COMPLETED: { label: '면접 평가 완료', order: 4 },
} as const
