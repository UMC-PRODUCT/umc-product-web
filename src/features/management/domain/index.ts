/**
 * Management 도메인 공개 API
 *
 * @example
 * import { RECRUITING_STATE_CONFIG } from '@features/management/domain'
 * import type { Recruiting, University } from '@features/management/domain'
 */

// 상수
export {
  EVALUATION_DOCUMENT_CONFIG,
  EVALUATION_FINAL_CONFIG,
  RECRUITING_STATE_CONFIG,
  SCHOOL_STATE_CONFIG,
} from './constants'

// 타입
export type {
  EvaluationDocumentType,
  EvaluationFinalType,
  Notice,
  RecruitingType,
  SchoolStateType,
  University,
  UniversityBranch,
} from './model'
