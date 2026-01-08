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

export const BorderedSection = styled(Flex)`
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

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`

export const LastSavedTime = styled.span`
  ${theme.typography.B3.Rg}
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Rg}
  }
`

export const QuestionContainer = styled(Flex)`
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

export const QuestionHeader = styled.div`
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
