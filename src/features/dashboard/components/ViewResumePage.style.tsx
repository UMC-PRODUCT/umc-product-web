import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const PageLayout = styled(Flex)`
  flex-direction: column;
  gap: 28px;
  padding: 52px 20px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 20px 20px;
  }
`

export const BorderSection = styled(Flex)`
  width: 100%;
  flex-direction: column;
  border: 1.5px solid ${theme.colors.gray[700]};
  color: ${theme.colors.gray[300]};
  ${theme.typography.B3.Rg}
  white-space: pre-wrap;
  padding: 24px;
  border-radius: 8px;
  max-width: 956px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 10px 8px;
    ${theme.typography.B4.Rg}
  }

  gap: 22px;
  .last-saved-time {
    ${theme.typography.B3.Rg}
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B5.Rg}
    }
  }
`
