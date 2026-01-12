import { useCallback, useEffect, useState } from 'react'

import type { UseAutoSaveOptions, UseAutoSaveReturn } from '@/features/apply/types/autoSave'

const DEFAULT_AUTO_SAVE_INTERVAL_MS = 60_000

function formatDateTimeKorean(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
}

export function useAutoSave<TFormValues extends Record<string, unknown>>({
  getValues,
  interval = DEFAULT_AUTO_SAVE_INTERVAL_MS,
}: UseAutoSaveOptions<TFormValues>): UseAutoSaveReturn {
  const [lastSavedTime, setLastSavedTime] = useState<string>('')

  const handleSave = useCallback(() => {
    const formValues = getValues()
    console.log('[AutoSave] 저장 데이터:', formValues)

    const currentDateTime = new Date()
    const formattedDateTime = formatDateTimeKorean(currentDateTime)

    setLastSavedTime(formattedDateTime)
    console.log(`[AutoSave] ${formattedDateTime} 저장 완료`)
  }, [getValues])

  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      handleSave()
    }, interval)

    return () => clearInterval(autoSaveTimer)
  }, [handleSave, interval])

  return { lastSavedTime, handleSave }
}
