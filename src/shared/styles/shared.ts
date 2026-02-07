import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

export const AccountContent = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

export const TabTitle = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.H3.Sb};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H4.Sb};
  }
`

export const TabSubtitle = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C4.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C5.Rg};
  }
`
export const TabHeader = styled(Flex)`
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
`
