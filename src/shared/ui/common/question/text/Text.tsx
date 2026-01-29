import { forwardRef } from 'react'

import type { QuestionMode } from '@/shared/types/form'

import * as S from './Text.style'

interface TextQuestionProps {
  value?: string
  onChange?: (newValue: string) => void
  mode: QuestionMode
  placeholder?: string
  disabled?: boolean
}

const DEFAULT_PLACEHOLDER = '내용을 입력해 주세요.'

export const Text = forwardRef<HTMLInputElement, TextQuestionProps>(
  ({ value, onChange, mode, placeholder = DEFAULT_PLACEHOLDER, disabled = false }, ref) => {
    const isReadOnly = mode === 'view' || disabled

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value)
    }

    return (
      <S.TextArea
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        ref={ref}
        readOnly={isReadOnly}
        disabled={disabled}
        maxLength={50}
      />
    )
  },
)

Text.displayName = 'Text'
