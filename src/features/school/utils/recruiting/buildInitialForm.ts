import type { RecruitingForms, RecruitingItem } from '@/shared/types/form'

import type {
  GetTempSavedRecruitmentResponseDTO,
  PatchTempSaveRecruitmentRequestDTO,
} from '../../domain/apiTypes'
import { normalizeTempRecruitingForm } from './tempDraft'

const defaultInterviewTimeTable = {
  dateRange: { start: '', end: '' },
  timeRange: { start: '09:00', end: '23:00' },
  slotMinutes: '30',
  enabledByDate: [] as Array<{ date: string; times: Array<string> }>,
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
  const schedule = result.schedule
  const interviewTimeTable = schedule.interviewTimeTable

  return normalizeTempRecruitingForm({
    title: result.title,
    recruitmentParts: result.recruitmentParts,
    maxPreferredPartCount: result.maxPreferredPartCount,
    schedule: {
      applyStartAt: schedule.applyStartAt,
      applyEndAt: schedule.applyEndAt,
      docResultAt: schedule.docResultAt,
      interviewStartAt: schedule.interviewStartAt,
      interviewEndAt: schedule.interviewEndAt,
      finalResultAt: schedule.finalResultAt,
      interviewTimeTable: {
        dateRange: interviewTimeTable.dateRange,
        timeRange: interviewTimeTable.timeRange,
        slotMinutes: interviewTimeTable.slotMinutes,
        enabledByDate: interviewTimeTable.enabledByDate,
        disabledByDate: interviewTimeTable.disabledByDate,
      },
    },
    noticeContent: result.noticeContent,
    status: result.status,
    items: [],
  })
}
