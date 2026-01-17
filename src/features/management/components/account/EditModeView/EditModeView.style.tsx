import styled from '@emotion/styled'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import Flex from '@shared/ui/common/Flex/Flex'

import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

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
  top: 38px;
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

const SpanConditional = styled.span<{ isActive: boolean }>`
  position: relative;
  color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.necessary)};
  top: 12px;
  white-space: nowrap;
  height: fit-content;
  border-bottom: ${(props) =>
    props.isActive ? `1px solid ${theme.colors.lime}` : `1px solid ${theme.colors.necessary}`};
  cursor: pointer;
  ${theme.typography.B4.Md};
  ${media.down('380px')} {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const MetaRow = styled(Flex)`
  align-self: flex-start;
  flex-direction: row;
  ${media.down(theme.breakPoints.desktop)} {
    flex-wrap: wrap;
  }
`

const MetaGroup = styled(Flex)`
  ${media.down(theme.breakPoints.desktop)} {
    min-width: 100%;
  }
  ${media.down(theme.breakPoints.tablet)} {
    flex-wrap: wrap;
  }
`

const MetaStatusGroup = styled(Flex)`
  position: relative;
  width: fit-content;
  ${media.down('380px')} {
    width: 100%;
    min-width: 100%;
  }
`

const MetaField = styled(LabelTextField)`
  input {
    color: ${theme.colors.gray[400]};
    cursor: default;
    &:focus-visible {
      outline: none;
      border: 1.5px solid ${theme.colors.gray[600]};
      box-shadow: none;
    }
  }
`

const MetaFixedField = styled(MetaField)`
  min-width: 280px;
  max-width: 280px;
  ${media.down(theme.breakPoints.tablet)} {
    min-width: 100%;
  }
`

const MetaStatusField = styled(MetaField)`
  ${media.down(theme.breakPoints.mobile)} {
    width: 100%;
  }
  input {
    min-width: fit-content;
    ${media.down(theme.breakPoints.mobile)} {
      min-width: 100%;
    }
  }
`

export {
  EmailSection,
  EmailWrapper,
  Form,
  InputRow,
  MetaField,
  MetaFixedField,
  MetaGroup,
  MetaRow,
  MetaStatusField,
  MetaStatusGroup,
  Span,
  SpanConditional,
  SubmitButtonWrapper,
}
