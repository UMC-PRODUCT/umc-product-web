import { forwardRef, useId } from 'react'
import * as S from './LabelTextField.style'
import { TextField } from './TextField'
import type { TextFieldProps } from './TextField'
import Label from '@/components/common/Label/Label'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import { Field } from '@/styles/formStyles'

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
