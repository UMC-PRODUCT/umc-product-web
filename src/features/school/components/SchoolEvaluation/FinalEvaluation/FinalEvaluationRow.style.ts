import type { Interpolation, Theme } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

export const colors = {
  checkboxBorder: theme.colors.gray[400],
}

export const tagButtonStyle: Interpolation<Theme> = {
  width: 'fit-content',
  padding: '3.5px 9px',
  height: '28px',
  maxHeight: '28px',
  color: theme.colors.gray[300],
}

export const resultButtonStyle: Interpolation<Theme> = {
  width: '90px',
  padding: '3.5px 9px',
  height: '28px',
  maxHeight: '28px',
  color: theme.colors.gray[300],
}

export const resultTextStyle: Interpolation<Theme> = {
  color: theme.colors.gray[500],
}
