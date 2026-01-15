import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Control, UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form'
import { Controller, useWatch } from 'react-hook-form'
import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import { TimeTable } from '@/shared/ui/common/question/timeTable/TimeTable'
import Section from '@/shared/ui/common/Section/Section'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'

import * as S from './common'

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
  const documentStartDate = useWatch({ control, name: 'documentStartDate' })
  const documentEndDate = useWatch({ control, name: 'documentEndDate' })
  const documentResultDate = useWatch({ control, name: 'documentResultDate' })
  const interviewStartDate = useWatch({ control, name: 'interviewStartDate' })
  const interviewEndDate = useWatch({ control, name: 'interviewEndDate' })
  const finalResultDate = useWatch({ control, name: 'finalResultDate' })
  const interviewTimeSlots = useWatch({ control, name: 'interviewTimeSlots' })
  const lastErrorStateRef = useRef<Record<string, boolean>>({})

  const interviewDates = useMemo(() => {
    if (!interviewStartDate || !interviewEndDate) return []
    const start = dayjs(interviewStartDate).startOf('day')
    const end = dayjs(interviewEndDate).startOf('day')
    if (end.isBefore(start, 'day')) return []
    const dates: Array<string> = []
    let current = start
    while (!current.isAfter(end, 'day')) {
      dates.push(current.format('YYYY/MM/DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewStartDate, interviewEndDate])

  const lastInterviewRangeKey = useRef<string>('')
  useEffect(() => {
    const startKey = interviewStartDate ? interviewStartDate.getTime() : 'null'
    const endKey = interviewEndDate ? interviewEndDate.getTime() : 'null'
    const nextKey = `${startKey}-${endKey}`
    if (lastInterviewRangeKey.current === nextKey) return
    lastInterviewRangeKey.current = nextKey
    setValue('interviewTimeSlots', {})
  }, [interviewStartDate, interviewEndDate, setValue])

  const updateErrorState = useCallback(
    (field: keyof RecruitingForms, hasError: boolean, message: string) => {
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
      const slots = interviewTimeSlots[date] ?? []
      return !Array.isArray(slots) || slots.length === 0
    })
    updateErrorState(
      'interviewTimeSlots',
      hasEmptyDate,
      '모든 면접 날짜에 최소 1개의 시간을 선택해 주세요.',
    )
  }, [interviewDates, interviewTimeSlots, updateErrorState])

  useEffect(() => {
    if (!documentStartDate || !documentEndDate) return
    updateErrorState(
      'documentEndDate',
      documentEndDate < documentStartDate,
      '서류 모집 시작 이후로 선택해 주세요.',
    )
  }, [documentStartDate, documentEndDate, updateErrorState])

  useEffect(() => {
    if (!documentEndDate || !documentResultDate) return
    updateErrorState(
      'documentResultDate',
      documentResultDate < documentEndDate,
      '서류 모집 종료 이후로 선택해 주세요.',
    )
  }, [documentEndDate, documentResultDate, updateErrorState])

  useEffect(() => {
    if (!documentResultDate || !interviewStartDate) return
    updateErrorState(
      'interviewStartDate',
      interviewStartDate < documentResultDate,
      '서류 결과 발표 이후로 선택해 주세요.',
    )
  }, [documentResultDate, interviewStartDate, updateErrorState])

  useEffect(() => {
    if (!interviewStartDate || !interviewEndDate) return
    updateErrorState(
      'interviewEndDate',
      interviewEndDate < interviewStartDate,
      '면접 평가 시작 이후로 선택해 주세요.',
    )
  }, [interviewStartDate, interviewEndDate, updateErrorState])

  useEffect(() => {
    if (!interviewEndDate || !finalResultDate) return
    updateErrorState(
      'finalResultDate',
      finalResultDate < interviewEndDate,
      '면접 평가 종료 이후로 선택해 주세요.',
    )
  }, [interviewEndDate, finalResultDate, updateErrorState])

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
              name="documentStartDate"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="서류 모집 시작일"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
                />
              )}
            />
            <Controller
              name="documentEndDate"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="서류 모집 종료일"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
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
            name="documentResultDate"
            control={control}
            render={({ field, fieldState }) => (
              <LabelCalendar
                label="서류 결과 발표일"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
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
              name="interviewStartDate"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="면접 평가 시작일"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={{
                    error: !!fieldState.error,
                    errorMessage: fieldState.error?.message || '',
                  }}
                />
              )}
            />
            <Controller
              name="interviewEndDate"
              control={control}
              render={({ field, fieldState }) => (
                <LabelCalendar
                  label="면접 평가 종료일"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
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
                name="interviewTimeSlots"
                control={control}
                render={({ field, fieldState }) => (
                  <Flex flexDirection="column" alignItems="flex-start" gap={30}>
                    <TimeTable
                      dates={interviewDates}
                      timeRange={['09:00', '23:00']}
                      value={field.value}
                      onChange={field.onChange}
                      mode="edit"
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
            name="finalResultDate"
            control={control}
            render={({ field, fieldState }) => (
              <LabelCalendar
                label="최종 결과 발표일"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
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
