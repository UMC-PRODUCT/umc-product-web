import styled from '@emotion/styled'

import { theme } from '@shared/styles/theme'

const TermTitle = styled.span`
  color: ${theme.colors.lime};
  margin-left: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${theme.typography.B4.Rg}
`

const Title = styled.span`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.white};
  margin-left: 4px;
`

export { TermTitle, Title }
