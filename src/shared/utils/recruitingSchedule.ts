import type { LegacyRecruitingInterviewTimeTable, ScheduleDateSlot } from '@/shared/types/form'

export const resolveDisabledScheduleSlots = (
  schedule: LegacyRecruitingInterviewTimeTable,
): Array<ScheduleDateSlot> =>
  Array.isArray(schedule.disabled) ? schedule.disabled : schedule.disabledByDate
