import Button from '../common/Button'
import type { SvgIconComponent } from '@/types/component'
import Label from '../common/Label'
import ErrorMessage from './ErrorMessage'
import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import { Field, inputShell } from './formStyles'

type InputProps = {
  type: 'email' | 'password' | 'text'
  placeholder?: string
  label: string
  error?: boolean
  value?: string
  Icon?: SvgIconComponent
  errorMessage?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
  max-height: 50px;
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
export default function AuthInput({
  type,
  placeholder,
  label,
  error,
  value,
  onChange,
  Icon,
  errorMessage,
  button,
}: InputProps) {
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
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
            disabled={button.validate}
          ></Button>
        )}
      </InputWrapper>
    </Field>
  )
}
