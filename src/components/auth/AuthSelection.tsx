import styled from '@emotion/styled'
import { theme } from '@/styles/theme'

import Arrow from '@/assets/icons/Arrow.svg?react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Field, inputShell } from './formStyles'
import ErrorMessage from './ErrorMessage'
import Label from '../common/Label'
type Option = { label: string; value: string }

type AuthSelectionProps = {
  label: string
  placeholder?: string
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void
  error?: boolean
  errorMessage?: string
}

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Trigger = styled.button<{ $open: boolean }>`
  ${inputShell};
  padding: 12px 16px 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transform: translateY(${({ $open }) => ($open ? '1px' : '0')});
`

const Placeholder = styled.span`
  color: ${theme.colors.gray[400]};
`

const ArrowBox = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 180ms ease;
  pointer-events: none;
`

const Options = styled.ul<{ $open: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  margin: 0;
  padding: 8px;
  list-style: none;
  background: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  max-height: 220px;
  overflow-y: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '4px')});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 150ms ease,
    transform 150ms ease;
  z-index: 20;
`

const OptionItem = styled.li<{ $selected: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ $selected }) =>
    $selected ? theme.colors.black : theme.colors.white};
  background: ${({ $selected }) =>
    $selected ? theme.colors.lime : 'transparent'};
  transition:
    background 120ms ease,
    color 120ms ease;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? theme.colors.lime : theme.colors.gray[700]};
  }
`

const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export default function AuthSelection({
  label,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
}: AuthSelectionProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value],
  )

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

  const handleSelect = (v: string) => {
    onChange?.(v)
    setOpen(false)
  }

  return (
    <Field ref={wrapRef}>
      <SelectHeader>
        <Label label={label} necessary={true}></Label>
        {error && errorMessage && (
          <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
        )}
      </SelectHeader>
      <SelectWrapper>
        <Trigger
          type="button"
          onClick={() => setOpen((v) => !v)}
          $open={open}
          aria-expanded={open}
          aria-haspopup="listbox"
          onBlur={(e) => {
            setOpen(false)
            onBlur?.(e)
          }}
        >
          {selectedLabel ? (
            <span>{selectedLabel}</span>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
          <ArrowBox $open={open}>
            <Arrow width={16} height={16} aria-hidden />
          </ArrowBox>
        </Trigger>
        <Options $open={open} role="listbox">
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $selected={option.value === value}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </OptionItem>
          ))}
        </Options>
      </SelectWrapper>
    </Field>
  )
}
