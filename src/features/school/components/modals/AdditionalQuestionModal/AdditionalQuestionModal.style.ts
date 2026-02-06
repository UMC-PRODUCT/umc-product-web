import styled from '@emotion/styled'

import { Flex } from '@/shared/ui/common/Flex'

export const Title = styled.h2`
  ${({ theme }) => theme.typography.B3.Sb};
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
`
export const ModalContentWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray[700]};
  border: 1px solid ${({ theme }) => theme.colors.gray[600]};
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`
export const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`
export const ApplicationViewWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  textarea {
    width: 100%;
    height: 150px;
    background-color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.gray[600]};
    border-radius: 8px;
    padding: 12px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    resize: none;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.lime};
      box-shadow: 0 0 0 2px rgba(166, 255, 0, 0.3);
    }
  }
`

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 13px;
  align-items: center;
  gap: 18px;
`

export const WordCounter = styled.div`
  color: ${({ theme }) => theme.colors.gray[400]};
  ${({ theme }) => theme.typography.C3.Md};
`
