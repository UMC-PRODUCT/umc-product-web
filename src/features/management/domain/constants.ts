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

export const MANAGE_SCHOOL_TABS = [
  { value: 'add', label: '신규 학교 추가' },
  { value: 'edit', label: '학교 정보 수정' },
] as const

export const MANAGE_SYSTEM_TABS = [
  { value: 'landing', label: '렌딩 페이지 관리' },
  {
    value: 'curriculum',
    label: '커리큘럼 관리',
  },
  { value: 'term', label: '약관 관리' },
  { value: 'data', label: '데이터 변경 이력 조회' },
]

export const MANAGE_BRANCH_TABS = [
  { value: 'add', label: '지부 생성' },
  { value: 'match', label: '지부 매칭' },
]

export const MANAGE_SCHOOL_TAB_VALUES = MANAGE_SCHOOL_TABS.map((tab) => tab.value)

export const DELETE_SCHOOL_TABLE_HEADER_LABEL = ['학교명', '지부', '등록일', '상태', '작업']

export const DELETE_ACCOUNT_TABLE_HEADER_LABEL = ['이름', '닉네임', '학교', '기수', '파트', '권한']

export const MANAGE_SYSTEM_TAB_VALUES = MANAGE_SYSTEM_TABS.map((tab) => tab.value)

export const MANAGE_BRANCH_TAB_VALUES = MANAGE_BRANCH_TABS.map((tab) => tab.value)
