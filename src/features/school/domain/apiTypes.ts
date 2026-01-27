import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitingPart, RecruitingStatus } from '@/shared/types/form'

import type { ApplicationFormPayload, RecruitingDraft, RecruitingForms } from './types'

export type GetRecruitmentsRequestDTO = {
  status: RecruitingStatus
}

export type GetRecruitmentsResponseDTO = {
  recruitments: Array<{
    schoolName: string
    gisu: string
    recruitmentId: number
    recruitmentName: string
    startDate: string
    endDate: string
    applicantCount: number
    phase: string
    phaseLabel: string
    editable: boolean
  }>
}

export type GetRecruitmentNoticesResponseDTO = {
  recruitmentId: number
  title: string
  content: string
  parts: Array<RecruitingPart>
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
  parts?: Array<RecruitingPart>
}

export type PostFirstRecruitmentResponseDTO = CommonResponseDTO<{
  recruitmentId?: number
  formId?: number
}>
export type PatchTempSavedRecruitQuestionsRequestDTO = ApplicationFormPayload

export type GetApplicationFormResponseDTO = RecruitingForms
export type PatchTempSavedRecruitQuestionsResponseDTO = RecruitingForms

export type DeleteSingleQuestionResponseDTO = RecruitingForms
