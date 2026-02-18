import type { InputHTMLAttributes } from 'react'

import type { TypoToken } from '@/shared/types/typo'

import * as S from './LinkInput.style'

type LinkInputProps = {
  label?: string
  labelTypo?: TypoToken
  inputTypo?: TypoToken
  responsiveInputTypo?: Partial<Record<'desktop' | 'tablet' | 'mobile', TypoToken>>
} & InputHTMLAttributes<HTMLInputElement>

const LinkInput = ({
  label,
  id,
  labelTypo,
  inputTypo,
  responsiveInputTypo,
  ...props
}: LinkInputProps) => {
  const resolvedId = id ?? props.name ?? label
  return (
    <S.FieldGroup>
      {label && (
        <S.FieldLabel htmlFor={resolvedId} typo={labelTypo}>
          {label}
        </S.FieldLabel>
      )}
      <S.FieldInput
        id={resolvedId}
        type="text"
        autoComplete="none"
        typo={inputTypo}
        responsiveTypo={responsiveInputTypo}
        {...props}
      />
    </S.FieldGroup>
  )
}

export default LinkInput
