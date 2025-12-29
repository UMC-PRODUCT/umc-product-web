import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from '@/styles/theme'

export const Field = styled.div`
  width: 408px;
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  display: flex;
  align-items: center;
  color: ${theme.colors.white};
  gap: 4px;
  margin-bottom: 10px;
  font-size: ${theme.typography.C3.Md};
`

export const inputShell = css`
  width: 100%;
  min-width: 300px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.white};
  font-size: ${theme.typography.B3.Rg};
  transition: border-color 140ms ease, box-shadow 140ms ease, transform 120ms ease;

  &:focus-visible {
    outline: 2px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 4px rgba(149, 239, 75, 0.15);
  }
`
