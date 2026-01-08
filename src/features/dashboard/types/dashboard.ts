import type { Part } from '@/shared/types/umc/part'

export type ApplySummary = {
  title: string
  resumeId: number
  state: '제출 완료' | '지난 모집'
}

export type DocumentStatus = '미정' | '평가 중' | '서류 합격' | '불합격'
export type FinalStatus = '미정' | '예정' | '평가 중' | '최종 합격' | '불합격'

export type DashboardProgress = {
  parts: Array<Part | '미정'>
  document: DocumentStatus
  final: FinalStatus
}

export type DashboardUser = {
  nickname: string
  fullName: string
}
