import { forwardRef } from 'react'

import * as S from './Text.style'

interface TextProps {
  value?: any
  onChange?: (value: any) => void
  mode: 'view' | 'edit'
}
export const Text = forwardRef<HTMLTextAreaElement, TextProps>(({ value, onChange, mode }, ref) => {
  return (
    <S.TextArea
      placeholder="자유롭게 작성해주세요."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      ref={ref}
      readOnly={mode === 'view'}
    />
  )
})

Text.displayName = 'Text'
