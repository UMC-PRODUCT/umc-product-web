import type { TypoToken, TypoGroup } from '@/types/typo'
import { css, useTheme, type Theme } from '@emotion/react'
import type { ComponentProps, ComponentType } from 'react'

type SvgIconComponent = ComponentType<
  ComponentProps<'svg'> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>

type ButtonVariant = 'solid' | 'outline'
type ButtonTone = 'white' | 'lime' | 'kakao' | 'gray'

type ButtonProps = {
  label?: string
  type?: 'button' | 'submit'
  onClick: () => void
  disabled?: boolean
  rounded?: number
  typo?: TypoToken
  variant?: ButtonVariant
  Icon?: SvgIconComponent
  tone: ButtonTone
}

const getTone = (theme: Theme) =>
  ({
    gray: {
      solid: {
        background: theme.colors.gray[300],
        color: theme.colors.gray[700],
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.gray[700],
        border: `1px solid ${theme.colors.gray[700]}`,
      },
    },
    white: {
      solid: {
        background: theme.colors.white,
        color: theme.colors.gray[700],

        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.white,
        border: `1px solid ${theme.colors.white}`,
      },
    },
    lime: {
      solid: {
        background: theme.colors.lime,
        color: theme.colors.black,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.lime,
        border: `1px solid ${theme.colors.lime}`,
      },
    },
    kakao: {
      solid: {
        background: theme.colors.kakao,
        color: theme.colors.black,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.kakao,
        border: `1px solid ${theme.colors.kakao}`,
      },
    },
  }) as const

const baseButton = (disabled: boolean) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    outline: 0,
    gap: 8,
    padding: '12px 16px',
  })

const resolveTypo = (theme: Theme, token?: TypoToken) => {
  if (!token) return undefined
  const [group, variant] = token.split('.')
  if (!group || !variant) return undefined
  const groupKey = group as TypoGroup
  const variantKey = variant as keyof Theme['typography'][TypoGroup]
  return theme.typography[groupKey]?.[variantKey]
}

export default function Button({
  label,
  type = 'button',
  onClick,
  tone,
  variant = 'solid',
  rounded = 6,
  disabled = false,
  typo = 'B3.Md',
  Icon,
}: ButtonProps) {
  const theme = useTheme()
  const toneMap = getTone(theme)

  const radius = rounded
  const t = toneMap[tone][variant]

  const textStyle = resolveTypo(theme, typo)

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      css={[
        baseButton(disabled),
        {
          borderRadius: radius,
          background: t.background,
          color: t.color,
          border: t.border,
          ...(textStyle ?? {}),
        },
      ]}
    >
      {Icon && <Icon width={20} height={20} aria-hidden />}
      {label}
    </button>
  )
}
