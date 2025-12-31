import { forwardRef, useId } from 'react'
import * as S from './LabelTextField.style'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import type { SvgIconComponent } from '@/types/component'
import Button from '@/components/common/Button/Button'
import Label from '@/components/common/Label/Label'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import { Field } from '@/styles/formStyles'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
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
    validation: boolean // 버튼이 언제 validate 되는지 여부 (예시: 이메일 인증 완료시)
  }
  autoComplete: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      type,
      placeholder,
      label,
      error,
      Icon,
      button,
      autoComplete,
      ...inputProps
    },
    ref,
  ) => {
    const id = useId()
    const {
      onChange,
      value,
      defaultValue: _defaultValue,
      ...restInputProps
    } = inputProps

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
    }

    const currentValue = value ?? ''
    const trimmedValue = (
      typeof currentValue === 'string' ? currentValue : ''
    ).trim()
    const isButtonDisabled =
      !!button?.validation || !!error?.error || trimmedValue === '' // 이메일 인증이 완료된 후 disabled 처리

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
            autoComplete={autoComplete}
            name={label}
            onChange={handleChange}
            type={type}
            placeholder={placeholder}
            ref={ref}
            value={currentValue}
            {...restInputProps}
          />
          {Icon && (
            <S.IconBox>
              <Icon width={20} height={20} aria-hidden />
            </S.IconBox>
          )}
          {button && (
            <Button
              label={button.buttonMessage}
              variant={button.validation ? 'solid' : 'outline'}
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
