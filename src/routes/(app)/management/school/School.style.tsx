import styled from '@emotion/styled'
import Flex from '@/components/common/Flex/Flex'
import { theme } from '@/styles/theme'
import { media } from '@/styles/media'

export const PageLayout = styled(Flex)`
  flex-direction: column;
  gap: 28px;
  padding: 52px 135px;
  ${media.down(theme.breakPoints.desktop)} {
    padding: 20px 20px;
  }
`

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

export const inputStyle = {
  backgroundColor: theme.colors.black,
}
