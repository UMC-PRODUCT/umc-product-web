/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

import CheckIcon from '@/shared/assets/icons/check.svg?react'
import { theme } from '@/shared/styles/theme'
import type { QuestionMode } from '@/shared/types/form'

interface CheckChoiceProps {
  content: string
  isChecked: boolean
  onToggle: () => void
  mode: QuestionMode
  isOtherOption: boolean
  otherInputValue?: string
  onOtherInputChange?: (text: string) => void
}

export const CheckChoice = ({
  content,
  isChecked,
  onToggle,
  mode,
  isOtherOption,
  otherInputValue,
  onOtherInputChange,
}: CheckChoiceProps) => {
  const isEditable = mode === 'edit'
  const isOtherInputEnabled = isEditable && isOtherOption

  const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditable || !isOtherOption) return
    const text = event.target.value
    onOtherInputChange?.(text)
    if (!isChecked && text.trim().length > 0) {
      onToggle()
    }
  }

  const handleClick = () => {
    if (!isEditable) return
    onToggle()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isEditable) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  if (isOtherOption) {
    return (
      <ChoiceRow>
        <ChoiceContainer
          $isEditable={isEditable}
          onClick={isEditable ? handleClick : undefined}
          onKeyDown={handleKeyDown}
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={!isEditable}
          tabIndex={isEditable ? 0 : -1}
        >
          <VisualCheckbox aria-hidden $isChecked={isChecked}>
            {isChecked && <CheckIcon color="black" />}
          </VisualCheckbox>
          <span
            css={{
              color: theme.colors.gray[400],
              userSelect: 'none',
              ...theme.typography.B3.Rg,
            }}
          >
            기타:
          </span>
        </ChoiceContainer>
        <Input
          isActive={isChecked}
          value={otherInputValue ?? ''}
          aria-label="기타 답변 입력"
          disabled={!isOtherInputEnabled}
          aria-disabled={!isOtherInputEnabled}
          tabIndex={isOtherInputEnabled ? 0 : -1}
          onChange={handleOtherInputChange}
        />
      </ChoiceRow>
    )
  }

  return (
    <ChoiceContainer
      $isEditable={isEditable}
      onClick={isEditable ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={!isEditable}
      tabIndex={isEditable ? 0 : -1}
    >
      <VisualCheckbox aria-hidden $isChecked={isChecked}>
        {isChecked && <CheckIcon color="black" />}
      </VisualCheckbox>
      <span
        css={{
          color: theme.colors.white,
          userSelect: 'none',
          ...theme.typography.B3.Md,
        }}
      >
        {content}
      </span>
    </ChoiceContainer>
  )
}

const ChoiceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

const VisualCheckbox = styled.span<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.25px solid
    ${({ $isChecked }) => ($isChecked ? theme.colors.lime : theme.colors.gray[400])};
  border-radius: 4px;
  background-color: ${({ $isChecked }) => ($isChecked ? theme.colors.lime : 'transparent')};

  svg {
    width: 12px;
    height: 12px;
  }
`

const ChoiceContainer = styled.div<{ $isEditable: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'default')};
  padding: 4px 0;
  outline: none;
  background-color: inherit;
  border: none;
  text-align: left;
  &:focus-visible {
    ${VisualCheckbox} {
      box-shadow: 0 0 0 2px ${theme.colors.lime};
    }
  }
`

const Input = styled.input<{ isActive?: boolean }>`
  background-color: transparent;
  border-bottom: 1px solid
    ${({ isActive }) => (isActive ? theme.colors.lime : theme.colors.gray[500])};
  border-right: none;
  color: ${theme.colors.white};
`
