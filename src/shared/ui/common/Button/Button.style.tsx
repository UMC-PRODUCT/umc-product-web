import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import type { ButtonTone, ButtonVariant } from '@/shared/types/component'
import type { TypoToken } from '@/shared/types/typo'

/**
 * Tone별 스타일 정의
 * solid: 배경색 채움
 * outline: 테두리만 표시
 */
const toneStyles = {
  gray: {
    solid: {
      background: theme.colors.gray[300],
      color: theme.colors.gray[700],
      border: 'none',
    },
    outline: {
      background: theme.colors.gray[700],
      color: theme.colors.gray[400],
      border: `1px solid ${theme.colors.gray[600]}`,
    },
  },
  darkGray: {
    solid: {
      background: theme.colors.gray[500],
      color: theme.colors.black,
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.black,
      border: `1px solid ${theme.colors.gray[500]}`,
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
  caution: {
    solid: {
      background: theme.colors.caution,
      color: theme.colors.black,
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: theme.colors.caution,
      border: `1px solid ${theme.colors.caution}`,
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
 * StyledButton Props
 * Transient props ($) 사용으로 DOM에 전달되지 않음
 */
export interface StyledButtonProps {
  $tone: ButtonTone
  $variant: ButtonVariant
  $disabled: boolean
  $rounded: number
  $typo: TypoToken
}

/**
 * 버튼 Styled Component
 * Transient props 패턴 적용
 */
export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 50px;
  max-height: 100%;
  gap: 8px;
  padding: 16px;
  outline: 0;
  flex-wrap: nowrap;
  white-space: nowrap;

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ $rounded }) => $rounded}px;
  background: ${({ $tone, $variant }) => toneStyles[$tone][$variant].background};
  color: ${({ $tone, $variant }) => toneStyles[$tone][$variant].color};
  border: ${({ $tone, $variant }) => toneStyles[$tone][$variant].border};

  /* Typography */
  font-size: ${({ $typo }) => resolveTypography($typo).fontSize};
  font-weight: ${({ $typo }) => resolveTypography($typo).fontWeight};
  line-height: ${({ $typo }) => resolveTypography($typo).lineHeight};
`
