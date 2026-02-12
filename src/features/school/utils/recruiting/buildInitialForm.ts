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

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const minutesToTime = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.min(1439, minutes))
  const h = Math.floor(safeMinutes / 60)
  const m = safeMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const expandEnabledByDate = (
  enabledByDate: RecruitingForms['schedule']['interviewTimeTable']['enabledByDate'],
  slotMinutesValue: string,
  selectionMinutes = 30,
) => {
  const slotMinutes = Number(slotMinutesValue)
  if (Number.isNaN(slotMinutes) || slotMinutes <= 0) return enabledByDate
  if (selectionMinutes % slotMinutes !== 0) return enabledByDate
  const repeatCount = selectionMinutes / slotMinutes
  return enabledByDate.map((slot) => {
    const expanded = slot.times.flatMap((time) => {
      const base = timeToMinutes(time)
      return Array.from({ length: repeatCount }, (_, idx) =>
        minutesToTime(base + idx * slotMinutes),
      )
    })
    const unique = Array.from(new Set(expanded))
    unique.sort((a, b) => timeToMinutes(a) - timeToMinutes(b))
    return { ...slot, times: unique }
  })
}
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
    slotMinutes: schedule.interviewTimeTable.slotMinutes || '30',
    enabledByDate: expandEnabledByDate(
      schedule.interviewTimeTable.enabledByDate,
      schedule.interviewTimeTable.slotMinutes || '30',
    ),
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
