import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const Title = styled.div`
  ${theme.typography.H1.Sb}
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H3.Sb}
  }
`
export const ModalButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
`
export const ContentWrapper = styled(Flex)`
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-y: auto;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.typography.B3.Md}
  width: 100%;
  height: 390px;
  ${media.up(theme.breakPoints.mobile)} {
    height: 360px;
  }
  ${media.up(theme.breakPoints.tablet)} {
    ${(props) => props.theme.typography.B4.Md}
    height: 530px;
  }
  ${media.up(theme.breakPoints.desktop)} {
    height: 670px;
  }
`

export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  width: 600px;
  max-width: 90vw;
  height: 500px;
  padding: 20px;
  overflow: hidden;

  ${media.up(theme.breakPoints.mobile)} {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
  }

  ${media.up(theme.breakPoints.tablet)} {
    width: 800px;
    min-width: 800px;
    height: 700px;
    padding: 39px 58px;
  }

  ${media.up(theme.breakPoints.desktop)} {
    width: 1080px;
    min-width: 1080px;
    height: 840px;
    padding: 39px 58px;
  }
`
