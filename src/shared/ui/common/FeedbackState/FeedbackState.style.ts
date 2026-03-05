import type { CSSObject } from '@emotion/react'
import { css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

type SizeValue = number | string

export const loadingContainerStyle = css({
  padding: '60px 0',
  color: theme.colors.gray[400],
  textAlign: 'center',
})

export const getErrorContainerStyle = (compact: boolean) =>
  css({
    padding: compact ? '0' : '70px 24px',
    minHeight: compact ? 'auto' : '260px',
    textAlign: 'center',
  })

export const errorIconStyle = css({
  borderRadius: '50%',
  background: theme.colors.gray[600],
  color: theme.colors.gray[300],
  fontSize: '28px',
})

export const contentStyle = css({
  maxWidth: 440,
})

export const titleStyle = css({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.colors.gray[300],
})

export const descriptionStyle = css({
  color: theme.colors.gray[300],
  fontSize: '16px',
})

export const hintStyle = css({
  color: theme.colors.gray[400],
  fontSize: '12px',
})

export const detailTextStyle = css({
  color: theme.colors.gray[400],
  fontSize: '12px',
  wordBreak: 'keep-all',
})

export const getRetryButtonStyle = (
  minWidth: SizeValue,
  width: SizeValue,
  height: SizeValue,
): CSSObject => ({
  minWidth,
  width,
  height,
})
