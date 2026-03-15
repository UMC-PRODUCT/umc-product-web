import { isAxiosError } from 'axios'

import type {
  ChallengerRecordPartType,
  ChallengerRecordRoleType,
  PostChallengerRecordCodeBody,
} from '@/features/management/domain/model'
import { PART_LIST, PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import type { Option } from '@/shared/types/form'
import { transformRoleKorean } from '@/shared/utils/transformKorean'

import type { BulkDraftRow, DraftFields } from './accountCode.types'

export const RESULT_TABLE_HEADER_LABELS = ['코드', '이름', '학교 / 지부', '기수 / 파트', '역할', '']
export const MAX_BULK_CODE_ROWS = 20
export const MAX_DETAIL_FETCH_CONCURRENCY = 4

const CHALLENGER_RECORD_ROLE_OPTIONS: Array<ChallengerRecordRoleType> = [
  'CHALLENGER',
  'SUPER_ADMIN',
  'CENTRAL_PRESIDENT',
  'CENTRAL_VICE_PRESIDENT',
  'CENTRAL_OPERATING_TEAM_MEMBER',
  'CENTRAL_EDUCATION_TEAM_MEMBER',
  'CHAPTER_PRESIDENT',
  'SCHOOL_PRESIDENT',
  'SCHOOL_VICE_PRESIDENT',
  'SCHOOL_PART_LEADER',
  'SCHOOL_ETC_ADMIN',
]

const CHALLENGER_RECORD_PART_OPTIONS: ReadonlyArray<ChallengerRecordPartType> = [
  ...PART_LIST,
  'ADMIN',
] as const

const ROLE_TYPES_REQUIRING_CONCRETE_PART: ReadonlyArray<ChallengerRecordRoleType> = [
  'CENTRAL_EDUCATION_TEAM_MEMBER',
  'SCHOOL_PART_LEADER',
] as const

let bulkRowSequence = 0

const createEmptyDraft = (): DraftFields => ({
  memberName: '',
})

export const createBulkDraftRow = (): BulkDraftRow => ({
  id: `challenger-record-row-${bulkRowSequence++}`,
  ...createEmptyDraft(),
})

export const createInitialBulkRows = () => [createBulkDraftRow()]

export const createPartOptions = (): Array<Option<string>> =>
  CHALLENGER_RECORD_PART_OPTIONS.map((part) => ({
    id: part,
    label: getChallengerRecordPartLabel(part),
  }))

export const createRoleOptions = (): Array<Option<string>> =>
  CHALLENGER_RECORD_ROLE_OPTIONS.map((roleType) => ({
    id: roleType,
    label: transformRoleKorean(roleType),
  }))

export const hasAnyDraftValue = (draft: DraftFields) =>
  Boolean(
    draft.chapterId ||
    draft.schoolId ||
    draft.part ||
    draft.challengerRoleType ||
    draft.memberName.trim(),
  )

export const getChallengerRecordPartLabel = (part?: ChallengerRecordPartType | null) => {
  if (!part) return '파트 없음'
  return part === 'ADMIN' ? 'Admin' : PART_TYPE_TO_SMALL_PART[part]
}

export const requiresPartSelection = (roleType?: ChallengerRecordRoleType) =>
  roleType === 'CHALLENGER' || requiresConcretePartSelection(roleType)

export const shouldSendPart = (roleType?: ChallengerRecordRoleType) =>
  roleType === 'CHALLENGER' || requiresConcretePartSelection(roleType)

export const requiresConcretePartSelection = (roleType?: ChallengerRecordRoleType) =>
  Boolean(roleType && ROLE_TYPES_REQUIRING_CONCRETE_PART.includes(roleType))

export const getConcretePartRequiredMessage = (roleType: ChallengerRecordRoleType) =>
  `${transformRoleKorean(roleType)} 선택 시 Admin이 아닌 파트를 선택해 주세요.`

export const getDraftValidationMessage = (draft: DraftFields, rowIndex: number) => {
  if (
    !draft.chapterId ||
    !draft.schoolId ||
    !draft.challengerRoleType ||
    !draft.memberName.trim()
  ) {
    return `${rowIndex + 1}번째 행의 항목을 모두 입력해 주세요.`
  }

  if (
    requiresConcretePartSelection(draft.challengerRoleType) &&
    (!draft.part || draft.part === 'ADMIN')
  ) {
    return `${rowIndex + 1}번째 행은 ${getConcretePartRequiredMessage(draft.challengerRoleType)}`
  }

  if (requiresPartSelection(draft.challengerRoleType) && !draft.part) {
    return `${rowIndex + 1}번째 행은 파트를 선택해 주세요.`
  }

  return null
}

export const resolveOption = (options: Array<Option<string>>, targetId?: string) =>
  targetId ? options.find((option) => String(option.id) === targetId) : undefined

export const buildPayload = (
  selectedGisuId: string,
  draft: DraftFields,
): PostChallengerRecordCodeBody => {
  const payload: PostChallengerRecordCodeBody = {
    gisuId: selectedGisuId,
    chapterId: draft.chapterId ?? '',
    schoolId: draft.schoolId ?? '',
    memberName: draft.memberName.trim(),
  }

  if (shouldSendPart(draft.challengerRoleType) && draft.part) {
    payload.part = draft.part
  }

  if (draft.challengerRoleType && draft.challengerRoleType !== 'CHALLENGER') {
    payload.challengerRoleType = draft.challengerRoleType
  }

  return payload
}

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? fallback
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
