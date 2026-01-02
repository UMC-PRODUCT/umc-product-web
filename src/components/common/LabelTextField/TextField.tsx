import { forwardRef } from 'react'
import * as S from './LabelTextField.style'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import type { Interpolation, Theme } from '@emotion/react'
import type { SvgIconComponent } from '@/types/component'
import Button from '@/components/common/Button/Button'

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
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
  }
  autoComplete: string
  css?: Interpolation<Theme>
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      type,
      placeholder,
      error,
      Icon,
      button,
      autoComplete,
      css: wrapperCss,
      ...inputProps
    },
    ref,
  ) => {
    const { onChange, value, ...restInputProps } = inputProps

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
    }

    const trimmedValue = (typeof value === 'string' ? value : '').trim()
    const isButtonDisabled =
      !!button?.validation || !!error?.error || trimmedValue === '' // 이메일 인증이 완료된 후 disabled 처리

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
            type="button"
          ></Button>
        )}
      </S.InputWrapper>
    )
  },
)
