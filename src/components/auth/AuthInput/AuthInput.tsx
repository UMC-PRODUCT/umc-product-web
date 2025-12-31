import { forwardRef, useEffect, useId, useState } from 'react'
import * as S from './AuthInput.style'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import type { SvgIconComponent } from '@/types/component'
import Button from '@/components/common/Button/Button'
import Label from '@/components/common/Label/Label'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import { Field } from '@/styles/formStyles'

type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type: 'email' | 'password' | 'text'
  label: string
  Icon?: SvgIconComponent
  error?: {
    error: boolean
    errorMessage: string
  }
  button?: {
    buttonMessage: string
    buttonClick: () => void
    validate: boolean
  }
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, placeholder, label, error, Icon, button, ...inputProps }, ref) => {
    const id = useId()
    const { onChange, value, defaultValue, ...restInputProps } = inputProps
    const [inputValue, setInputValue] = useState(
      typeof value === 'string'
        ? value
        : typeof defaultValue === 'string'
          ? defaultValue
          : '',
    )

    useEffect(() => {
      if (typeof value === 'string') {
        setInputValue(value)
      }
    }, [value])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      setInputValue(event.target.value)
    }

    const trimmedValue = inputValue.trim()
    const isButtonDisabled =
      !!button?.validate || !!error?.error || trimmedValue === ''

    return (
      <Field>
        <S.InputHeader>
          <Label label={label} necessary={true} htmlFor={id} />

          {error?.error && (
            <ErrorMessage errorMessage={error.errorMessage}></ErrorMessage>
          )}
        </S.InputHeader>
        <S.InputWrapper>
          <S.Input
            id={id}
            autoComplete={label}
            name={label}
            onChange={handleChange}
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...restInputProps}
            {...(value !== undefined ? { value } : {})}
          />
          {Icon && (
            <S.IconBox>
              <Icon width={20} height={20} aria-hidden />
            </S.IconBox>
          )}
          {button && (
            <Button
              label={button.buttonMessage}
              variant={button.validate ? 'solid' : 'outline'}
              tone="lime"
              typo="B3.Md"
              rounded={8}
              onClick={button.buttonClick}
              disabled={isButtonDisabled}
              type="button"
            ></Button>
          )}
        </S.InputWrapper>
      </Field>
    )
  },
)
