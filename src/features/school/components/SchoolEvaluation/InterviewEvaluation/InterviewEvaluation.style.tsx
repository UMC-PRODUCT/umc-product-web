import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
  background-color: ${theme.colors.gray[700]};
  border-radius: 8px;
`
export const Button = styled.button<{ $isActive: boolean }>`
  width: 81px;
  border: none;
  border-radius: 7px;
  ${theme.typography.B4.Sb};
  padding: 7px 0;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? theme.colors.lime : theme.colors.gray[700])};
  color: ${(props) => (props.$isActive ? theme.colors.black : theme.colors.gray[300])};
`
