import type { Interpolation, Theme } from '@emotion/react'

import { Field } from '@/shared/styles/formStyles'

import ErrorMessage from '../../common/ErrorMessage/ErrorMessage'
import Label from '../../common/Label'
import { LongText } from '../../common/Question/LongText/LongText'
import * as S from './LabelLongTextField.style'

const LabelLongTextField = ({
  label,
  id,
  placeholder,
  error,
  value,
  onChange,
  necessary,
  css,
}: {
  label: string
  id?: string
  placeholder: string
  value?: string
  onChange?: (newValue: string) => void
  error?: {
    error: boolean
    errorMessage: string
  }
  necessary?: boolean
  css?: Interpolation<Theme>
}) => {
  return (
    <Field>
      <S.InputHeader>
        <Label label={label} necessary={necessary} htmlFor={id} />
        {error?.error && (
          <ErrorMessage
            typo="B4.Md"
            responsiveTypo={{ tablet: 'B4.Md' }}
            errorMessage={error.errorMessage}
          />
        )}
      </S.InputHeader>

      <LongText
        placeholder={placeholder}
        mode="edit"
        minHeight={64}
        value={value}
        onChange={onChange}
        css={css}
      />
    </Field>
  )
}

export default LabelLongTextField
