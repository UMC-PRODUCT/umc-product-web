import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  min-width: 550px;
  max-width: 92vw;
  max-height: 84vh;
  background-color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 12px;
  padding: 28px 28px 22px;
`

export const HeaderRow = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid ${theme.colors.gray[600]};
`

export const Title = styled.h2`
  margin: 0;
  color: ${theme.colors.white};
  ${theme.typography.H2.Sb}
`

export const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const ListWrapper = styled(Flex)`
  width: 100%;
  overflow-y: auto;
  max-height: 62vh;
  padding-right: 6px;
  margin-top: 14px;
  justify-content: space-between;
  flex-direction: column;
`

export const Card = styled(Flex)`
  width: 100%;
  height: 90px;
  border-radius: 10px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 17px 25px;
  gap: 150px;
  justify-content: space-between;
  align-items: center;
`

export const Name = styled.h3`
  margin: 0;
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb}
`

export const DateText = styled.span`
  color: ${theme.colors.gray[300]};
  ${theme.typography.B4.Rg}
  white-space: nowrap;
`
