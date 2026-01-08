/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Checkbox } from '@/shared/ui/common/Checkbox'
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

interface CheckChoiceProps {
  content: string
  isChecked: boolean
  onToggle: () => void
  mode: 'view' | 'edit'
}

export const CheckChoice = ({ content, isChecked, onToggle, mode }: CheckChoiceProps) => {
  const isEditable = mode === 'edit'

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
        <Checkbox checked={isChecked} onCheckedChange={() => {}} tabIndex={-1} />
      </div>
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
