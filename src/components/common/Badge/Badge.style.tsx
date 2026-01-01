import styled from '@emotion/styled'
import type { Theme } from '@emotion/react'

export const getTone = (theme: Theme) =>
  ({
    gray: {
      solid: {
        background: theme.colors.gray[300],
        color: theme.colors.gray[700],
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.gray[700],
        border: `1px solid ${theme.colors.gray[700]}`,
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
  }) as const
