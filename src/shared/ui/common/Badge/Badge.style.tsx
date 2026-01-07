import type { Theme } from '@emotion/react'

export const getTone = (theme: Theme) =>
  ({
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
  }) as const
