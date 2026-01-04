import { forwardRef } from 'react'
import { useTheme } from '@emotion/react'

import type { BadgeTone, BadgeVariant } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'
import { resolveTypo } from '@shared/utils/resolveTypo'

import { getTone } from './Badge.style'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone: BadgeTone
  variant: BadgeVariant
  typo: TypoToken
  children: React.ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone, variant, typo, children, className, ...props }, ref) => {
    const theme = useTheme()
    const toneMap = getTone(theme)
    const t = toneMap[tone][variant]
    const textStyle = resolveTypo(theme, typo)

    return (
      <span
        ref={ref}
        className={className}
        css={{
          borderRadius: 20,
          padding: '3px 10px',
          textAlign: 'center',
          width: 'fit-content',
          height: 'fit-content',
          background: t.background,
          color: t.color,
          border: t.border,
          ...textStyle,
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
