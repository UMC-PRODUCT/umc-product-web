import { describe, expect, it } from 'vitest'

import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { buildPublishedSchedulePayload, buildQuestionsPayload } from './recruitingPayload'

const baseSchedule: RecruitingForms['schedule'] = {
  applyStartAt: '2026-03-01T09:00:00+09:00',
  applyEndAt: '2026-03-10T09:00:00+09:00',
  docResultAt: '2026-03-12T09:00:00+09:00',
  interviewStartAt: '2026-03-15T09:00:00+09:00',
  interviewEndAt: '2026-03-18T09:00:00+09:00',
  finalResultAt: '2026-03-20T09:00:00+09:00',
  interviewTimeTable: {
    dateRange: { start: '2026-03-15', end: '2026-03-18' },
    timeRange: { start: '09:00', end: '23:00' },
    slotMinutes: '30',
    enabledByDate: [{ date: '2026-03-15', times: ['09:00'] }],
    disabledByDate: [],
  },
}

const initialSchedule: RecruitingSchedule = {
  applyStartAt: '2026-03-01T00:00:00+09:00',
  applyEndAt: '2026-03-09T00:00:00+09:00',
  docResultAt: '2026-03-12T00:00:00+09:00',
  interviewStartAt: '2026-03-15T00:00:00+09:00',
  interviewEndAt: '2026-03-18T00:00:00+09:00',
  finalResultAt: '2026-03-20T00:00:00+09:00',
  interviewTimeTable: {
    dateRange: { start: '2026-03-15', end: '2026-03-18' },
    timeRange: { start: '09:00', end: '23:00' },
    slotMinutes: '30',
    enabledByDate: [{ date: '2026-03-15', times: ['09:00'] }],
    disabledByDate: [],
  },
}

describe('recruiting payload smoke tests', () => {
  it('includes only changed published schedule fields', () => {
    const payload = buildPublishedSchedulePayload(baseSchedule, initialSchedule)

    expect(payload).toEqual({
      applyEndAt: '2026-03-10T00:00:00+09:00',
    })
  })

  it('infers isOther option when option content is 기타 (사용자 입력)', () => {
    const payload = buildQuestionsPayload([
      {
        target: { kind: 'COMMON_PAGE', pageNo: 1 },
        question: {
          questionId: 1,
          type: 'CHECKBOX',
          questionText: '파트를 선택하세요',
          required: true,
          orderNo: '1',
          options: [
            { content: 'WEB', orderNo: '1', optionId: 'opt-1' },
            { content: '기타 (사용자 입력)', orderNo: '2', optionId: 'opt-2' },
          ],
        },
      },
    ])

    expect(payload[0]?.question.options?.[1]).toMatchObject({
      content: '기타 (사용자 입력)',
      isOther: true,
    })
  })
})
