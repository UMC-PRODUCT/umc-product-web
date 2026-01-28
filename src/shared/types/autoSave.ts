import type { FieldValues, UseFormGetValues } from 'react-hook-form'

export interface UseAutoSaveOptions<TFormValues extends FieldValues> {
  getValues: UseFormGetValues<TFormValues>
  interval?: number
  onSave?: (values: TFormValues) => void
  enabled?: boolean
}

export interface UseAutoSaveReturn {
  lastSavedTime: string
  handleSave: () => void
}
