import dayjs from 'dayjs'

import type {
  RecruitingForms,
  RecruitingInterviewTimeTable,
  RecruitingSchedule,
} from '@/shared/types/form'

import type {
  GetRecruitmentDraftResponseDTO,
  PatchRecruitmentDraftRequestDTO,
} from '../../domain/model'
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

const toDateOnly = (value: string | null) =>
  value ? dayjs(value).format('YYYY-MM-DDT00:00:00+09:00') : null
// TODO: 추후 API 수정시 삭제
const toDateLast = (value: string | null) =>
  value ? dayjs(value).format('YYYY-MM-DDT23:59:59+09:00') : null
export const buildSchedulePayload = (
  schedule: RecruitingForms['schedule'],
): PatchRecruitmentDraftRequestDTO['schedule'] => ({
  applyStartAt: toDateOnly(schedule.applyStartAt),
  applyEndAt: toDateLast(schedule.applyEndAt),
  docResultAt: toDateOnly(schedule.docResultAt),
  interviewStartAt: toDateOnly(schedule.interviewStartAt),
  interviewEndAt: toDateLast(schedule.interviewEndAt),
  finalResultAt: toDateLast(schedule.finalResultAt),
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
    disabledByDate: [],
  },
})

export function buildRecruitingInitialForm(
  result: GetRecruitmentDraftResponseDTO,
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

  // 검증 컨텍스트에 초기 스케줄 주입 (프론트에서 잠금 규칙 판단용)
  // NOTE: 순수 함수 성격을 유지하기 위해 여기서 직접 setScheduleValidationContext를 호출하지 않음

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
