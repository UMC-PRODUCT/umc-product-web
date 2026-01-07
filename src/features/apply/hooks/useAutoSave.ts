import { useCallback, useEffect, useState } from 'react'
import type { UseFormGetValues } from 'react-hook-form'

interface UseAutoSaveProps {
  getValues: UseFormGetValues<any>
  interval?: number
}

export const useAutoSave = ({ getValues, interval = 60000 }: UseAutoSaveProps) => {
  const [lastSavedTime, setLastSavedTime] = useState<string>('')

  const handleSave = useCallback(() => {
    const currentValues = getValues()
    console.log('[AutoSave] 저장 데이터:', currentValues)

    const now = new Date()

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    const formattedTime = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${hours}:${minutes}`

    setLastSavedTime(formattedTime)
    console.log(`[AutoSave] ${formattedTime} 저장 완료`)
  }, [getValues])

  useEffect(() => {
    const timer = setInterval(() => {
      handleSave()
    }, interval)

    return () => clearInterval(timer)
  }, [handleSave, interval])

  return { lastSavedTime, handleSave }
}
