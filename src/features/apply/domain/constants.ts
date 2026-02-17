import type { PartType } from '@/features/auth/domain/model'

import type { DocumentStatusType, FinalStatusType } from './model'

const createStatusConfig = <T extends string>(
  values: Record<T, { label: string; color: 'lime' | 'gray' | 'white' | 'caution' | 'necessary' }>,
) => values

/** Apply 도메인 상수 */

/** 질문 타입 설정 */
export const QUESTION_TYPE_CONFIG = {
  SHORT_TEXT: { label: '단답형', icon: 'text' },
  LONG_TEXT: { label: '장문형', icon: 'align-left' },
  CHECKBOX: { label: '복수 선택', icon: 'check-square' },
  RADIO: { label: '단일 선택', icon: 'circle-dot' },
  DROPDOWN: { label: '드롭다운', icon: 'chevron-down' },
  SCHEDULE: { label: '시간표', icon: 'calendar' },
  PORTFOLIO: { label: '포트폴리오', icon: 'file' },
  PREFERRED_PART: { label: '파트 선택', icon: 'users' },
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
export const DOCUMENT_STATUS_CONFIG = createStatusConfig<DocumentStatusType>({
  PENDING: { label: '미정', color: 'gray' },
  EVALUATING: { label: '평가 중', color: 'caution' },
  PASS: { label: '서류 합격', color: 'lime' },
  FAIL: { label: '불합격', color: 'necessary' },
})

/** 최종 평가 상태 */
export const FINAL_STATUS_CONFIG = createStatusConfig<FinalStatusType>({
  WAITING: { label: '미정', color: 'gray' },
  IN_PROGRESS: { label: '평가 중', color: 'lime' },
  EVALUATING: { label: '평가 중', color: 'lime' },
  PENDING: { label: '미정', color: 'gray' },
  DONE: { label: '평가 완료', color: 'lime' },
  NONE: { label: '미정', color: 'gray' },
})

/** 모집 파트 목록 / 매핑 */
export const DEFAULT_RECRUITING_PARTS = [
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
] as ReadonlyArray<PartType>
