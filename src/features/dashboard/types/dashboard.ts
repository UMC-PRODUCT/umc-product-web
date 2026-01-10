import type { DocumentStatusType, FinalStatusType, PartType, ResumeType } from '@/shared/types/umc'

export type ApplySummary = {
  title: string
  resumeId: number
  state: ResumeType
}

export type DashboardProgress = {
  parts: Array<PartType | '미정'>
  document: DocumentStatusType
  final: FinalStatusType
}

export type DashboardUser = {
  nickname: string
  fullName: string
}
