import type { QuestionType } from '@/features/apply/domain'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitingPartApi } from '@/shared/types/form'

export type PostFirstRecruitmentRequestDTO = {
  recruitmentName?: string
  parts?: Array<RecruitingPartApi>
}
export type PostFirstRecruitmentResponseDTO = CommonResponseDTO<{
  recruitmentId?: number
  formId?: number
}>

export type PatchTempSaveRecruitmentRequestDTO = {
  title?: string
  recruitmentParts?: Array<RecruitingPartApi>
  maxPreferredPartCount?: number
  schedule?: {
    applyStartAt?: string
    applyEndAt?: string
    docResultAt?: string
    interviewStartAt?: string
    interviewEndAt?: string
    finalResultAt?: string
    interviewTimeTable?: {
      dateRange?: {
        start?: string
        end?: string
      }
      timeRange?: {
        start?: string
        end?: string
      }
      slotMinutes?: number
      enabledByDate?: Array<{
        date?: string
        times?: Array<string>
      }>
    }
  }
  noticeContent?: string
}
export type PatchTempSaveRecruitmentResponseDTO = CommonResponseDTO<{
  title?: string
  recruitmentParts?: Array<RecruitingPartApi>
  maxPreferredPartCount?: number
  schedule?: {
    applyStartAt?: string
    applyEndAt?: string
    docResultAt?: string
    interviewStartAt?: string
    interviewEndAt?: string
    finalResultAt?: string
    interviewTimeTable?: {
      dateRange?: {
        start?: string
        end?: string
      }
      timeRange?: {
        start?: string
        end?: string
      }
      slotMinutes?: number
      enabledByDate?: Array<{
        date?: string
        times?: Array<string>
      }>
    }
  }
  noticeContent?: string
}>

export type PatchTempSavedRecruitQuestionsRequestDTO = {
  items: Array<{
    target: {
      kind: 'PART' | 'COMMON_PAGE'
      pageNo: number
      part?: RecruitingPartApi
    }
    questions: {
      questionId: number
      type: QuestionType
      questionText: string
      required: boolean
      orderNo: number
      options?: Array<{
        optionId: number
        content: string
        orderNo: number
      }>
    }
  }>
}
export type PatchTempSavedRecruitQuestionsResponseDTO = CommonResponseDTO<{
  recruitmentid: number
  formId: number
  status: string
  recruitmentFormTitle: string
  noticeTitle: string
  noticeContent: string
  pages: Array<{
    page: number
    questions: Array<{
      questionId: number
      type: QuestionType
      questionText: string
      required: boolean
      options: Array<{
        optionId: number
        content: string
      }>
    }>
    scheduleQuestion: {
      questionId: number
      type: QuestionType
      questionText: string
      required: boolean
      schedule: {
        applyStartAt: string
        applyEndAt: string
        docResultAt: string
        interviewStartAt: string
        interviewEndAt: string
        finalResultAt: string
        interviewTimeTable: {
          dateRange: {
            start: string
            end: string
          }
          timeRange: {
            start: string
            end: string
          }
          slotMinutes: number
          enabledByDate: Array<{
            date: string
            times: Array<string>
          }>
          disabledByDate: Array<{
            date: string
            times: Array<string>
          }>
        }
      }
    }
    partQuestions: Array<{
      part: RecruitingPartApi
      questions: Array<{
        questionId: number
        type: QuestionType
        questionText: string
        required: boolean
        options: Array<{
          optionId: number
          content: string
        }>
      }>
    }>
  }>
}>

export type GetRecruitmentsRequestDTO = {
  status: 'ONGOING' | 'SCHEDULED' | 'CLOSED' | 'DRAFT'
}

export type GetRecruitmentsResponseDTO = CommonResponseDTO<{
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
}>

export type GetRecruitmentNoticesResponseDTO = CommonResponseDTO<{
  recruitmentId: number
  title: string
  content: string
  parts: Array<RecruitingPartApi>
}>

export type GetTempSavedRecruitmentResponseDTO = CommonResponseDTO<{
  recruitmentId: number
  title: string
  recruitmentParts: Array<RecruitingPartApi>
  maxPreferredPartCount: number
  schedule: {
    applyStartAt: string
    applyEndAt: string
    docResultAt: string
    interviewStartAt: string
    interviewEndAt: string
    finalResultAt: string
    interviewTimeTable: {
      dateRange: {
        start: string
        end: string
      }
      timeRange: {
        start: string
        end: string
      }
      slotMinutes: number
      enabledByDate: Array<{
        date: string
        times: Array<string>
      }>
    }
  }
  noticeContent: string
}>

export type GetRecruitmentSchedulesResponseDTO = CommonResponseDTO<{
  recruitmentId: number
  schedules: Array<{
    type: string // TODO: enum화
    kind: string // TODO: enum화
    startDate: string
    endDate: string
  }>
}>
