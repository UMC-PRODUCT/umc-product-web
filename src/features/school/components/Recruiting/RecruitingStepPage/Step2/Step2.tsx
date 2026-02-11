import { useCallback, useEffect, useMemo, useRef } from 'react'
import type {
  Control,
  FieldPath,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { Controller, useWatch } from 'react-hook-form'
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
  const lastErrorStateRef = useRef<Record<string, boolean>>({})

  // 일정 잠금 판단: 초기 스케줄 대비 변경 여부와 현재 시각 및 상태 기반
  const now = dayjs()

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
    return {
      applyStartAt: !applyStarted,
      applyEndAt: !applyEnded,
      docResultAt: true,
      interviewStartAt: false,
      interviewEndAt: false,
      interviewTimeTable: false,
      finalResultAt: true,
    }
  }, [initialSchedule, now, status])

  const interviewDates = useMemo(() => {
    const { start, end } = interviewTimeTable.dateRange
    if (!start || !end) return []
    const startDate = dayjs(start)
    const endDate = dayjs(end)
    if (endDate.isBefore(startDate, 'day')) return []
    const dates: Array<string> = []
    let current = startDate
    while (!current.isAfter(endDate, 'day')) {
      dates.push(current.format('YYYY-MM-DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewTimeTable.dateRange])
  const hasTimeTableRange = Boolean(
    interviewTimeTable.dateRange.start && interviewTimeTable.dateRange.end,
  )

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
    if (
      slotKeys.length > 0 &&
      interviewDates.length > 0 &&
      slotKeys.every((date) => interviewDates.includes(date))
    ) {
      return
    }
    setValue('schedule.interviewTimeTable.enabledByDate', [])
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
    (field: FieldPath<RecruitingForms>, hasError: boolean, message: string) => {
      const prev = lastErrorStateRef.current[field]
      if (prev === hasError) return
      lastErrorStateRef.current[field] = hasError
      if (hasError) {
        setError(field, { type: 'validate', message })
      } else {
        clearErrors(field)
      }
    },
    [setError, clearErrors],
  )

  useEffect(() => {
    if (interviewDates.length === 0) return
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
    )
  }, [enabledSlots, interviewDates, updateErrorState])

  // 필수 입력 즉시 에러 노출
  const requireField = useCallback(
    (field: FieldPath<RecruitingForms>, value: string | null | undefined, message: string) => {
      updateErrorState(field, !value, message)
    },
    [updateErrorState],
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
    updateErrorState(
      'schedule.applyEndAt',
      dayjs(applyEndAt).isBefore(dayjs(applyStartAt)),
      '서류 모집 시작 이후로 선택해 주세요.',
    )
  }, [applyStartAt, applyEndAt, updateErrorState])

  useEffect(() => {
    if (!applyEndAt || !docResultAt) return
    updateErrorState(
      'schedule.docResultAt',
      dayjs(docResultAt).isBefore(dayjs(applyEndAt)),
      '서류 모집 종료일과 같거나 이후로 선택해 주세요.',
    )
  }, [applyEndAt, docResultAt, updateErrorState])

  useEffect(() => {
    if (!docResultAt || !interviewStartAt) return
    updateErrorState(
      'schedule.interviewStartAt',
      dayjs(interviewStartAt).isBefore(dayjs(docResultAt)),
      '서류 결과 발표 이후로 선택해 주세요.',
    )
  }, [docResultAt, interviewStartAt, updateErrorState])

  useEffect(() => {
    if (!interviewStartAt || !interviewEndAt) return
    updateErrorState(
      'schedule.interviewEndAt',
      dayjs(interviewEndAt).isBefore(dayjs(interviewStartAt)),
      '면접 평가 시작 이후로 선택해 주세요.',
    )
  }, [interviewStartAt, interviewEndAt, updateErrorState])

  useEffect(() => {
    if (!interviewEndAt || !finalResultAt) return
    updateErrorState(
      'schedule.finalResultAt',
      dayjs(finalResultAt).isBefore(dayjs(interviewEndAt)),
      '면접 평가 종료 이후로 선택해 주세요.',
    )
  }, [interviewEndAt, finalResultAt, updateErrorState])

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
                  }}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
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
                  }}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
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
                }}
                onBlur={field.onBlur}
                error={{
                  error: !!fieldState.error,
                  errorMessage: fieldState.error?.message || '',
                }}
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
                  }}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
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
                  }}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
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
                  label="면접 진행 시간(분)"
                  placeholder="예: 30"
                  value={field.value}
                  onChange={(event) => {
                    const nextValue = event.target.value.replace(/\D/g, '')
                    field.onChange(nextValue)
                  }}
                  onBlur={field.onBlur}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  css={{ width: '100%' }}
                  disabled={!canEdit.interviewTimeTable}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
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
                      }}
                      mode={canEdit.interviewTimeTable ? 'edit' : 'view'}
                      disabledSlots={[]}
                    />
                    {fieldState.error && (
                      <ErrorMessage
                        typo="B4.Md"
                        responsiveTypo={{ tablet: 'B4.Md' }}
                        errorMessage={fieldState.error.message || ''}
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
                }}
                onBlur={field.onBlur}
                error={{
                  error: !!fieldState.error,
                  errorMessage: fieldState.error?.message || '',
                }}
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
