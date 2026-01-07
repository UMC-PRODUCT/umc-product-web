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

export const Info = styled.span`
  color: ${theme.colors.gray[300]};
  ${theme.typography.B4.Md}
`

export const PartInfoCardLayout = styled(Flex)`
  gap: 12px;
  padding: 15px;
  background-color: ${theme.colors.gray[800]};
  border-radius: 4px;
  color: ${theme.colors.white};
  ${theme.typography.B2.Md}
  align-items: center;
  min-width: 0;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 15px 15px;
    ${theme.typography.B3.Md}
  }
`
export const AlreadySubmitLayout = styled(Flex)`
  width: 100%;
  max-width: 900px;
  padding: 32px 16px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray[700]};
`

export const PartInfoCardWrapper = styled(Flex)`
  width: 100%;
  max-width: 900px;
  padding: 16px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray[700]};
`
export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  min-width: 0;
  flex-wrap: nowrap;
  gap: 18px;
  ${media.down(theme.breakPoints.tablet)} {
    display: none;
  }
`
export const PartInfo = styled(Flex)`
  gap: 24px;
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B4.Md}
    gap: 14px;
  }
  button {
    ${theme.typography.B3.Sb}
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B4.Sb}
    }
    cursor: default;
  }
`

export const ButtonWrapper = styled(Flex)`
  width: 86px;
  height: 21px;
  ${media.down(theme.breakPoints.tablet)} {
    width: 60px;
  }
`

export const SubmitTitle = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.H1.Sb}
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H3.Sb}
  }
`

export const SubmitContent = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.B3.Md}
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B4.Sb}
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
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`

export const QuestionLayout = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.colors.gray[800]};
  border: 1.5px solid ${theme.colors.gray[700]};
  padding: 22px 28px;
  border-radius: 8px;
`

export const QuestionTitle = styled.div`
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
  span {
    margin-left: 4px;
  }
`

export const NavigationButtonWrapper = styled.div`
  justify-content: flex-end;
  gap: 4px;
  margin-top: 8px;
  align-items: center;
  display: flex;
  ${theme.typography.B2.Md}
`
export const PageWrapper = styled.div`
  display: flex;
  ${theme.typography.C2.Md}
`
