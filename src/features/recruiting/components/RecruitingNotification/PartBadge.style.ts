import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const PartBadge = styled.div`
  padding: 9px 15px;
  border-radius: 6px;
  background-color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  color: ${theme.colors.gray[300]};
  user-select: none;
  ${theme.typography.B4.Rg}
`
