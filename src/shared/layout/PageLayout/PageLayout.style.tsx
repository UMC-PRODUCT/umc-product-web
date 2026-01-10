import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const PageLayout = styled(Flex)`
  flex-direction: column;
  gap: 28px;
  padding: 52px 20px;
  ${media.down(theme.breakPoints.desktop)} {
    padding: 20px 20px;
  }
  max-width: 1200px;
  width: 100%;
`
