import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

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
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 22px;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-y: auto;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.typography.B3.Md}
  width: 100%;
  height: 100%;
  min-height: 0;
`

export const ModalContentWrapper = styled.div`
  flex-direction: column;
  display: flex;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  max-width: 1080px;
  width: 80vw;
  max-height: 80vh;
  height: 700px;
  padding: 20px;
  overflow: hidden;
  background-color: ${theme.colors.black};
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.7);
  ${media.down(theme.breakPoints.desktop)} {
    max-width: 80vw;
    height: 700px;
    padding: 39px 58px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    max-width: 80vw;
    height: 700px;
    padding: 39px 58px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    max-width: 90vw;
    height: 500px;
    padding: 10px;
  }
`
