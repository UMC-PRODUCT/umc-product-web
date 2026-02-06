import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const ApplyNum = styled.div<{ color: 'lime' | 'white' }>`
  display: flex;
  align-items: baseline;
  gap: 4px;
  div {
    ${theme.typography.H3.Sb};
    color: ${({ color }) => theme.colors[color]};
    font-weight: 700;
    font-size: 32px;
  }
  span {
    ${theme.typography.B4.Md};
    color: ${theme.colors.gray[400]};
  }
`
