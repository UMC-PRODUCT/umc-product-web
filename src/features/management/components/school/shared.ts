import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

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
  height: fit-content;
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

export const FileWrapper = styled(Flex)`
  width: 100%;
  cursor: pointer;
  border: 2px dashed ${theme.colors.gray[600]};
  border-radius: 6px;
  min-height: 150px;
  background-color: ${theme.colors.black};
  color: ${theme.colors.gray[500]};
  ${theme.typography.B4.Rg}
  .main-text {
    display: inline;
    color: ${theme.colors.lime};
  }
  .mobile-text {
    display: none;
  }
  input {
    display: none;
  }

  .file-notification {
    ${theme.typography.C5.Rg}
  }
  span {
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.C5.Rg}
    }
  }

  &:hover {
    background-color: ${theme.colors.gray[700]};
  }
`

export const TextAreaWrapper = styled(Flex)`
  flex-direction: column;
  gap: 8px;
`

export const SubmitButtonWrapper = styled(Flex)`
  width: 120px;
  height: 41px;
  align-self: flex-end;
  margin-top: auto;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 48px;
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

export const SchoolProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
export const SchoolProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${media.down(theme.breakPoints.tablet)} {
    align-items: center;
  }
  h3 {
    ${theme.typography.B2.Md};
    color: ${theme.colors.white};
    margin: 0;
  }
  p {
    ${theme.typography.C4.Rg};
    color: ${theme.colors.gray[400]};
    margin: 0;
  }
  button {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 65px;
    height: 28px;
    border-radius: 6px;
    background-color: #2a3a2a;
    border: none;
    color: ${theme.colors.lime};
    padding: 4px 10px;
    ${theme.typography.C3.Md}
    div {
      width: 6px;
      margin-left: 4px;
      height: 6px;
      border-radius: 50%;
      background-color: ${theme.colors.lime};
    }
  }
`
export const ExternalLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  gap: 8px;
  background-color: ${theme.colors.black};
  border: 2px dashed ${theme.colors.gray[600]};
  padding: 13px 22px;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 12px;
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
`
export const AddLink = styled.button`
  background-color: ${theme.colors.black};
  color: ${theme.colors.lime};
  border: none;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${theme.typography.B3.Rg}
  .icon {
    border-radius: 50%;
    border: 1px solid ${theme.colors.lime};
    width: 20px;
    height: 20px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  svg {
    width: 12px;
    height: 12px;
  }
  .description {
    ${theme.typography.C5.Rg}
    color: ${theme.colors.gray[500]};
  }
  ${media.down(theme.breakPoints.tablet)} {
    height: 100px;
    ${theme.typography.B5.Rg}
  }
  .description {
    ${theme.typography.C5.Rg}
    color: ${theme.colors.gray[500]};
  }
`
