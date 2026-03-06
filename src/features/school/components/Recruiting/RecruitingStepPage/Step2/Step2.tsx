import type { Control, UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { useStep2ScheduleState } from '@/features/school/hooks/recruiting/useStep2ScheduleState'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import { TimeTable } from '@/shared/ui/common/Question/TimeTable/TimeTable'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from '../common'
import Step2ScheduleCalendarField from './Step2ScheduleCalendarField'

const Step2 = ({
  control,
  setValue,
  setError,
  clearErrors,
  initialSchedule,
  status,
  isExtensionMode = false,
}: {
  control: Control<RecruitingForms>
  setValue: UseFormSetValue<RecruitingForms>
  setError: UseFormSetError<RecruitingForms>
  clearErrors: UseFormClearErrors<RecruitingForms>
  initialSchedule: RecruitingSchedule | null
  status: RecruitingForms['status']
  isExtensionMode?: boolean
}) => {
  const {
    interviewDates,
    interviewTimeTable,
    canEdit,
    canEditSlotMinutes,
    localErrors,
    localTimeTableError,
    markTouched,
    timeRange,
    toTimeTableValue,
  } = useStep2ScheduleState({
    control,
    setValue,
    setError,
    clearErrors,
    initialSchedule,
    status,
    isExtensionMode,
  })

  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>기간 설정</S.Title>
          <S.SubTitle>모집 일정별 기간을 설정하세요.</S.SubTitle>
        </Flex>

        <Flex gap={26} flexDirection="column" alignItems="flex-start">
          <Flex flexWrap="wrap" css={{ rowGap: 26, columnGap: 50 }}>
            <Step2ScheduleCalendarField
              control={control}
              name="schedule.applyStartAt"
              label="서류 모집 시작일"
              disabled={!canEdit.applyStartAt}
              localError={localErrors.applyStartAt}
              touchedKey="applyStartAt"
              onTouched={markTouched}
            />
            <Step2ScheduleCalendarField
              control={control}
              name="schedule.applyEndAt"
              label="서류 모집 종료일"
              disabled={!canEdit.applyEndAt}
              localError={localErrors.applyEndAt}
              touchedKey="applyEndAt"
              onTouched={markTouched}
            />
          </Flex>

          <Step2ScheduleCalendarField
            control={control}
            name="schedule.docResultAt"
            label="서류 결과 발표일"
            disabled={!canEdit.docResultAt}
            localError={localErrors.docResultAt}
            touchedKey="docResultAt"
            onTouched={markTouched}
          />

          <Flex flexWrap="wrap" css={{ rowGap: 26, columnGap: 50 }}>
            <Step2ScheduleCalendarField
              control={control}
              name="schedule.interviewStartAt"
              label="면접 평가 시작일"
              disabled={!canEdit.interviewStartAt}
              localError={localErrors.interviewStartAt}
              touchedKey="interviewStartAt"
              onTouched={markTouched}
            />
            <Step2ScheduleCalendarField
              control={control}
              name="schedule.interviewEndAt"
              label="면접 평가 종료일"
              disabled={!canEdit.interviewEndAt}
              localError={localErrors.interviewEndAt}
              touchedKey="interviewEndAt"
              onTouched={markTouched}
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
                  disabled={!canEditSlotMinutes}
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
                      value={toTimeTableValue}
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
                        isExtensionMode || (status === 'PUBLISHED' && !canEdit.interviewTimeTable)
                          ? 'gray'
                          : 'lime'
                      }
                      readOnlyCursor={!canEdit.interviewTimeTable ? 'not-allowed' : 'default'}
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

          <Step2ScheduleCalendarField
            control={control}
            name="schedule.finalResultAt"
            label="최종 결과 발표일"
            disabled={!canEdit.finalResultAt}
            localError={localErrors.finalResultAt}
            touchedKey="finalResultAt"
            onTouched={markTouched}
          />
        </Flex>
      </Section>
    </Flex>
  )
}

export default Step2
