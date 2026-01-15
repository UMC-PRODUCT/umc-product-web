import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb}
`
export const SubTitle = styled.div`
  color: ${theme.colors.gray[400]};
  ${theme.typography.B5.Rg}
`
export const Button = styled.button<{ isActive: boolean }>`
  ${theme.typography.B3.Sb}
  color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[400])};
  border: ${(props) =>
    props.isActive ? `1px solid ${theme.colors.lime}` : `1px solid ${theme.colors.gray[600]}`};
  background-color: ${theme.colors.gray[700]};
  border-radius: 6px;
  padding: 16px 28px;
  cursor: pointer;
`
