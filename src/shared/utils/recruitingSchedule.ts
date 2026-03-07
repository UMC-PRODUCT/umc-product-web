import type { LegacyRecruitingInterviewTimeTable, ScheduleDateSlot } from '@/shared/types/form'

export const resolveDisabledScheduleSlots = (
  schedule: LegacyRecruitingInterviewTimeTable,
): Array<ScheduleDateSlot> => {
  if (Array.isArray(schedule.disabled)) {
    return schedule.disabled
  }

  return Array.isArray(schedule.disabledByDate) ? schedule.disabledByDate : []
}
