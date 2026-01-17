import { forwardRef } from 'react'

import type { ButtonTone, ButtonVariant, SvgIconComponent } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'

import { StyledButton } from './Button.style'

const DEFAULT_BORDER_RADIUS = 6
const DEFAULT_TYPOGRAPHY: TypoToken = 'B3.Md'
const ICON_SIZE = 20

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string
  tone: ButtonTone
  variant?: ButtonVariant
  rounded?: number
  typo?: TypoToken
  Icon?: SvgIconComponent
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
      ...restProps
    },
    ref,
  ) => {
    const handleClick = disabled ? undefined : onClick

    return (
      <StyledButton
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={className}
        $tone={tone}
        $variant={variant}
        $disabled={disabled}
        $rounded={rounded}
        $typo={typo}
        {...restProps}
      >
        {Icon && <Icon width={ICON_SIZE} height={ICON_SIZE} aria-hidden />}
        {label}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'
