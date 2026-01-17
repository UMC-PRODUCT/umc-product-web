import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

export const TabHeader = styled(Flex)`
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
`

export const TabTitle = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.H3.Sb};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.H4.Sb};
  }
`

export const TabSubtitle = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C4.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.C5.Rg};
  }
`

export const Form = styled.form`
  width: 100%;
  gap: 32px;
  display: flex;
  flex-direction: column;
`

export const FormCard = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 38px;
  background-color: ${theme.colors.gray[800]};
  padding: 34px 38px;
  border-radius: 10px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 20px 20px;
  }
`

export const DropdownWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid ${theme.colors.gray[600]};
  padding-bottom: 30px;
  div {
    max-width: 360px;
  }
  button {
    background-color: ${theme.colors.black};
  }
`

export const InputRow = styled(Flex)`
  gap: 42px;
  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column;
    gap: 24px;
  }
`

export const TextAreaWrapper = styled(Flex)`
  flex-direction: column;
`

export const SubmitButtonWrapper = styled(Flex)`
  width: 120px;
  height: 41px;
  align-self: flex-end;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  padding: 12px 16px;
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  resize: none;

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`

export const FilterWrapper = styled(Flex)`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 24px;
  background-color: ${theme.colors.gray[800]};
  padding: 12px 14px;
  border-radius: 6px;
  flex-wrap: wrap;
`
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #999;
`

export const Pagination = styled.div`
  display: flex;
  gap: 15px;
  span {
    cursor: pointer;
  }
  .active {
    color: ${theme.colors.lime};
    font-weight: bold;
  }
`
export const BottomButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  ${theme.typography.B3.Rg};
  color: ${theme.colors.white};
  button:not([role='checkbox']) {
    width: 57px;
    height: 28px;
  }
`
