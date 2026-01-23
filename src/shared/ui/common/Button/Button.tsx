import { forwardRef } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import type { ButtonTone, ButtonVariant, SvgIconComponent } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'

import { StyledButton } from './Button.style'

const DEFAULT_BORDER_RADIUS = 6
const DEFAULT_TYPOGRAPHY: TypoToken = 'B3.Md'
const ICON_SIZE = 20
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-flex;
`

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string
  tone: ButtonTone
  variant?: ButtonVariant
  rounded?: number
  typo?: TypoToken
  Icon?: SvgIconComponent
  iconColor?: string
  isLoading?: boolean
}

/**
 * 공용 버튼 컴포넌트
 * Styled Components + Transient props 패턴 사용
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      type = 'button',
      onClick,
      tone,
      variant = 'solid',
      rounded = DEFAULT_BORDER_RADIUS,
      disabled = false,
      typo = DEFAULT_TYPOGRAPHY,
      Icon,
      className,
      iconColor,
      isLoading = false,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading
    const handleClick = isDisabled ? undefined : onClick

    return (
      <StyledButton
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
        $tone={tone}
        $variant={variant}
        $disabled={disabled}
        $rounded={rounded}
        $typo={typo}
        {...restProps}
      >
        {Icon && <Icon color={iconColor} width={ICON_SIZE} height={ICON_SIZE} aria-hidden />}
        {isLoading ? <Spinner /> : label}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'
