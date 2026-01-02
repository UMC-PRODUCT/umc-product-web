import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

export type Option = { label: string; id: string | number }

type Params = {
  options: Array<Option>
  value?: Option
  open: boolean
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  onSelect: (option: Option) => void
}

export function useSelectorInteractions({
  options,
  value,
  open,
  setOpen,
  onSelect,
}: Params) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLLIElement | null>>([])
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, setOpen])

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus()
      return
    }

    if (options.length === 0) return

    const selectedIndex = options.findIndex((option) => option.id === value?.id)
    const initialIndex =
      focusedIndex >= 0 && focusedIndex < options.length
        ? focusedIndex
        : selectedIndex !== -1
          ? selectedIndex
          : 0

    if (initialIndex !== focusedIndex) {
      setFocusedIndex(initialIndex)
      return
    }

    optionRefs.current[initialIndex]?.focus()
  }, [focusedIndex, open, options, value])

  const handleOptionSelect = (option: Option) => {
    onSelect(option)
    setOpen(false)
  }

  const moveFocus = (delta: number) => {
    setFocusedIndex((prevIndex) => {
      if (options.length === 0) return prevIndex
      const safeCurrent = prevIndex >= 0 ? prevIndex : 0
      const nextIndex = Math.min(
        Math.max(safeCurrent + delta, 0),
        options.length - 1,
      )
      return nextIndex
    })
  }

  const openWithFocus = (index: number) => {
    if (options.length === 0) {
      setOpen(true)
      return
    }
    const boundedIndex = Math.min(Math.max(index, 0), options.length - 1)
    setFocusedIndex(boundedIndex)
    setOpen(true)
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen((prev) => {
        const next = !prev
        if (next) {
          const selectedIndex = options.findIndex(
            (option) => option.id === value?.id,
          )
          setFocusedIndex(
            selectedIndex !== -1 ? selectedIndex : options.length > 0 ? 0 : -1,
          )
        }
        return next
      })
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openWithFocus(0)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      openWithFocus(options.length - 1)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleOptionsKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!open) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveFocus(1)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(-1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (focusedIndex >= 0 && options[focusedIndex]) {
        handleOptionSelect(options[focusedIndex])
      }
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return {
    wrapRef,
    triggerRef,
    optionRefs,
    focusedIndex,
    handleOptionSelect,
    handleTriggerKeyDown,
    handleOptionsKeyDown,
  }
}
