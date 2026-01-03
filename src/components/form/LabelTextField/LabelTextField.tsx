import { forwardRef, useId } from 'react'

import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import Label from '@/components/common/Label/Label'
import { Field } from '@/styles/formStyles'

import * as S from './LabelTextField.style'
import type { TextFieldProps } from './TextField'
import { TextField } from './TextField'

type LabelTextFieldProps = TextFieldProps & {
  label: string
  necessary?: boolean
}

export const LabelTextField = forwardRef<HTMLInputElement, LabelTextFieldProps>(
  (
    {
      type,
      placeholder,
      label,
      error,
      Icon,
      button,
      autoComplete,
      necessary = true,
      ...inputProps
    },
    ref,
  ) => {
    const id = useId()

    return (
      <Field>
        <S.InputHeader>
          <Label label={label} necessary={necessary} htmlFor={id} />

          {error?.error && (
            <ErrorMessage errorMessage={error.errorMessage}></ErrorMessage>
          )}
        </S.InputHeader>
        <TextField
          id={id}
          type={type}
          placeholder={placeholder}
          error={error}
          Icon={Icon}
          button={button}
          autoComplete={autoComplete}
          name={inputProps.name ?? label}
          ref={ref}
          {...inputProps}
        />
      </Field>
    )
  },
)

LabelTextField.displayName = 'LabelTextField'
