import styled from '@emotion/styled'

import { theme } from '@shared/styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const CountText = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
`

export const StatusText = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray[400]};
  margin-top: 4px;
`
