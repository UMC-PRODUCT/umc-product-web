import { theme } from '@/styles/theme'
import { css } from '@emotion/react'

export const LabelStyle = ({
  fontSize,
}: {
  fontSize: typeof theme.typography.C3.Md | typeof theme.typography.B2.Md
}) =>
  css({
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.white,
    gap: 4,
    marginBottom: 10,
    ...fontSize,
  })
