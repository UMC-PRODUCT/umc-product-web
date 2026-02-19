import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalTitle = styled.h2`
  ${theme.typography.H2.Sb};
  margin: 0;
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H3.Sb};
  }
`
export const ModalContentWrapper = styled(Flex)`
  background-color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
`
export const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
  button {
    width: fit-content;
    height: 32px;
  }
`

export const SubInfo = styled.span`
  ${theme.typography.C4.Rg};
  color: ${theme.colors.gray[300]};
  margin: 4px 0 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Name = styled.h3`
  ${theme.typography.B1.Sb};
  margin: 0;
  color: ${theme.colors.white};
`

export const Status = styled.div`
  display: inline-flex;
  width: 67px;
  height: 28px;
  background-color: #2a3a2a;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.lime};
  gap: 5px;
  ${theme.typography.C2.Rg};
`

export const Circle = styled.div`
  display: flex;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.lime};
`
export const Title = styled.h3`
  ${theme.typography.H3.Sb};
  margin: 15px 0 0 0;
  color: ${theme.colors.white};
  text-align: start;
  width: 100%;
`

export const AddLink = styled.button`
  background-color: ${theme.colors.black};
  color: ${theme.colors.lime};
  border: 1px dashed ${theme.colors.lime};
  width: 100%;
  height: 50px;
  border-radius: 8px;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme.typography.C5.Rg}
  span {
    border-radius: 50%;
    border: 1px solid ${theme.colors.lime};
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  svg {
    width: 6px;
    height: 6px;
  }
`

export const LinkPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`

export const LinkPreviewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  padding: 10px 25px;
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
`

export const LinkTitleText = styled.span`
  ${theme.typography.C4.Rg};
  color: ${theme.colors.lime};
`

export const LinkUrlText = styled.span`
  ${theme.typography.C5.Rg};
  color: ${theme.colors.gray[300]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`
