import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

const Form = styled.form`
  width: 100%;
  gap: 32px;
  display: flex;
  flex-direction: column;
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 42px;
  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const SubmitButtonWrapper = styled(Flex)`
  width: 120px;
  height: 41px;
  align-self: flex-end;
`

const EmailWrapper = styled(Flex)`
  align-self: flex-start;
  ${media.up(theme.breakPoints.desktop)} {
    max-width: 536px;
  }
  span {
    margin-right: 110px;
    ${media.down(theme.breakPoints.tablet)} {
      margin-right: 0;
    }
  }
`

const Span = styled.span`
  ${media.down(theme.breakPoints.desktop)} {
    position: absolute;
    top: 0;
    right: 0;
  }

  color: ${theme.colors.lime};
  position: relative;
  top: 35px;
  white-space: nowrap;
  height: fit-content;
  border-bottom: 1px solid ${theme.colors.lime};
  cursor: pointer;
  ${theme.typography.B4.Md};
`

const EmailSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-self: flex-start;
  flex-direction: row;
  gap: 20px;
  ${media.down(theme.breakPoints.mobile)} {
    flex-direction: column;
  }
`

export { EmailSection, EmailWrapper, Form, InputRow, Span, SubmitButtonWrapper }
