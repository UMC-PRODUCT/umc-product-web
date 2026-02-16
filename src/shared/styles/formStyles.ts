import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Field = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 73px;
`

export const inputShell = css`
  width: 100%;
  min-width: 150px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  ${theme.typography.B3.Rg};
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    transform 120ms ease;

  &:focus-visible {
    outline: 2px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 4px rgba(149, 239, 75, 0.15);
  }
`
