import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const TermCard = styled.div`
  width: 100%;
  padding: 16px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 6px;
  background-color: ${theme.colors.gray[700]};
`
export const Logo = styled.div`
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a3a2a;
`
export const TermTitle = styled.h3`
  margin: 0;
  ${theme.typography.H4.Sb};
  color: ${theme.colors.white};
`
export const Info = styled.span`
  ${theme.typography.C4.Rg};
  color: ${theme.colors.gray[400]};
`
