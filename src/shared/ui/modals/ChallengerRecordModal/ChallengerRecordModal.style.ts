import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.colors.gray[700]};
  border-radius: 8px;
  width: 640px;
  max-width: 90vw;
  min-height: 360px;
  padding: 28px 32px 30px;
`

export const HeaderRow = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid ${theme.colors.gray[600]};
`

export const Title = styled.h2`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.white};
`

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
`

export const Body = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  /* padding-top: 30px; */
  width: 100%;
`

export const Description = styled.p`
  ${theme.typography.B4.Rg}
  color: ${theme.colors.gray[400]};
  text-align: center;
`

export const CodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`

export const CodeBox = styled.div<{ $active: boolean }>`
  width: 62px;
  height: 72px;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.lime : theme.colors.gray[600])};
  background-color: ${theme.colors.gray[800]};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CodeText = styled.span`
  color: var(--Lime, #95ef4b);
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`

export const Footer = styled(Flex)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: auto;

  button {
    width: fit-content;
    min-width: 70px;
    padding: 8px 18px;
    height: 38px;
  }
`
