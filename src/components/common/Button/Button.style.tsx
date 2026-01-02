import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'

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
  }) as const

export const baseButton = (disabled: boolean) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minWidth: '50px',
    flexWrap: 'nowrap',
    maxHeight: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 0,
    gap: 8,
    padding: '16px 16px',
  })
