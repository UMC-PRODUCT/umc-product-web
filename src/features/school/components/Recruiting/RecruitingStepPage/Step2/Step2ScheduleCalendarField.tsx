import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import type { RecruitingForms } from '@/shared/types/form'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'

type ScheduleDateFieldName =
  | 'schedule.applyStartAt'
  | 'schedule.applyEndAt'
  | 'schedule.docResultAt'
  | 'schedule.interviewStartAt'
  | 'schedule.interviewEndAt'
  | 'schedule.finalResultAt'

type Props = {
  control: Control<RecruitingForms>
  name: ScheduleDateFieldName
  label: string
  disabled: boolean
  localError?: string
}

const Step2ScheduleCalendarField = ({ control, name, label, disabled, localError }: Props) => {
  const today = dayjs().startOf('day').toDate()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <LabelCalendar
          label={label}
          name={field.name}
          value={field.value ? new Date(field.value) : null}
          minDate={today}
          onChange={(date) => {
            field.onChange(dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'))
            field.onBlur()
          }}
          onBlur={field.onBlur}
          error={
            fieldState.error?.message || localError
              ? {
                  error: true,
                  errorMessage: fieldState.error?.message || localError || '',
                }
              : undefined
          }
          disabled={disabled}
        />
      )}
    />
  )
}

export default Step2ScheduleCalendarField
