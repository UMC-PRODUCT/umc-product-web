import { useCallback, useEffect, useState } from 'react'
import type { FieldValues } from 'react-hook-form'

import type { UseAutoSaveOptions, UseAutoSaveReturn } from '@/shared/types/autoSave'

// 기본 자동 저장 주기(1분).
const DEFAULT_AUTO_SAVE_INTERVAL_MS = 60_000

// 저장 시간을 표시용 문자열로 변환.
function formatDateTimeKorean(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
}

export function useAutoSave<TFormValues extends FieldValues>({
  getValues,
  interval = DEFAULT_AUTO_SAVE_INTERVAL_MS,
  onSave,
}: UseAutoSaveOptions<TFormValues>): UseAutoSaveReturn {
  const [lastSavedTime, setLastSavedTime] = useState<string>('')

  // 현재 폼 값을 저장(실제 저장 로직은 추후 교체).
  const handleSave = useCallback(() => {
    const formValues = getValues()
    console.log('[AutoSave] 저장 데이터:', formValues)
    onSave?.(formValues)

    const currentDateTime = new Date()
    const formattedDateTime = formatDateTimeKorean(currentDateTime)

    setLastSavedTime(formattedDateTime)
    console.log(`[AutoSave] ${formattedDateTime} 저장 완료`)
  }, [getValues, onSave])

  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      handleSave()
    }, interval)

    return () => clearInterval(autoSaveTimer)
  }, [handleSave, interval])

  return { lastSavedTime, handleSave }
}
