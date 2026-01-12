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
        overflow-x: hidden;
        input:focus {
          outline: none;
        }
        textarea:focus {
          outline: none;
        }
      }
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.gray[400]};
        border-radius: 999px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }
    `}
  />
)
