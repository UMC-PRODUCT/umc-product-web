import type { InputHTMLAttributes } from 'react'

import type { TypoToken } from '@/shared/types/typo'

import * as S from './LinkInput.style'

type LinkInputProps = {
  label?: string
  labelTypo?: TypoToken
  inputTypo?: TypoToken
} & InputHTMLAttributes<HTMLInputElement>

const LinkInput = ({ label, id, labelTypo, inputTypo, ...props }: LinkInputProps) => {
  const resolvedId = id ?? props.name ?? label
  return (
    <S.FieldGroup>
      {label && (
        <S.FieldLabel htmlFor={resolvedId} typo={labelTypo}>
          {label}
        </S.FieldLabel>
      )}
      <S.FieldInput id={resolvedId} type="text" autoComplete="none" typo={inputTypo} {...props} />
    </S.FieldGroup>
  )
}

export default LinkInput
