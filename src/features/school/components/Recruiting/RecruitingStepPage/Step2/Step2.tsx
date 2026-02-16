/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  Control,
  FieldPath,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { Controller, useFormState, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import { TimeTable } from '@/shared/ui/common/Question/TimeTable/TimeTable'
import Section from '@/shared/ui/common/Section/Section'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from '../common'

const Step2 = ({
  control,
  setValue,
  setError,
  clearErrors,
  initialSchedule,
  status,
}: {
  control: Control<RecruitingForms>
  setValue: UseFormSetValue<RecruitingForms>
  setError: UseFormSetError<RecruitingForms>
  clearErrors: UseFormClearErrors<RecruitingForms>
  initialSchedule: RecruitingSchedule | null
  status: RecruitingForms['status']
}) => {
  const applyStartAt = useWatch({ control, name: 'schedule.applyStartAt' })
  const applyEndAt = useWatch({ control, name: 'schedule.applyEndAt' })
  const docResultAt = useWatch({ control, name: 'schedule.docResultAt' })
  const interviewStartAt = useWatch({ control, name: 'schedule.interviewStartAt' })
  const interviewEndAt = useWatch({ control, name: 'schedule.interviewEndAt' })
  const finalResultAt = useWatch({ control, name: 'schedule.finalResultAt' })
  const interviewTimeTable = useWatch({ control, name: 'schedule.interviewTimeTable' })
  const formState = useFormState({ control })
  const lastErrorStateRef = useRef<Record<string, boolean>>({})
  const [localErrors, setLocalErrors] = useState<
    Partial<Record<keyof RecruitingForms['schedule'], string>>
  >({})
  const [localTimeTableError, setLocalTimeTableError] = useState<string>('')
  const [localTouched, setLocalTouched] = useState<
    Partial<Record<keyof RecruitingForms['schedule'], boolean>>
  >({
    applyStartAt: true,
    applyEndAt: true,
    docResultAt: true,
    interviewStartAt: true,
    interviewEndAt: true,
    interviewTimeTable: true,
    finalResultAt: true,
  })

  const markTouched = useCallback((key: keyof RecruitingForms['schedule']) => {
    setLocalTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }, [])

  const isScheduleTouched = useCallback(
    (key: keyof RecruitingForms['schedule']) =>
      Boolean(localTouched[key]) ||
      Boolean(
        (
          formState.touchedFields.schedule as
            | Partial<Record<keyof RecruitingForms['schedule'], boolean>>
            | undefined
        )?.[key],
      ),
    [formState.touchedFields.schedule, localTouched],
  )

  const isTimeTableTouched = useCallback(
    () =>
      Boolean(localTouched.interviewTimeTable) ||
      Boolean(
        (
          formState.touchedFields.schedule as
            | { interviewTimeTable?: { enabledByDate?: boolean } }
            | undefined
        )?.interviewTimeTable?.enabledByDate,
      ),
    [formState.touchedFields.schedule, localTouched.interviewTimeTable],
  )

  // 일정 잠금 판단: 초기 스케줄 대비 변경 여부와 현재 시각 및 상태 기반
  const now = dayjs()
  const today = dayjs().startOf('day')

  const canEdit = useMemo(() => {
    if (status === 'DRAFT') {
      return {
        applyStartAt: true,
        applyEndAt: true,
        docResultAt: true,
        interviewStartAt: true,
        interviewEndAt: true,
        interviewTimeTable: true,
        finalResultAt: true,
      }
    }
    const prev = initialSchedule
    const applyStarted = prev?.applyStartAt ? now.isAfter(dayjs(prev.applyStartAt), 'day') : false
    const applyEnded = prev?.applyEndAt ? now.isAfter(dayjs(prev.applyEndAt), 'day') : false
    const interviewEnded = prev?.interviewEndAt
      ? now.isAfter(dayjs(prev.interviewEndAt), 'day')
      : false
    const applyStartPast = prev?.applyStartAt ? now.isAfter(dayjs(prev.applyStartAt), 'day') : false
    const applyEndPast = prev?.applyEndAt ? now.isAfter(dayjs(prev.applyEndAt), 'day') : false
    const docResultPast = prev?.docResultAt ? now.isAfter(dayjs(prev.docResultAt), 'day') : false
    const interviewStartPast = prev?.interviewStartAt
      ? now.isAfter(dayjs(prev.interviewStartAt), 'day')
      : false
    const interviewEndPast = prev?.interviewEndAt
      ? now.isAfter(dayjs(prev.interviewEndAt), 'day')
      : false
    const finalResultPast = prev?.finalResultAt
      ? now.isAfter(dayjs(prev.finalResultAt), 'day')
      : false
    return {
      applyStartAt: !applyStarted && !applyStartPast,
      applyEndAt: !applyEnded && !applyEndPast,
      docResultAt: !applyEnded && !docResultPast,
      interviewStartAt: !interviewEnded && !interviewStartPast,
      interviewEndAt: !interviewEnded && !interviewEndPast,
      interviewTimeTable: !docResultPast,
      finalResultAt: !interviewEnded && !finalResultPast,
    }
  }, [initialSchedule, now, status])

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

  const updateErrorState = useCallback(
    (field: FieldPath<RecruitingForms>, hasError: boolean, message: string, errorKey: string) => {
      if (field === 'schedule.interviewTimeTable.enabledByDate') {
        if (!canEdit.interviewTimeTable) return
      } else if (field.startsWith('schedule.')) {
        const key = field.replace('schedule.', '') as keyof typeof canEdit
        if (key in canEdit && !canEdit[key]) return
      }
      const stateKey = `${field}:${errorKey}`
      const prev = lastErrorStateRef.current[stateKey]
      if (prev === hasError) return
      lastErrorStateRef.current[stateKey] = hasError
      if (hasError) {
        setError(field, { type: errorKey, message })
        if (field.startsWith('schedule.')) {
          const key = field.replace('schedule.', '') as keyof RecruitingForms['schedule']
          setLocalErrors((prevErrors) => ({ ...prevErrors, [key]: message }))
        }
        if (field === 'schedule.interviewTimeTable.enabledByDate') {
          setLocalTimeTableError(message)
        }
        return
      }
      clearErrors(field)
      if (field.startsWith('schedule.')) {
        const key = field.replace('schedule.', '') as keyof RecruitingForms['schedule']
        setLocalErrors((prevErrors) =>
          prevErrors[key] === message
            ? Object.fromEntries(
                Object.entries(prevErrors).filter(([entryKey]) => entryKey !== key),
              )
            : prevErrors,
        )
      }
      if (field === 'schedule.interviewTimeTable.enabledByDate') {
        setLocalTimeTableError((prevMessage) => (prevMessage === message ? '' : prevMessage))
      }
    },
    [setError, clearErrors, canEdit],
  )

  useEffect(() => {
    if (interviewDates.length === 0) return
    if (!isTimeTableTouched()) return
    const startDate = interviewDates[0]
    const endDate = interviewDates[interviewDates.length - 1]
    const hasNoTimesOnDate = (date: string) => {
      const targetSlot = enabledSlots.find((slot) => slot.date === date)
      const slotsForDate = targetSlot?.times ?? []
      return slotsForDate.length === 0
    }
    const hasEmptyDate = hasNoTimesOnDate(startDate) || hasNoTimesOnDate(endDate)
    updateErrorState(
      'schedule.interviewTimeTable.enabledByDate',
      hasEmptyDate,
      '시작일과 마지막일에는 최소 1개의 시간을 선택해 주세요.',
      'timetable',
    )
  }, [enabledSlots, interviewDates, updateErrorState, isScheduleTouched, isTimeTableTouched])

  // 필수 입력 즉시 에러 노출
  const requireField = useCallback(
    (field: FieldPath<RecruitingForms>, value: string | null | undefined, message: string) => {
      const key = field.replace('schedule.', '') as keyof RecruitingForms['schedule']
      if (!isScheduleTouched(key)) return
      updateErrorState(field, !value, message, 'required')
    },
    [isScheduleTouched, updateErrorState],
  )

  useEffect(() => {
    requireField('schedule.applyStartAt', applyStartAt, '서류 모집 시작일을 선택해 주세요.')
  }, [applyStartAt, requireField])

  useEffect(() => {
    requireField('schedule.applyEndAt', applyEndAt, '서류 모집 종료일을 선택해 주세요.')
  }, [applyEndAt, requireField])

  useEffect(() => {
    requireField('schedule.docResultAt', docResultAt, '서류 결과 발표일을 선택해 주세요.')
  }, [docResultAt, requireField])

  useEffect(() => {
    requireField('schedule.interviewStartAt', interviewStartAt, '면접 평가 시작일을 선택해 주세요.')
  }, [interviewStartAt, requireField])

  useEffect(() => {
    requireField('schedule.interviewEndAt', interviewEndAt, '면접 평가 종료일을 선택해 주세요.')
  }, [interviewEndAt, requireField])

  useEffect(() => {
    requireField('schedule.finalResultAt', finalResultAt, '최종 결과 발표일을 선택해 주세요.')
  }, [finalResultAt, requireField])

  useEffect(() => {
    if (!applyStartAt || !applyEndAt) return
    if (!isScheduleTouched('applyStartAt') && !isScheduleTouched('applyEndAt')) return
    updateErrorState(
      'schedule.applyEndAt',
      dayjs(applyEndAt).isBefore(dayjs(applyStartAt), 'day') ||
        dayjs(applyEndAt).isSame(dayjs(applyStartAt), 'day'),
      '서류 모집 시작일 이후로 선택해 주세요.',
      'order',
    )
  }, [applyStartAt, applyEndAt, updateErrorState, isScheduleTouched])

  useEffect(() => {
    if (!applyEndAt || !docResultAt) return
    if (!isScheduleTouched('applyEndAt') && !isScheduleTouched('docResultAt')) return
    updateErrorState(
      'schedule.docResultAt',
      dayjs(docResultAt).isBefore(dayjs(applyEndAt), 'day') ||
        dayjs(docResultAt).isSame(dayjs(applyEndAt), 'day'),
      '서류 모집 종료일 이후로 선택해 주세요.',
      'order',
    )
  }, [applyEndAt, docResultAt, updateErrorState, isScheduleTouched])

  useEffect(() => {
    if (!docResultAt || !interviewStartAt) return
    if (!isScheduleTouched('docResultAt') && !isScheduleTouched('interviewStartAt')) return
    updateErrorState(
      'schedule.interviewStartAt',
      dayjs(interviewStartAt).isBefore(dayjs(docResultAt), 'day') ||
        dayjs(interviewStartAt).isSame(dayjs(docResultAt), 'day'),
      '서류 결과 발표일 이후로 선택해 주세요.',
      'order',
    )
  }, [docResultAt, interviewStartAt, updateErrorState, isScheduleTouched])

  useEffect(() => {
    if (!interviewStartAt || !interviewEndAt) return
    if (!isScheduleTouched('interviewStartAt') && !isScheduleTouched('interviewEndAt')) return
    updateErrorState(
      'schedule.interviewEndAt',
      dayjs(interviewEndAt).isBefore(dayjs(interviewStartAt), 'day') ||
        dayjs(interviewEndAt).isSame(dayjs(interviewStartAt), 'day'),
      '면접 평가 시작일 이후로 선택해 주세요.',
      'order',
    )
  }, [interviewStartAt, interviewEndAt, updateErrorState, isScheduleTouched])

  useEffect(() => {
    if (!interviewEndAt || !finalResultAt) return
    if (!isScheduleTouched('interviewEndAt') && !isScheduleTouched('finalResultAt')) return
    updateErrorState(
      'schedule.finalResultAt',
      dayjs(finalResultAt).isBefore(dayjs(interviewEndAt), 'day'),
      '면접 평가 종료일과 같거나 이후로 선택해 주세요.',
      'order',
    )
  }, [interviewEndAt, finalResultAt, updateErrorState, isScheduleTouched])

  useEffect(() => {
    if (status !== 'PUBLISHED') return
    const pairs: Array<[keyof RecruitingForms['schedule'], string | null]> = [
      ['applyStartAt', applyStartAt],
      ['applyEndAt', applyEndAt],
      ['docResultAt', docResultAt],
      ['interviewStartAt', interviewStartAt],
      ['interviewEndAt', interviewEndAt],
      ['finalResultAt', finalResultAt],
    ]
    pairs.forEach(([key, value]) => {
      if (!value) return
      updateErrorState(
        `schedule.${key}`,
        dayjs(value).isBefore(today, 'day'),
        '과거 날짜로는 수정할 수 없습니다.',
        'past',
      )
    })
  }, [
    status,
    applyStartAt,
    applyEndAt,
    docResultAt,
    interviewStartAt,
    interviewEndAt,
    finalResultAt,
    updateErrorState,
    today,
  ])

  useEffect(() => {
    if (status !== 'PUBLISHED') return
    if (initialSchedule?.applyEndAt && applyEndAt) {
      updateErrorState(
        'schedule.applyEndAt',
        dayjs(applyEndAt).isBefore(dayjs(initialSchedule.applyEndAt), 'day'),
        '모집 마감일은 단축할 수 없습니다.',
        'policy',
      )
    }
    if (initialSchedule?.interviewStartAt && interviewStartAt) {
      updateErrorState(
        'schedule.interviewStartAt',
        dayjs(interviewStartAt).isBefore(dayjs(initialSchedule.interviewStartAt), 'day'),
        '면접 시작일은 앞당길 수 없습니다.',
        'policy',
      )
    }
  }, [status, initialSchedule, applyEndAt, interviewStartAt, updateErrorState])

  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>기간 설정</S.Title>
          <S.SubTitle>모집 일정별 기간을 설정하세요.</S.SubTitle>
        </Flex>
        <Flex gap={26} flexDirection="column" alignItems="flex-start">
          <Flex flexWrap="wrap" css={{ rowGap: 26, columnGap: 50 }}>
            <Controller
              name="schedule.applyStartAt"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="서류 모집 시작일"
                  name={field.name}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                    field.onBlur()
                    markTouched('applyStartAt')
                  }}
                  onBlur={field.onBlur}
                  error={
                    fieldState.error?.message || localErrors.applyStartAt
                      ? {
                          error: true,
                          errorMessage: fieldState.error?.message || localErrors.applyStartAt || '',
                        }
                      : undefined
                  }
                  disabled={!canEdit.applyStartAt}
                />
              )}
            />
            <Controller
              name="schedule.applyEndAt"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="서류 모집 종료일"
                  name={field.name}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                    field.onBlur()
                    markTouched('applyEndAt')
                  }}
                  onBlur={field.onBlur}
                  error={
                    fieldState.error?.message || localErrors.applyEndAt
                      ? {
                          error: true,
                          errorMessage: fieldState.error?.message || localErrors.applyEndAt || '',
                        }
                      : undefined
                  }
                  disabled={!canEdit.applyEndAt}
                />
              )}
            />
          </Flex>
          <Controller
            name="schedule.docResultAt"
            control={control}
            render={({ field, fieldState }) => (
              <LabelCalendar
                label="서류 결과 발표일"
                name={field.name}
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                  field.onBlur()
                  markTouched('docResultAt')
                }}
                onBlur={field.onBlur}
                error={
                  fieldState.error?.message || localErrors.docResultAt
                    ? {
                        error: true,
                        errorMessage: fieldState.error?.message || localErrors.docResultAt || '',
                      }
                    : undefined
                }
                disabled={!canEdit.docResultAt}
              />
            )}
          />
          <Flex flexWrap="wrap" css={{ rowGap: 26, columnGap: 50 }}>
            <Controller
              name="schedule.interviewStartAt"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="면접 평가 시작일"
                  name={field.name}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                    field.onBlur()
                    markTouched('interviewStartAt')
                  }}
                  onBlur={field.onBlur}
                  error={
                    fieldState.error?.message || localErrors.interviewStartAt
                      ? {
                          error: true,
                          errorMessage:
                            fieldState.error?.message || localErrors.interviewStartAt || '',
                        }
                      : undefined
                  }
                  disabled={!canEdit.interviewStartAt}
                />
              )}
            />
            <Controller
              name="schedule.interviewEndAt"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="면접 평가 종료일"
                  name={field.name}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                    field.onBlur()
                    markTouched('interviewEndAt')
                  }}
                  onBlur={field.onBlur}
                  error={
                    fieldState.error?.message || localErrors.interviewEndAt
                      ? {
                          error: true,
                          errorMessage:
                            fieldState.error?.message || localErrors.interviewEndAt || '',
                        }
                      : undefined
                  }
                  disabled={!canEdit.interviewEndAt}
                />
              )}
            />
          </Flex>
          <Flex
            css={{
              width: '100%',
              maxWidth: '400px',
              [media.down(theme.breakPoints.tablet)]: { maxWidth: '100%' },
            }}
          >
            <Controller
              name="schedule.interviewTimeTable.slotMinutes"
              control={control}
              render={({ field, fieldState }) => (
                <LabelTextField
                  type="text"
                  autoComplete="none"
                  label="면접 진행 시간 (쉬는시간 포함, 분 단위)"
                  placeholder="예: 30"
                  value={field.value}
                  onChange={(event) => {
                    const nextValue = event.target.value.replace(/\D/g, '')
                    field.onChange(nextValue)
                    field.onBlur()
                    markTouched('interviewTimeTable')
                  }}
                  onBlur={field.onBlur}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  css={{ width: '100%' }}
                  disabled={!canEdit.interviewTimeTable}
                  error={
                    fieldState.error?.message || localErrors.interviewTimeTable
                      ? {
                          error: true,
                          errorMessage:
                            fieldState.error?.message || localErrors.interviewTimeTable || '',
                        }
                      : undefined
                  }
                />
              )}
            />
          </Flex>
          {interviewDates.length > 0 && (
            <Flex flexDirection="column" alignItems="flex-start">
              <Label label="면접 시간대 설정" necessary={true} />
              <Controller
                name="schedule.interviewTimeTable.enabledByDate"
                control={control}
                render={({ field, fieldState }) => (
                  <Flex flexDirection="column" alignItems="flex-start" gap={30}>
                    <TimeTable
                      dateRange={{
                        start: interviewDates[0],
                        end: interviewDates[interviewDates.length - 1],
                      }}
                      timeRange={timeRange}
                      slotMinutes={interviewTimeTable.slotMinutes}
                      selectionMinutes={30}
                      value={enabledSlots.reduce<Record<string, Array<string>>>((acc, slot) => {
                        acc[slot.date] = slot.times
                        return acc
                      }, {})}
                      onChange={(nextValue) => {
                        if (!canEdit.interviewTimeTable) return
                        const nextEnabled = Object.entries(nextValue).map(([date, times]) => ({
                          date,
                          times,
                        }))
                        field.onChange(nextEnabled)
                        field.onBlur()
                        markTouched('interviewTimeTable')
                      }}
                      mode={canEdit.interviewTimeTable ? 'edit' : 'view'}
                      selectedColorMode={
                        status === 'PUBLISHED' && !canEdit.interviewTimeTable ? 'gray' : 'lime'
                      }
                      disabledSlots={[]}
                    />
                    {fieldState.error && (
                      <ErrorMessage
                        typo="B4.Md"
                        responsiveTypo={{ tablet: 'B4.Md' }}
                        errorMessage={fieldState.error.message || localTimeTableError || ''}
                      />
                    )}
                  </Flex>
                )}
              />
            </Flex>
          )}
          <Controller
            name="schedule.finalResultAt"
            control={control}
            render={({ field, fieldState }) => (
              <LabelCalendar
                label="최종 결과 발표일"
                name={field.name}
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
                  field.onBlur()
                  markTouched('finalResultAt')
                }}
                onBlur={field.onBlur}
                error={
                  fieldState.error?.message || localErrors.finalResultAt
                    ? {
                        error: true,
                        errorMessage: fieldState.error?.message || localErrors.finalResultAt || '',
                      }
                    : undefined
                }
                disabled={!canEdit.finalResultAt}
              />
            )}
          />
        </Flex>
      </Section>
    </Flex>
  )
}

export default Step2
