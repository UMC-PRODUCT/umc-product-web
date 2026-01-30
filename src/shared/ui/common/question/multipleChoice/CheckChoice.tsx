/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import type { QuestionMode } from '@/shared/types/form'
import { Checkbox } from '@/shared/ui/common/Checkbox'
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isEditable) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onToggle()
    }
  }
  return (
    <ChoiceContainer
      $isEditable={isEditable}
      onClick={isEditable ? handleClick : undefined}
      role={isEditable ? 'checkbox' : undefined}
      tabIndex={isEditable ? 0 : -1}
      onKeyDown={isEditable ? handleKeyDown : undefined}
      aria-disabled={!isEditable}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        css={{ pointerEvents: 'none', display: 'flex', alignItems: 'center' }}
      >
        <Checkbox
          css={{ border: `1.25px solid ${theme.colors.gray[400]}` }}
          checked={isChecked}
          onCheckedChange={() => {}}
          tabIndex={-1}
        />
      </div>
      {!isOtherOption && (
        <span
          css={{
            color: theme.colors.white,
            userSelect: 'none',
            ...theme.typography.B3.Md,
          }}
        >
          {content}
        </span>
      )}
      {isOtherOption && (
        <span
          css={{
            color: theme.colors.gray[400],
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            ...theme.typography.B3.Rg,
          }}
        >
          기타:
          <Input
            isActive={isChecked}
            value={otherInputValue ?? ''}
            disabled={!isOtherInputEnabled}
            aria-disabled={!isOtherInputEnabled}
            tabIndex={isOtherInputEnabled ? 0 : -1}
            onChange={handleOtherInputChange}
          />
        </span>
      )}
    </ChoiceContainer>
  )
}

const ChoiceContainer = styled.div<{ $isEditable: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'default')};
  padding: 4px 0;
  outline: none;
  width: 100%;
  background-color: inherit;
  border: none;
  &:focus-visible {
    button {
      box-shadow: 0 0 0 2px ${theme.colors.lime};
      border-radius: 4px;
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
