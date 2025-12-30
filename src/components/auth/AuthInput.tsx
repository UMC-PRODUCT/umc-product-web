import Button from '../common/Button'
import type { SvgIconComponent } from '@/types/component'
import Label from '../common/Label'
import ErrorMessage from './ErrorMessage'
import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import { Field, inputShell } from './formStyles'
import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react'

type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type: 'email' | 'password' | 'text'
  label: string
  Icon?: SvgIconComponent
  error?: boolean
  errorMessage?: string
  button?: {
    buttonMesssage: string
    buttonClick: () => void
    validate: boolean
  }
}

const Input = styled.input`
  ${inputShell};
  padding: 10px 44px 10px 20px;
  ::placeholder {
    color: ${theme.colors.gray[400]};
  }
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;
  height: 50px;
`

const IconBox = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[300]};
`
const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      type,
      placeholder,
      label,
      error,
      Icon,
      errorMessage,
      button,
      ...inputProps
    },
    ref,
  ) => {
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
      !!button?.validate || !!error || trimmedValue === ''

    return (
      <Field>
        <InputHeader>
          <Label label={label} necessary={true}></Label>
          {error && errorMessage && (
            <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
          )}
        </InputHeader>
        <InputWrapper>
          <Input
            onChange={handleChange}
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...restInputProps}
            {...(value !== undefined ? { value } : {})}
          />
          {Icon && (
            <IconBox>
              <Icon width={20} height={20} aria-hidden />
            </IconBox>
          )}
          {button && (
            <Button
              label={button.buttonMesssage}
              variant={button.validate ? 'solid' : 'outline'}
              tone="lime"
              typo="B3.Md"
              rounded={8}
              onClick={button.buttonClick}
              disabled={isButtonDisabled}
              type="button"
            ></Button>
          )}
        </InputWrapper>
      </Field>
    )
  },
)
