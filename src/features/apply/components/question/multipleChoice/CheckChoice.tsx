/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'
import { Checkbox } from '@/shared/ui/common/Checkbox'
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

interface CheckChoiceProps {
  content: string
  isChecked: boolean
  onToggle: () => void
}

export const CheckChoice = ({ content, isChecked, onToggle }: CheckChoiceProps) => {
  const handleClick = () => {
    onToggle()
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onToggle()
    }
  }
  return (
    <div
      css={containerStyle}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
    </div>
  )
}
const containerStyle = css`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
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
