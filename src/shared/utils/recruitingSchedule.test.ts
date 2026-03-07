import { describe, expect, it } from 'vitest'

import type { LegacyRecruitingInterviewTimeTable, ScheduleDateSlot } from '@/shared/types/form'

import { resolveDisabledScheduleSlots } from './recruitingSchedule'

const disabledSlots: Array<ScheduleDateSlot> = [{ date: '2026-03-20', times: ['10:00', '10:30'] }]

const baseSchedule: LegacyRecruitingInterviewTimeTable = {
  dateRange: { start: '2026-03-20', end: '2026-03-21' },
  timeRange: { start: '09:00', end: '18:00' },
  slotMinutes: '30',
  enabledByDate: [],
  disabledByDate: [],
}

describe('resolveDisabledScheduleSlots', () => {
  it('prefers legacy disabled when present', () => {
    expect(
      resolveDisabledScheduleSlots({
        ...baseSchedule,
        disabled: disabledSlots,
        disabledByDate: [{ date: '2026-03-21', times: ['11:00'] }],
      }),
    ).toEqual(disabledSlots)
  })

  it('keeps an empty legacy disabled array instead of falling back', () => {
    expect(
      resolveDisabledScheduleSlots({
        ...baseSchedule,
        disabled: [],
        disabledByDate: disabledSlots,
      }),
    ).toEqual([])
  })

  it('falls back to disabledByDate when legacy disabled is absent', () => {
    expect(
      resolveDisabledScheduleSlots({
        ...baseSchedule,
        disabledByDate: disabledSlots,
      }),
    ).toEqual(disabledSlots)
  })

  it('returns an empty array when both legacy and normalized values are missing', () => {
    expect(
      resolveDisabledScheduleSlots({
        ...baseSchedule,
        disabled: undefined,
        disabledByDate: undefined,
      } as unknown as LegacyRecruitingInterviewTimeTable),
    ).toEqual([])
  })
})
