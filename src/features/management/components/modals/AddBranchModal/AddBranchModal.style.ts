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
  justify-content: flex-end;
  margin-top: auto;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
  button {
    width: fit-content;
    height: 32px;
  }
`

export const SelectedSchoolText = styled.p`
  ${theme.typography.C3.Md};
  color: ${theme.colors.gray[300]};
  margin: 0;
`

export const SelectedSchoolTag = styled.span`
  ${theme.typography.C3.Rg};
  border: 1px solid ${theme.colors.gray[600]};
  color: ${theme.colors.gray[300]};
  padding: 4px 14px;
  border-radius: 4px;
  display: inline-flex;
  gap: 10px;
`

export const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`
