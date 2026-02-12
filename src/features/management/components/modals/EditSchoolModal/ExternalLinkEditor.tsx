import { useEffect, useRef, useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import Plus from '@/shared/assets/icons/plus.svg?react'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

import { LINK_TYPE_OPTIONS } from '../../../domain/schoolConstants'
import * as S from './EditSchoolModal.style'
import * as ES from './ExternalLinkEditor.style'

type ExternalLinkEditorProps = {
  isOpen: boolean
  mode: 'add' | 'edit'
  linkTitleValue: string
  linkUrlValue: string
  linkType: Option<string> | null
  onToggleOpen?: () => void
  onLinkTypeChange: (option: Option<string> | null) => void
  onSubmit: () => void
  onCancel: () => void
  linkTitleField: UseFormRegisterReturn
  linkUrlField: UseFormRegisterReturn
}

const ExternalLinkEditor = ({
  isOpen,
  mode,
  linkTitleValue,
  linkUrlValue,
  linkType,
  onToggleOpen,
  onLinkTypeChange,
  onSubmit,
  onCancel,
  linkTitleField,
  linkUrlField,
}: ExternalLinkEditorProps) => {
  const isAddMode = mode === 'add'
  const isDisabled = !linkTitleValue.trim() || !linkUrlValue.trim() || (isAddMode && !linkType)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isDropdownOpen])

  const selectedLabel =
    LINK_TYPE_OPTIONS.find((option) => option.id === linkType?.id)?.label ?? 'Type'
  if (!isOpen && isAddMode) {
    return (
      <S.AddLink onClick={onToggleOpen}>
        <span>
          <Plus color="currentColor" width={20} height={20} />
        </span>
        링크 추가
      </S.AddLink>
    )
  }

  return (
    <Flex flexDirection="column" gap={8}>
      <Flex gap={8}>
        <ES.FieldGroup>
          <ES.FieldLabel htmlFor="edit-link-title">링크 제목</ES.FieldLabel>
          <ES.FieldInput
            id="edit-link-title"
            type="text"
            placeholder="링크의 제목을 입력하세요."
            autoComplete="none"
            {...linkTitleField}
          />
        </ES.FieldGroup>
        {isAddMode ? (
          <ES.DropdownField ref={dropdownRef}>
            <ES.DropdownButton
              type="button"
              aria-label="링크 타입 선택"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {selectedLabel}
              <ES.DropdownArrow data-open={isDropdownOpen || undefined}>
                <Arrow width={12} height={12} aria-hidden />
              </ES.DropdownArrow>
            </ES.DropdownButton>
            {isDropdownOpen && (
              <ES.DropdownMenu role="listbox">
                {LINK_TYPE_OPTIONS.map((option) => {
                  const isSelected = option.id === linkType?.id
                  return (
                    <ES.DropdownItem
                      key={option.id}
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected || undefined}
                      onClick={() => {
                        onLinkTypeChange(option)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {option.label}
                    </ES.DropdownItem>
                  )
                })}
              </ES.DropdownMenu>
            )}
          </ES.DropdownField>
        ) : null}
      </Flex>
      <ES.FieldGroup>
        <ES.FieldLabel htmlFor="edit-link-url">URL</ES.FieldLabel>
        <ES.FieldInput
          id="edit-link-url"
          type="text"
          placeholder="URL 주소를 입력하세요."
          autoComplete="none"
          {...linkUrlField}
        />
      </ES.FieldGroup>
      <Flex gap={8} justifyContent="flex-end" css={{ marginTop: '8px' }}>
        <Button
          tone="gray"
          typo="C5.Md"
          label="닫기"
          css={{ height: '25px', width: '65px' }}
          onClick={onCancel}
        />
        <Button
          tone="lime"
          typo="C5.Md"
          label={isAddMode ? '링크 등록' : '링크 수정'}
          css={{ height: '25px', width: '65px' }}
          disabled={isDisabled}
          onClick={onSubmit}
        />
      </Flex>
    </Flex>
  )
}

export default ExternalLinkEditor
