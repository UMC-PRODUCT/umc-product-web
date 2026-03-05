import { css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

export const containerStyle = css({
  minHeight: '400px',
  padding: '40px 20px',
})

export const detailStyle = css({
  color: theme.colors.gray[300],
  backgroundColor: theme.colors.gray[800],
  fontSize: '12px',
  lineHeight: '20px',
  padding: '12px 16px',
  borderRadius: '8px',
  maxWidth: '440px',
  overflow: 'auto',
  wordBreak: 'break-word',
})
