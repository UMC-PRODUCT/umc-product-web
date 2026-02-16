import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const latestValueRef = useRef(value)

  useEffect(() => {
    latestValueRef.current = value
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  const flush = useCallback((next?: T) => {
    const target = next ?? latestValueRef.current
    setDebouncedValue(target)
  }, [])

  return { debouncedValue, flush }
}
