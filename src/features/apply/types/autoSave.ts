import type { UseFormGetValues } from 'react-hook-form'

export interface UseAutoSaveOptions<TFormValues extends Record<string, unknown>> {
  getValues: UseFormGetValues<TFormValues>
  interval?: number
}

export interface UseAutoSaveReturn {
  lastSavedTime: string
  handleSave: () => void
}
