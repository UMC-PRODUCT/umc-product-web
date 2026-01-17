/**
 * Apply 도메인 상수
 */

/** 질문 타입 설정 */
export const QUESTION_TYPE_CONFIG = {
  SHORT_TEXT: { label: '단답형', icon: 'text' },
  LONG_TEXT: { label: '장문형', icon: 'align-left' },
  CHECKBOX: { label: '복수 선택', icon: 'check-square' },
  RADIO: { label: '단일 선택', icon: 'circle-dot' },
  DROPDOWN: { label: '드롭다운', icon: 'chevron-down' },
  SCHEDULE: { label: '시간표', icon: 'calendar' },
  PORTFOLIO: { label: '포트폴리오', icon: 'file' },
  PART: { label: '파트 선택', icon: 'users' },
} as const

/** 파일 업로드 상태 */
export const FILE_UPLOAD_STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

/** 지원서 상태 */
export const RESUME_STATUS_CONFIG = {
  DRAFT: { label: '작성 중', color: 'gray' },
  SUBMITTED: { label: '제출 완료', color: 'blue' },
  REVIEWED: { label: '검토 완료', color: 'green' },
} as const

/** 서류 평가 상태 */
export const DOCUMENT_STATUS_CONFIG = {
  PENDING: { label: '미정', color: 'gray' },
  EVALUATING: { label: '평가 중', color: 'yellow' },
  PASSED: { label: '서류 합격', color: 'green' },
  FAILED: { label: '불합격', color: 'red' },
} as const

/** 최종 평가 상태 */
export const FINAL_STATUS_CONFIG = {
  PENDING: { label: '미정', color: 'gray' },
  SCHEDULED: { label: '예정', color: 'blue' },
  EVALUATING: { label: '평가 중', color: 'yellow' },
  PASSED: { label: '최종 합격', color: 'green' },
  FAILED: { label: '불합격', color: 'red' },
} as const
