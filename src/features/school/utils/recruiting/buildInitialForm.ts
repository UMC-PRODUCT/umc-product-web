import type {
  RecruitingForms,
  RecruitingInterviewTimeTable,
  RecruitingItem,
  RecruitingSchedule,
} from '@/shared/types/form'

import type {
  GetTempSavedRecruitmentResponseDTO,
  PatchTempSaveRecruitmentRequestDTO,
} from '../../domain/apiTypes'
import { normalizeTempRecruitingForm } from './tempDraft'

const defaultInterviewTimeTable: RecruitingInterviewTimeTable = {
  dateRange: { start: '', end: '' },
  timeRange: { start: '09:00', end: '23:00' },
  slotMinutes: '30',
  enabledByDate: [],
  disabledByDate: [],
}

const defaultRecruitingSchedule: RecruitingSchedule = {
  applyStartAt: null,
  applyEndAt: null,
  docResultAt: null,
  interviewStartAt: null,
  interviewEndAt: null,
  finalResultAt: null,
  interviewTimeTable: defaultInterviewTimeTable,
}

export const buildSchedulePayload = (
  schedule: RecruitingForms['schedule'],
): PatchTempSaveRecruitmentRequestDTO['schedule'] => ({
  applyStartAt: schedule.applyStartAt,
  applyEndAt: schedule.applyEndAt,
  docResultAt: schedule.docResultAt,
  interviewStartAt: schedule.interviewStartAt,
  interviewEndAt: schedule.interviewEndAt,
  finalResultAt: schedule.finalResultAt,
  interviewTimeTable: {
    dateRange: {
      start: schedule.interviewTimeTable.dateRange.start,
      end: schedule.interviewTimeTable.dateRange.end,
    },
    timeRange: {
      start: schedule.interviewTimeTable.timeRange.start,
      end: schedule.interviewTimeTable.timeRange.end,
    },
    slotMinutes: '30',
    enabledByDate: schedule.interviewTimeTable.enabledByDate,
    disabledByDate: schedule.interviewTimeTable.disabledByDate,
  },
})

export const buildQuestionsPayload = (items: Array<RecruitingItem>) =>
  items.map((item) => ({
    target: {
      kind: item.target.kind,
      pageNo: item.target.pageNo,
      part: item.target.part,
    },
    question: {
      questionId: item.question.questionId,
      type: item.question.type,
      questionText: item.question.questionText,
      required: item.question.required,
      orderNo: item.question.orderNo,
      options: item.question.options?.map((option) => ({
        content: option.content,
        orderNo: option.orderNo,
      })),
    },
  }))

export function buildRecruitingInitialForm(
  result: GetTempSavedRecruitmentResponseDTO,
): RecruitingForms {
  const schedule = result.schedule ?? defaultRecruitingSchedule
  const interviewTimeTable = schedule.interviewTimeTable
  const safeInterviewTimeTable: RecruitingInterviewTimeTable = {
    ...defaultInterviewTimeTable,
    ...interviewTimeTable,
  }
  const safeSchedule: RecruitingSchedule = {
    ...defaultRecruitingSchedule,
    ...schedule,
    interviewTimeTable: safeInterviewTimeTable,
  }

  return normalizeTempRecruitingForm({
    title: result.title,
    recruitmentParts: result.recruitmentParts,
    maxPreferredPartCount: result.maxPreferredPartCount,
    schedule: safeSchedule,
    noticeContent: result.noticeContent,
    status: result.status,
    items: [],
  })
}
