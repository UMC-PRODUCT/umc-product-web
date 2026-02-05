import { forwardRef, useId } from 'react'

import { Field } from '@/shared/styles/formStyles'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import Label from '@/shared/ui/common/Label/Label'

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
      className,
      ...inputProps
    },
    ref,
  ) => {
    const id = useId()

    return (
      <Field className={className}>
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
