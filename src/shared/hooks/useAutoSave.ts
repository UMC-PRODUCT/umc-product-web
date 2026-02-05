import { useCallback, useEffect, useState } from 'react'
import type { FieldValues } from 'react-hook-form'

import type { UseAutoSaveOptions, UseAutoSaveReturn } from '@/shared/types/autoSave'
import { formatDateTimeKorean } from '@/shared/utils'

// 기본 자동 저장 주기(1분).
const DEFAULT_AUTO_SAVE_INTERVAL_MS = 60_000

export function useAutoSave<TFormValues extends FieldValues>({
  getValues,
  interval = DEFAULT_AUTO_SAVE_INTERVAL_MS,
  onSave,
  enabled = true,
}: UseAutoSaveOptions<TFormValues>): UseAutoSaveReturn {
  const [lastSavedTime, setLastSavedTime] = useState<string>('')

  // 현재 폼 값을 저장(실제 저장 로직은 추후 교체).
  const handleSave = useCallback(() => {
    if (!enabled) return

    const formValues = getValues()
    onSave?.(formValues)

    const currentDateTime = new Date()
    const formattedDateTime = formatDateTimeKorean(currentDateTime)

    setLastSavedTime(formattedDateTime)
  }, [getValues, onSave, enabled])

  useEffect(() => {
    if (!enabled) return

    const autoSaveTimer = setInterval(() => {
      handleSave()
    }, interval)

    return () => clearInterval(autoSaveTimer)
  }, [handleSave, interval, enabled])

  return { lastSavedTime, handleSave }
}
