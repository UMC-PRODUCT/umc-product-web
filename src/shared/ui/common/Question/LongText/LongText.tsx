import { forwardRef, useLayoutEffect, useRef } from 'react'
import type { Interpolation, Theme } from '@emotion/react'

import type { QuestionMode } from '@/shared/types/form'

import * as S from './LongText.style'

interface TextQuestionProps {
  value?: string
  onChange?: (newValue: string) => void
  mode: QuestionMode
  placeholder: string
  minHeight?: number
  css?: Interpolation<Theme>
}

export const LongText = forwardRef<HTMLTextAreaElement, TextQuestionProps>(
  ({ value, onChange, mode, placeholder, minHeight, css }, ref) => {
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
        placeholder={placeholder}
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
        css={[{ minHeight: minHeight ?? 'fit-content' }, css]}
      />
    )
  },
)

LongText.displayName = 'LongText'
