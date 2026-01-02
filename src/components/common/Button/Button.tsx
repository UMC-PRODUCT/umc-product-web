import { useTheme } from '@emotion/react'
import * as S from './Button.style'
import type { SvgIconComponent } from '@/types/component'
import type { TypoToken } from '@/types/typo'
import { resolveTypo } from '@/utils/resolveTypo'

type ButtonVariant = 'solid' | 'outline'
type ButtonTone =
  | 'white'
  | 'lime'
  | 'kakao'
  | 'gray'
  | 'darkGray'
  | 'necessary'
  | 'caution'

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
  const toneMap = S.getTone(theme)

  const radius = rounded
  const t = toneMap[tone][variant]

  const textStyle = resolveTypo(theme, typo)

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
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
    >
      {Icon && <Icon width={20} height={20} aria-hidden />}
      {label}
    </button>
  )
}
