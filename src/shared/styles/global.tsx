import { css, Global } from '@emotion/react'

import { reset } from './reset'
import { theme } from './theme'

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}
      html,
      body {
        background: ${theme.colors.black};
        font-family: ${theme.typography.fontFamily.base};
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-gutter: stable both-edges;
        scrollbar-color: transparent transparent;
        input:focus {
          outline: none;
        }
        textarea:focus {
          outline: none;
        }
      }
      body:hover {
        scrollbar-color: ${theme.colors.gray[400]} transparent;
      }
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 999px;
      }
      body:hover ::-webkit-scrollbar-thumb {
        background: ${theme.colors.gray[400]};
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }
    `}
  />
)
