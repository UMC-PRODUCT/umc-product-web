import { css } from '@emotion/react'

import { theme } from '@/styles/theme'

const divStyle = css({
  marginTop: '76px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  width: '100%',
  padding: '16px 0',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.35)',
    borderRadius: 999,
  },
})

const spanStyle = css({
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
  color: theme.colors.gray[400],
  ...theme.typography.B3.Md,
})

export { divStyle, spanStyle }
