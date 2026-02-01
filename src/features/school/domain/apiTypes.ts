import type { PartType } from '@/features/auth/domain'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitingStatus } from '@/shared/types/form'

import type { ApplicationFormPayload, Phase, RecruitingDraft, RecruitingForms } from './types'

export type GetRecruitmentsRequestDTO = {
  status: RecruitingStatus
}

export type GetRecruitmentsResponseDTO = {
  recruitments: Array<{
    schoolName: string
    gisu: string
    recruitmentId: string
    recruitmentName: string
    startDate: string
    endDate: string
    applicantCount: number
    phase: Phase
    phaseLabel: string
    editable: boolean
    listBadge?: string
  }>
}

export type GetRecruitmentNoticesResponseDTO = {
  recruitmentId: number
  title: string
  content: string
  parts: Array<PartType>
}

export type GetTempSavedRecruitmentResponseDTO = RecruitingDraft

export interface PostRecruitmentRequestPublishDTO {
  recruitmentDraft: RecruitingDraft
  applicationFormQuestions: ApplicationFormPayload
}

export type PatchTempSaveRecruitmentRequestDTO = Partial<RecruitingDraft>

export type PatchTempSaveRecruitmentResponseDTO =
  CommonResponseDTO<PatchTempSaveRecruitmentRequestDTO>

export type PostFirstRecruitmentRequestDTO = {
  recruitmentName?: string
  parts?: Array<PartType>
}

export type PostFirstRecruitmentResponseDTO = {
  recruitmentId?: number
  formId?: number
}
export type PatchTempSavedRecruitQuestionsRequestDTO = ApplicationFormPayload

export type GetApplicationFormResponseDTO = RecruitingForms
export type PatchTempSavedRecruitQuestionsResponseDTO = RecruitingForms

export type DeleteSingleQuestionResponseDTO = RecruitingForms

export type patchPublishedRecruitmentRequestDTO = {
  recruitmentId: string
  requestBody: RecruitmentEditable
}

export type RecruitmentEditable = {
  applyStartAt?: string
  applyEndAt?: string
  docResultAt?: string
  interviewStartAt?: string
  interviewEndAt?: string
  finalResultAt?: string
}
