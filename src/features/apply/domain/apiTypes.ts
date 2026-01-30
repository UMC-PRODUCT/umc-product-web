import type { PartType } from '@/features/auth/domain'
import type { RECRUITING_SCHEDULE_TYPE } from '@/features/recruiting/domain'
import type { RecruitingForms } from '@/features/school/domain'

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
  recruitmentId: string
  schedules: Array<{
    type: RECRUITING_SCHEDULE_TYPE
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
    appliedParts: Array<PartType>
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
  parts: Array<PartType>
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
    part: PartType
    status: string
  }>
  myApplication: {
    status: 'DRAFT' | 'NONE' | 'SUBMITTED'
    draftFormResponseId: string
    applicationId: string
  }
}
