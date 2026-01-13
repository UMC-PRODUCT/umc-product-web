import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
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
    ${theme.typography.B4.Rg}
    color: ${theme.colors.gray[400]};
  }
  .dateInfo {
    ${theme.typography.B4.Md}
    color: ${theme.colors.white};
  }
  .recruiteNum {
    ${theme.typography.B4.Sb}
    color: ${theme.colors.lime};
  }
`

export const LeftInfo = styled(Section)`
  flex-direction: row;
  gap: 26px;
  padding: 0;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 10px;
  }
  .state {
    position: relative;
    ${media.down(theme.breakPoints.tablet)} {
      position: absolute;
      top: 2px;
      left: 130px;
    }
  }
`
