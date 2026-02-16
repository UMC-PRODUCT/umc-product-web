import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { Flex } from '../../common/Flex'

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.div`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.white}
`
const Subtitle = styled.div`
  ${theme.typography.B5.Rg}
  color: ${theme.colors.gray[400]};
  white-space: pre-wrap;
`

const ModalButton = styled.button`
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

const ContentWrapper = styled(Flex)`
  white-space: pre-wrap;
  word-break: keep-all;
  color: ${(props) => props.theme.colors.white};
`

const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  padding: 28px 28px 30px 34px;
  min-width: 492px;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 8px;
    margin-top: 6px;
    padding: 28px 20px 28px 20px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    min-width: 90vw;
  }
`
const SocialItem = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 80px;
    height: 36px;
  }
`
const Social = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${theme.typography.B2.Md}
`

const Logo = styled.div<{ bgColor?: string }>`
  width: 52px;
  height: 52px;
  background-color: ${(props) => props.bgColor || 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray[600]};
`

export {
  ContentWrapper,
  Divider,
  Logo,
  ModalButton,
  ModalContentWrapper,
  Social,
  SocialItem,
  Subtitle,
  Title,
  TitleGroup,
}
