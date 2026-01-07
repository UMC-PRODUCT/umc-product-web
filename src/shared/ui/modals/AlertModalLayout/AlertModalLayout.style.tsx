import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { Flex } from '../../common/Flex'

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
  padding-left: 14px;
  border-left: 4px solid ${(props) => props.theme.colors.white};
  white-space: pre-line;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.typography.B3.Md}
  ${media.down(theme.breakPoints.tablet)} {
    padding-left: 10px;
    border-left: 3px solid ${(props) => props.theme.colors.white};
    ${(props) => props.theme.typography.B4.Md}
  }
`

const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  padding: 28px 28px 30px 34px;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 8px;
    margin-top: 6px;
    padding: 28px 20px 28px 20px;
  }
`
export { ContentWrapper, ModalButton, ModalContentWrapper }
