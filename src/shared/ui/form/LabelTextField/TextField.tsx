import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { forwardRef, useState } from 'react'
import type { Interpolation, Theme } from '@emotion/react'

import type { SvgIconComponent } from '@shared/types/component'
import { Button } from '@shared/ui/common/Button/Button'

import * as S from './LabelTextField.style'

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type: 'email' | 'password' | 'text'
  Icon?: SvgIconComponent
  error?: {
    error: boolean
    errorMessage: string
  }
  button?: {
    buttonMessage: string
    buttonClick: () => void
    validation: boolean // 버튼이 언제 validate 되는지 여부 (예시: 이메일 인증 완료시)
    isLoading?: boolean
  }
  autoComplete: string
  css?: Interpolation<Theme>
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { type, placeholder, error, Icon, button, autoComplete, css: wrapperCss, ...inputProps },
    ref,
  ) => {
    const { onChange, value, ...restInputProps } = inputProps
    const [internalValue, setInternalValue] = useState(
      typeof restInputProps.defaultValue === 'string' ? restInputProps.defaultValue : '',
    )
    const isControlled = value !== undefined

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value)
      }
      onChange?.(event)
    }

    const currentValue = isControlled ? value : internalValue
    const trimmedValue = (typeof currentValue === 'string' ? currentValue : '').trim()
    const isButtonLoading = button?.isLoading ?? false
    const isButtonDisabled = isButtonLoading || !!error?.error || trimmedValue === ''

    const controlledProps = value !== undefined ? { value } : undefined

    return (
      <S.InputWrapper css={wrapperCss}>
        <S.Input
          autoComplete={autoComplete}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...restInputProps}
          {...controlledProps}
        />
        {Icon && (
          <S.IconBox>
            <Icon width={24} height={24} aria-hidden />
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
            isLoading={isButtonLoading}
            type="button"
          ></Button>
        )}
      </S.InputWrapper>
    )
  },
)

TextField.displayName = 'TextField'
