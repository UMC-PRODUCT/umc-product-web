import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  ${theme.typography.B3.Rg};
  color: ${theme.colors.white};
  white-space: nowrap;
  button:not([role='checkbox']) {
    width: 57px;
    height: 28px;
  }
`

export { Td }
