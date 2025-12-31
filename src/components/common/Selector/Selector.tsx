import { useEffect, useRef } from 'react'
import * as S from './Selector.style'
import Arrow from '@/assets/icons/Arrow.svg?react'

type Option = { label: string; id: string }

type SelectorProps = {
  placeholder?: string
  options: Option[]
  value?: {
    id: string
    label: string
  }
  onClick: (option: { id: string; label: string }) => void
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  open: boolean
  id?: string
  ariaLabelledby?: string
}
export default function Selector({
  placeholder,
  options,
  value,
  onClick,
  setOpen,
  open,
  id,
  ariaLabelledby,
}: SelectorProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

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

  return (
    <S.SelectWrapper ref={wrapRef}>
      <S.Trigger
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        $open={open}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledby}
      >
        {value?.label.trim() !== '' && value ? (
          <span>{value.label}</span>
        ) : (
          <S.Placeholder>{placeholder}</S.Placeholder>
        )}
        <S.ArrowBox $open={open}>
          <Arrow width={16} height={16} aria-hidden />
        </S.ArrowBox>
      </S.Trigger>
      <S.Options
        $open={open}
        role="listbox"
        aria-labelledby={ariaLabelledby}
        aria-hidden={!open}
      >
        {options.map((option) => (
          <S.OptionItem
            key={option.id}
            onClick={() => {
              onClick(option)
              setOpen(false)
            }}
            $selected={option.id === value?.id}
            role="option"
            aria-selected={option.id === value?.id}
          >
            {option.label}
          </S.OptionItem>
        ))}
      </S.Options>
    </S.SelectWrapper>
  )
}
