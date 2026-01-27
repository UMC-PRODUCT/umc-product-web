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

import type { RecruitingForms } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import { TimeTable } from '@/shared/ui/common/question/timeTable/TimeTable'
import Section from '@/shared/ui/common/Section/Section'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'

import * as S from '../common'

const Step2 = ({
  control,
  setValue,
  setError,
  clearErrors,
}: {
  control: Control<RecruitingForms>
  setValue: UseFormSetValue<RecruitingForms>
  setError: UseFormSetError<RecruitingForms>
  clearErrors: UseFormClearErrors<RecruitingForms>
}) => {
  const applyStartAt = useWatch({ control, name: 'schedule.applyStartAt' })
  const applyEndAt = useWatch({ control, name: 'schedule.applyEndAt' })
  const docResultAt = useWatch({ control, name: 'schedule.docResultAt' })
  const interviewStartAt = useWatch({ control, name: 'schedule.interviewStartAt' })
  const interviewEndAt = useWatch({ control, name: 'schedule.interviewEndAt' })
  const finalResultAt = useWatch({ control, name: 'schedule.finalResultAt' })
  const interviewTimeTable = useWatch({ control, name: 'schedule.interviewTimeTable' })
  const lastErrorStateRef = useRef<Record<string, boolean>>({})

  const interviewDates = useMemo(() => {
    if (!interviewStartAt || !interviewEndAt) return []
    const start = dayjs(interviewStartAt).startOf('day')
    const end = dayjs(interviewEndAt).startOf('day')
    if (end.isBefore(start, 'day')) return []
    const dates: Array<string> = []
    let current = start
    while (!current.isAfter(end, 'day')) {
      dates.push(current.format('YYYY-MM-DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewStartAt, interviewEndAt])

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
  }, [enabledSlots, interviewDates, interviewEndAt, interviewStartAt, setValue])

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
    const hasEmptyDate = interviewDates.some((date) => {
      const targetSlot = enabledSlots.find((slot) => slot.date === date)
      const slotsForDate = targetSlot?.times ?? []
      return slotsForDate.length === 0
    })
    updateErrorState(
      'schedule.interviewTimeTable.enabledByDate',
      hasEmptyDate,
      '모든 면접 날짜에 최소 1개의 시간을 선택해 주세요.',
    )
  }, [enabledSlots, interviewDates, updateErrorState])

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
      '서류 모집 종료 이후로 선택해 주세요.',
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
                        const nextEnabled = Object.entries(nextValue).map(([date, times]) => ({
                          date,
                          times,
                        }))
                        field.onChange(nextEnabled)
                      }}
                      mode="edit"
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
              />
            )}
          />
        </Flex>
      </Section>
    </Flex>
  )
}

export default Step2
