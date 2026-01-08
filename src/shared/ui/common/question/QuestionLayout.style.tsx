import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const Container = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.colors.gray[800]};
  border: 1.5px solid ${theme.colors.gray[700]};
  padding: 22px 28px;
  border-radius: 8px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 16px 16px;
  }
`

export const Header = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.B2.Md}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-bottom: 1px solid ${theme.colors.gray[600]};

  .title {
    display: flex;
    align-items: center;
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B3.Md};
    }
    gap: 4px;
  }

  span {
    margin-left: 4px;
  }
`
