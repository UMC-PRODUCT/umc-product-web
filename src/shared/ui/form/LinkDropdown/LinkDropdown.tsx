import { useEffect, useRef, useState } from 'react'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import type { Option } from '@/shared/types/form'

import * as S from './LinkDropdown.style'

type LinkDropdownProps = {
  options: Array<Option<string>>
  value: Option<string> | null
  placeholder?: string
  onChange: (option: Option<string> | null) => void
}

const LinkDropdown = ({ options, value, placeholder = 'Type', onChange }: LinkDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  const selectedLabel = options.find((option) => option.id === value?.id)?.label ?? placeholder

  return (
    <S.DropdownField ref={dropdownRef}>
      <S.DropdownButton
        type="button"
        aria-label="링크 타입 선택"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
        <S.DropdownArrow data-open={isOpen || undefined}>
          <Arrow width={12} height={12} aria-hidden />
        </S.DropdownArrow>
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownMenu role="listbox">
          {options.map((option) => {
            const isSelected = option.id === value?.id
            return (
              <S.DropdownItem
                key={option.id}
                role="option"
                aria-selected={isSelected}
                data-selected={isSelected || undefined}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </S.DropdownItem>
            )
          })}
        </S.DropdownMenu>
      )}
    </S.DropdownField>
  )
}

export default LinkDropdown
