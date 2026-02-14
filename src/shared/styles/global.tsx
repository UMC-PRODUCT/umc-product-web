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
        max-width: 100vw;
        margin: 0;
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
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
        -webkit-text-fill-color: ${theme.colors.white} !important;
        caret-color: ${theme.colors.white};
        box-shadow: 0 0 0px 1000px ${theme.colors.black} inset;
        transition: background-color 9999s ease-out 0s;
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
