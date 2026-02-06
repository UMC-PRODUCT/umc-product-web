import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const CardWrapper = styled(Section)`
  flex-direction: row;
  padding: 17px 22px;
  border: 1px solid ${theme.colors.gray[700]};
  .status {
    width: 80px;
    height: 30px;
  }
  .title {
    color: ${theme.colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    ${theme.typography.B3.Md}
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B5.Md}
    }
  }
  ${media.down(theme.breakPoints.tablet)} {
    padding: 14px 14px;
  }
`
