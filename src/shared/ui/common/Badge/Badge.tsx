import { forwardRef } from 'react'

import type { BadgeTone, BadgeVariant } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'

import { StyledBadge } from './Badge.style'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone: BadgeTone
  variant: BadgeVariant
  typo: TypoToken
  children: React.ReactNode
}

/**
 * 공용 뱃지 컴포넌트
 * Styled Components + Transient props 패턴 사용
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone, variant, typo, children, className, ...props }, ref) => {
    return (
      <StyledBadge
        ref={ref}
        className={className}
        $tone={tone}
        $variant={variant}
        $typo={typo}
        {...props}
      >
        {children}
      </StyledBadge>
    )
  },
)

Badge.displayName = 'Badge'
