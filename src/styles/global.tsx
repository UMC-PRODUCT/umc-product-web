import { css, Global } from '@emotion/react'

import { reset } from './reset'
import { theme } from './theme'

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}
      body {
        background: ${theme.colors.black};
        font-family: ${theme.typography.fontFamily.base};
      }
    `}
  />
)
