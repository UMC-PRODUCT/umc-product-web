import { useEffect, useMemo, useRef } from 'react'
import type { Control, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import dayjs from 'dayjs'

import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

type Params = {
  control: Control<RecruitingForms>
  setValue: UseFormSetValue<RecruitingForms>
  trigger: UseFormTrigger<RecruitingForms>
  initialSchedule: RecruitingSchedule | null
  status: RecruitingForms['status']
  isExtensionMode: boolean
}

type TimeSlot = RecruitingForms['schedule']['interviewTimeTable']['enabledByDate'][number]

export const useStep2ScheduleState = ({
  control,
  setValue,
  trigger,
  initialSchedule,
  status,
  isExtensionMode,
}: Params) => {
  const applyStartAt = useWatch({ control, name: 'schedule.applyStartAt' })
  const applyEndAt = useWatch({ control, name: 'schedule.applyEndAt' })
  const docResultAt = useWatch({ control, name: 'schedule.docResultAt' })
  const interviewStartAt = useWatch({ control, name: 'schedule.interviewStartAt' })
  const interviewEndAt = useWatch({ control, name: 'schedule.interviewEndAt' })
  const finalResultAt = useWatch({ control, name: 'schedule.finalResultAt' })
  const interviewTimeTable = useWatch({ control, name: 'schedule.interviewTimeTable' })

  const now = dayjs()

  const canEdit = useMemo(() => {
    if (status === 'DRAFT') {
      const draftEditable = {
        applyStartAt: true,
        applyEndAt: true,
        docResultAt: true,
        interviewStartAt: true,
        interviewEndAt: true,
        interviewTimeTable: true,
        finalResultAt: true,
      }
      if (!isExtensionMode) return draftEditable
      return {
        ...draftEditable,
        interviewStartAt: false,
        interviewEndAt: false,
        interviewTimeTable: false,
        finalResultAt: false,
      }
    }
    const prev = initialSchedule
    const applyStarted = prev?.applyStartAt ? now.isAfter(dayjs(prev.applyStartAt), 'day') : false
    const applyEnded = prev?.applyEndAt ? now.isAfter(dayjs(prev.applyEndAt), 'day') : false
    const interviewEnded = prev?.interviewEndAt
      ? now.isAfter(dayjs(prev.interviewEndAt), 'day')
      : false
    const docResultPast = prev?.docResultAt ? now.isAfter(dayjs(prev.docResultAt), 'day') : false
    const finalResultPast = prev?.finalResultAt
      ? now.isAfter(dayjs(prev.finalResultAt), 'day')
      : false
    return {
      applyStartAt: !applyStarted,
      applyEndAt: !applyEnded,
      docResultAt: !applyEnded && !docResultPast,
      interviewStartAt: false,
      interviewEndAt: false,
      interviewTimeTable: false,
      finalResultAt: !interviewEnded && !finalResultPast,
    }
  }, [initialSchedule, isExtensionMode, now, status])
  const canEditSlotMinutes = status === 'PUBLISHED' ? true : canEdit.interviewTimeTable

  const interviewDates = useMemo(() => {
    if (!interviewStartAt || !interviewEndAt) return []
    const startDate = dayjs(interviewStartAt)
    const endDate = dayjs(interviewEndAt)
    if (endDate.isBefore(startDate, 'day')) return []
    const dates: Array<string> = []
    let current = startDate
    while (!current.isAfter(endDate, 'day')) {
      dates.push(current.format('YYYY-MM-DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewStartAt, interviewEndAt])
  const hasTimeTableRange = Boolean(interviewStartAt && interviewEndAt)

  const enabledSlots = useMemo(
    () =>
      interviewTimeTable.enabledByDate.map((slot) => ({
        ...slot,
      })),
    [interviewTimeTable],
  )
  const timeRange = useMemo(() => interviewTimeTable.timeRange, [interviewTimeTable])

  const orderErrors = useMemo(() => {
    const makeError = (
      prev: string | null,
      curr: string | null,
      message: string,
      allowEqual = false,
    ) => {
      if (!prev || !curr) return ''
      const currDay = dayjs(curr)
      const prevDay = dayjs(prev)
      const invalid = allowEqual
        ? currDay.isBefore(prevDay, 'day')
        : !currDay.isAfter(prevDay, 'day')
      return invalid ? message : ''
    }

    return {
      applyEndAt: makeError(applyStartAt, applyEndAt, '서류 모집 시작일 이후로 선택해 주세요.'),
      docResultAt: makeError(applyEndAt, docResultAt, '서류 모집 종료일 이후로 선택해 주세요.'),
      interviewStartAt: makeError(
        docResultAt,
        interviewStartAt,
        '서류 결과 발표일 이후로 선택해 주세요.',
      ),
      interviewEndAt: makeError(
        interviewStartAt,
        interviewEndAt,
        '면접 평가 시작일 이후로 선택해 주세요.',
      ),
      finalResultAt: makeError(
        interviewEndAt,
        finalResultAt,
        '면접 평가 종료일과 같거나 이후로 선택해 주세요.',
        true,
      ),
    }
  }, [applyStartAt, applyEndAt, docResultAt, interviewStartAt, interviewEndAt, finalResultAt])

  const lastInterviewRangeKey = useRef<string>('')
  useEffect(() => {
    if (!hasTimeTableRange) return
    const startKey = interviewStartAt ? dayjs(interviewStartAt).valueOf() : 'null'
    const endKey = interviewEndAt ? dayjs(interviewEndAt).valueOf() : 'null'
    const nextKey = `${startKey}-${endKey}`
    if (lastInterviewRangeKey.current === nextKey) return
    lastInterviewRangeKey.current = nextKey
    if (enabledSlots.length === 0) return
    const slotKeys = enabledSlots.map((slot) => slot.date)
    if (slotKeys.length === 0 || interviewDates.length === 0) return
    const nextEnabled = enabledSlots.filter(
      (slot) => interviewDates.includes(slot.date) && slot.times.length > 0,
    )
    const hasOutOfRange = slotKeys.some((date) => !interviewDates.includes(date))
    if (!hasOutOfRange && nextEnabled.length === enabledSlots.length) return
    setValue('schedule.interviewTimeTable.enabledByDate', nextEnabled)
  }, [enabledSlots, interviewDates, interviewEndAt, interviewStartAt, setValue, hasTimeTableRange])

  useEffect(() => {
    if (!interviewStartAt || !interviewEndAt) {
      setValue('schedule.interviewTimeTable.dateRange', { start: '', end: '' })
      return
    }
    setValue('schedule.interviewTimeTable.dateRange', {
      start: dayjs(interviewStartAt).format('YYYY-MM-DD'),
      end: dayjs(interviewEndAt).format('YYYY-MM-DD'),
    })
  }, [interviewEndAt, interviewStartAt, setValue])

  // 값 변화 시 의존 필드를 재검증해 슈퍼리파인 오류가 즉시 노출되도록 함
  useEffect(() => {
    if (applyStartAt) trigger('schedule.applyEndAt')
  }, [applyStartAt, trigger])

  useEffect(() => {
    if (applyEndAt) trigger('schedule.docResultAt')
  }, [applyEndAt, trigger])

  useEffect(() => {
    if (docResultAt) trigger('schedule.interviewStartAt')
  }, [docResultAt, trigger])

  useEffect(() => {
    if (interviewStartAt) trigger('schedule.interviewEndAt')
  }, [interviewStartAt, trigger])

  useEffect(() => {
    if (interviewEndAt) trigger('schedule.finalResultAt')
  }, [interviewEndAt, trigger])

  // 자기 필드 값이 변해도 즉시 재검증 (슈퍼리파인 오류가 해당 필드에 걸리므로)
  useEffect(() => {
    if (applyEndAt) trigger('schedule.applyEndAt')
  }, [applyEndAt, trigger])

  useEffect(() => {
    if (docResultAt) trigger('schedule.docResultAt')
  }, [docResultAt, trigger])

  useEffect(() => {
    if (interviewStartAt) trigger('schedule.interviewStartAt')
  }, [interviewStartAt, trigger])

  useEffect(() => {
    if (interviewEndAt) trigger('schedule.interviewEndAt')
  }, [interviewEndAt, trigger])

  useEffect(() => {
    if (finalResultAt) trigger('schedule.finalResultAt')
  }, [finalResultAt, trigger])

  return {
    applyStartAt,
    applyEndAt,
    docResultAt,
    interviewStartAt,
    interviewEndAt,
    finalResultAt,
    interviewTimeTable,
    interviewDates,
    enabledSlots,
    timeRange,
    canEdit,
    canEditSlotMinutes,
    orderErrors,
    toTimeTableValue: enabledSlots.reduce<Record<string, Array<string>>>((acc, slot: TimeSlot) => {
      acc[slot.date] = slot.times
      return acc
    }, {}),
  }
}
