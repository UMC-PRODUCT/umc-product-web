import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const Title = styled.div`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.lime};
  border-bottom: 1px solid ${theme.colors.lime};
  padding: 0 14px 12px 14px;
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
  height: 100%;
  max-height: 480px;
  overflow-y: scroll;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.typography.B3.Md}
  ${media.down(theme.breakPoints.tablet)} {
    ${(props) => props.theme.typography.B4.Md}
  }
`

export const EmptyText = styled.div`
  height: 480px;
  justify-self: center;
  display: flex;
  align-items: center;
  ${theme.typography.B2.Md};
  color: ${theme.colors.gray[300]};
`

export const ModalContentWrapper = styled(Flex)`
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

export const MessageWrapper = styled(Flex)`
  width: 100%;
  min-height: 480px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
`

export const MessageTitle = styled.div`
  ${theme.typography.B2.Md}
  color: ${theme.colors.white};
  text-align: center;
`

export const MessageDescription = styled.div`
  ${theme.typography.B3.Rg}
  color: ${theme.colors.gray[400]};
  text-align: center;
`
