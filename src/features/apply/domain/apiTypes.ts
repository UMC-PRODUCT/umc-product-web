import type { RecruitingForms } from '@/features/school/domain'
import type { RecruitingPart } from '@/shared/types/form'

import type { QuestionType } from './model'

export type GetApplicationFormResponseDTO = RecruitingForms

export type GetApplicationAnswerResponseDTO = {
  recruitmentId: string
  formId: string
  formResponseId: string
  status: string // TODO: enum 으로 변경
  lastSavedAt: string
  submittedAt: string | null
  answer: Array<{
    questionId: number
    value: {
      addtionalProp1: {}
      addtionalProp2: {}
      addtionalProp3: {}
    }
    answeredAsType: QuestionType
  }>
}
export type GetRecruitmentSchedulesResponseDTO = {
  recruitmentId: number
  schedules: Array<{
    type: string
    kind: string
    startDate: string
    endDate: string
  }>
}
export type PostResetDraftResponseDTO = RecruitmentForm
export type PostFirstDraftResponseDTO = RecruitmentForm
export type RecruitmentForm = {
  recruitmentId: string
  formId: string
  formResponseId: string
  createdAt: string
}
export type PostSubmitApplicationResponseDTO = {
  recruitmentId: string
  formResponseId: string
  applicationId: string
  status: string
}
export type GetMyApplicationStatusResponseDTO = {
  nickname: string
  name: string
  current: {
    appliedParts: Array<RecruitingPart>
    documentEvaluation: Array<string>
    finalEvaluation: Array<string>
    progress: {
      currentStep: string
      steps: Array<{
        step: string
        label: string
        done: boolean
        active: boolean
      }>
      resultAnnounceAt: string
    }
  }
  applications: Array<{
    recruitmentId: string
    formResponseId: string
    applicationId: string
    recruitmentTitle: string
    badge: string
    status: string
    submittedAt: string
  }>
}
export type GetRecruitmentNotice = {
  recruitmentId: string
  title: string
  content: string
  parts: Array<RecruitingPart>
}
export type GetSpecificPartRecruiting = {
  recruitmentId: string
  title: string
  recruitmentPeriod: {
    startsAt: string
    endsAt: string
  }
  activityPeriod: {
    startsAt: string
    endsAt: string
  }
  description: string
  parts: Array<{
    recruitmentPartId: string
    part: RecruitingPart
    status: string
  }>
  myApplication: {
    status: string
    draftFormResponseId: string
    applicationId: string
  }
}
