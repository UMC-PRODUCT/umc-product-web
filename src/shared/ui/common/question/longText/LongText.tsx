import { forwardRef, useLayoutEffect, useRef } from 'react'

import * as S from './LongText.style'

type QuestionMode = 'view' | 'edit'

interface TextQuestionProps {
  value?: string
  onChange?: (newValue: string) => void
  mode: QuestionMode
}

const PLACEHOLDER_TEXT = '자유롭게 작성해주세요.'

export const LongText = forwardRef<HTMLTextAreaElement, TextQuestionProps>(
  ({ value, onChange, mode }, ref) => {
    const isReadOnly = mode === 'view'
    const innerRef = useRef<HTMLTextAreaElement | null>(null)

    useLayoutEffect(() => {
      const element = innerRef.current
      if (!element) return
      element.style.height = 'auto'
      element.style.height = `${element.scrollHeight}px`
    }, [value])

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.value)
    }

    return (
      <S.TextArea
        placeholder={PLACEHOLDER_TEXT}
        value={value}
        onChange={handleTextChange}
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        readOnly={isReadOnly}
      />
    )
  },
)

LongText.displayName = 'LongText'
