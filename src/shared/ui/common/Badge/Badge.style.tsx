import styled from '@emotion/styled'

import { theme } from '@shared/styles/theme'
import type { BadgeTone, BadgeVariant } from '@shared/types/component'
import type { TypoToken } from '@shared/types/typo'

/**
 * Tone별 스타일 정의
 * solid: 배경색 채움
 * outline: 테두리만 표시
 */
const toneStyles = {
  darkGray: {
    solid: {
      background: theme.colors.gray[700],
      color: theme.colors.gray[300],
      border: 'none',
    },
    outline: {
      background: theme.colors.gray[700],
      color: theme.colors.gray[300],
      border: `1px solid ${theme.colors.gray[600]}`,
    },
  },
  gray: {
    solid: {
      background: theme.colors.gray[300],
      color: theme.colors.black,
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.gray[400],
      border: `1px solid ${theme.colors.gray[400]}`,
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
  white: {
    solid: {
      background: theme.colors.white,
      color: theme.colors.black,
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.white,
      border: `1px solid ${theme.colors.white}`,
    },
  },
  necessary: {
    solid: {
      background: theme.colors.necessary,
      color: theme.colors.black,
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.necessary,
      border: `1px solid ${theme.colors.necessary}`,
    },
  },
} as const

/**
 * Typography 토큰을 CSS 스타일로 변환
 */
const resolveTypography = (token: TypoToken) => {
  const [group, variant] = token.split('.') as [string, string]
  const groupTypo = theme.typography[group as keyof typeof theme.typography]

  if (typeof groupTypo === 'object' && variant in groupTypo) {
    return groupTypo[variant as keyof typeof groupTypo]
  }

  return theme.typography.B3.Md
}

/**
 * StyledBadge Props
 * Transient props ($) 사용으로 DOM에 전달되지 않음
 */
export interface StyledBadgeProps {
  $tone: BadgeTone
  $variant: BadgeVariant
  $typo: TypoToken
}

/**
 * 뱃지 Styled Component
 * Transient props 패턴 적용
 */
export const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-block;
  border-radius: 20px;
  padding: 3px 10px;
  text-align: center;
  width: fit-content;
  height: fit-content;
  white-space: nowrap;

  background: ${({ $tone, $variant }) => toneStyles[$tone][$variant].background};
  color: ${({ $tone, $variant }) => toneStyles[$tone][$variant].color};
  border: ${({ $tone, $variant }) => toneStyles[$tone][$variant].border};

  /* Typography */
  font-size: ${({ $typo }) => resolveTypography($typo).fontSize};
  font-weight: ${({ $typo }) => resolveTypography($typo).fontWeight};
  line-height: ${({ $typo }) => resolveTypography($typo).lineHeight};
`
