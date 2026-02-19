import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const Title = styled.div`
  ${theme.typography.H4.Sb};
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B4.Sb}
  }
`
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  position: relative;
  white-space: nowrap;

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
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Rg}
  }
`
