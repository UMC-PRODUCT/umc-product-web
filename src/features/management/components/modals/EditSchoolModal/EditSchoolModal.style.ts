import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ModalTitle = styled.h2`
  ${theme.typography.H2.Sb};
  margin: 0;
  color: ${theme.colors.white};
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
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
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

export const RoleButton = styled.button<{ isActive: boolean }>`
  ${theme.typography.C2.Rg};
  display: flex;
  gap: 17px;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ isActive }) => (isActive ? theme.colors.lime : theme.colors.gray[500])};
  background-color: ${({ isActive }) => (isActive ? '#2a3a2a' : theme.colors.gray[600])};
  color: ${({ isActive }) => (isActive ? theme.colors.lime : theme.colors.white)};
  cursor: pointer;
  width: 100%;
  height: 36px;
  text-align: start;
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? theme.colors.lime[600] : theme.colors.gray[500]};
  }
`

export const RadioChoiceInput = styled.input<{
  $isChecked?: boolean
}>`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: 18px;
  height: 18px;
  border: 2px solid ${theme.colors.gray[400]};
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${({ $isChecked }) =>
    $isChecked &&
    `
    border: 4px solid  ${theme.colors.lime};
    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      background-color: ${theme.colors.lime};
      border-radius: 50%;
    }
  `}
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

export const School = styled.p`
  ${theme.typography.C2.Rg};
  color: ${theme.colors.white};
  margin: 0;
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
export const SubTitle = styled.p`
  ${theme.typography.C4.Rg};
  margin: 0;
  color: ${theme.colors.gray[300]};
  text-align: start;
  width: 100%;
`

export const Generation = styled.div<{ isActive: boolean }>`
  display: flex;
  width: fit-content;
  padding: 4px 10px;
  color: ${({ isActive }) => (isActive ? theme.colors.lime : theme.colors.gray[300])};
  white-space: nowrap;
  border-radius: 4px;
  border: ${({ isActive }) =>
    isActive ? `1px solid ${theme.colors.lime}` : `1px solid ${theme.colors.gray[400]}`};
  background-color: ${({ isActive }) => (isActive ? '#2a3a2a' : theme.colors.gray[600])};
`
export const ActivityInfo = styled.div<{ isActive: boolean }>`
  ${theme.typography.C2.Rg};
  color: ${theme.colors.white};
  margin: 0 16px 0 0;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  span {
    color: ${({ isActive }) => (isActive ? theme.colors.white : theme.colors.gray[300])};
  }
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
