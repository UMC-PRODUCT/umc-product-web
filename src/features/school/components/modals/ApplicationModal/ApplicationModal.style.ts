import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  padding: 28px 28px 30px 34px;
  min-width: 492px;
  height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 8px;
    margin-top: 6px;
    padding: 28px 20px 28px 20px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    min-width: 90vw;
  }
`
export const ApplicationViewWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-y: auto;
`
export const Title = styled.div`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.white}
`
export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const Subtitle = styled.div`
  ${theme.typography.B5.Rg}
  color: ${theme.colors.gray[400]};
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
