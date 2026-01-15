import { forwardRef } from 'react'
import { useTheme } from '@emotion/react'

import type { ButtonTone, ButtonVariant, SvgIconComponent } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'
import { resolveTypo } from '@shared/utils/resolveTypo'

import * as S from './Button.style'

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
}

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
      ...restProps
    },
    ref,
  ) => {
    const theme = useTheme()
    const toneStyleMap = S.getTone(theme)

    const borderRadius = rounded
    const currentToneStyle = toneStyleMap[tone][variant]
    const typographyStyle = resolveTypo(theme, typo)

    const handleClick = disabled ? undefined : onClick

    const buttonStyles = [
      S.baseButton(disabled),
      {
        borderRadius,
        background: currentToneStyle.background,
        color: currentToneStyle.color,
        border: currentToneStyle.border,
        flexWrap: 'nowrap' as const,
        whiteSpace: 'nowrap' as const,
        ...typographyStyle,
      },
    ]

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={className}
        css={buttonStyles}
        {...restProps}
      >
        {Icon && <Icon color={iconColor} width={ICON_SIZE} height={ICON_SIZE} aria-hidden />}
        {label}
      </button>
    )
  },
)

Button.displayName = 'Button'
