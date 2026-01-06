import { forwardRef } from 'react'

import * as S from './Text.style'

interface TextProps {
  value?: any
  onChange?: (value: any) => void
}
export const Text = forwardRef<HTMLTextAreaElement, TextProps>(({ value, onChange }, ref) => {
  return (
    <S.TextArea
      placeholder="자유롭게 작성해주세요."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      ref={ref}
    />
  )
})

Text.displayName = 'Text'
