import type {
  ChallengerRecordPartType,
  ChallengerRecordRoleType,
} from '@/features/management/domain/model'

export type DraftFields = {
  chapterId?: string
  schoolId?: string
  part?: ChallengerRecordPartType
  memberName: string
  challengerRoleType?: ChallengerRecordRoleType
}

export type BulkDraftRow = DraftFields & {
  id: string
}

export type FeedbackState = {
  tone: 'success' | 'error'
  message: string
} | null

export type ChangeBulkRow = <TKey extends keyof DraftFields>(
  rowId: string,
  key: TKey,
  value: DraftFields[TKey],
) => void
