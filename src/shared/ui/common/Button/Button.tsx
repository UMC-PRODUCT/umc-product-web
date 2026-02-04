import { forwardRef } from 'react'

import type { ButtonTone, ButtonVariant, SvgIconComponent } from '@/shared/types/component'
import type { TypoToken } from '@/shared/types/typo'
import Loading from '@/shared/ui/common/Loading/Loading'

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
  iconColor?: string
  isLoading?: boolean
  iconSize?: number
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
      iconSize = ICON_SIZE,
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
        {Icon && <Icon color={iconColor} width={iconSize} height={ICON_SIZE} aria-hidden />}
        {isLoading ? (
          <Loading
            size={16}
            borderWidth={2}
            spinnerColor="currentColor"
            borderColor="rgba(255, 255, 255, 0.45)"
            gap={0}
            aria-hidden="true"
          />
        ) : (
          label
        )}
      </StyledButton>
    )
  },
)

Button.displayName = 'Button'
