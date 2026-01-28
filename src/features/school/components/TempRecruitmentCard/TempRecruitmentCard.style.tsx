import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const Title = styled.div`
  ${theme.typography.H4.Sb}
  color: ${theme.colors.white}
`
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  position: relative;
  .label {
    color: ${theme.colors.gray[400]};
  }
  .dateInfo {
    color: ${theme.colors.white};
  }
`

export const LeftInfo = styled(Section)`
  flex-direction: row;
  ${theme.typography.B4.Rg}
`
