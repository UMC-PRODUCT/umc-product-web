import { useEffect, useRef, useState } from 'react'
import Arrow from '@/assets/icons/Arrow.svg?react'
import { Field } from '@/styles/formStyles'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import Label from '@/components/common/Label/Label'
import * as S from './AuthSelection.style'

type Option = { label: string; id: string }

type AuthSelectionProps = {
  label: string
  placeholder?: string
  options: Option[]
  value?: {
    id: string
    label: string
  }
  onClick: React.Dispatch<React.SetStateAction<{ id: string; label: string }>>
  error?: boolean
  errorMessage?: string
}

export default function AuthSelection({
  label,
  placeholder,
  options,
  value,
  error,
  errorMessage,
  onClick,
}: AuthSelectionProps) {
  const [open, setOpen] = useState(false)
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
  }, [open])

  return (
    <Field ref={wrapRef}>
      <S.SelectHeader>
        <Label label={label} necessary={true}></Label>
        {error && errorMessage && (
          <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
        )}
      </S.SelectHeader>
      <S.SelectWrapper>
        <S.Trigger
          type="button"
          onClick={() => setOpen((v) => !v)}
          $open={open}
          aria-expanded={open}
          aria-haspopup="listbox"
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
        <S.Options $open={open} role="listbox">
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
    </Field>
  )
}
