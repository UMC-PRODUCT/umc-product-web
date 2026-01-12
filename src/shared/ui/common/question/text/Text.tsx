import { forwardRef } from 'react'

import * as S from './Text.style'

type QuestionMode = 'view' | 'edit'

interface TextQuestionProps {
  value?: string
  onChange?: (newValue: string) => void
  mode: QuestionMode
}

const PLACEHOLDER_TEXT = '내용을 입력해 주세요.'

export const Text = forwardRef<HTMLInputElement, TextQuestionProps>(
  ({ value, onChange, mode }, ref) => {
    const isReadOnly = mode === 'view'

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value)
    }

    return (
      <S.TextArea
        placeholder={PLACEHOLDER_TEXT}
        value={value}
        onChange={handleTextChange}
        ref={ref}
        readOnly={isReadOnly}
        maxLength={50}
      />
    )
  },
)

Text.displayName = 'Text'
