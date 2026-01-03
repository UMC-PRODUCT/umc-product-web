import { useTheme } from '@emotion/react'
import { forwardRef } from 'react'

import type { ButtonTone, ButtonVariant, SvgIconComponent } from '@/types/component'
import type { TypoToken } from '@/types/typo'
import { resolveTypo } from '@/utils/resolveTypo'

import * as S from './Button.style'

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label?: string
  tone: ButtonTone
  variant?: ButtonVariant
  rounded?: number
  typo?: TypoToken
  Icon?: SvgIconComponent
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      type = 'button',
      onClick,
      tone,
      variant = 'solid',
      rounded = 6,
      disabled = false,
      typo = 'B3.Md',
      Icon,
      className,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()
    const toneMap = S.getTone(theme)

    const radius = rounded
    const t = toneMap[tone][variant]

    const textStyle = resolveTypo(theme, typo)

    return (
      <button
        ref={ref}
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        css={[
          S.baseButton(disabled),
          {
            borderRadius: radius,
            background: t.background,
            color: t.color,
            border: t.border,
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            ...textStyle,
          },
        ]}
        {...props}
      >
        {Icon && <Icon width={20} height={20} aria-hidden />}
        {label}
      </button>
    )
  },
)

Button.displayName = 'Button'
