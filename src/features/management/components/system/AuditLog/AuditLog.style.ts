import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const FilterField = styled.div`
  display: flex;
  flex: 1 1 180px;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
`

const FilterLabel = styled.label`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C5.Rg};
`

const TextInput = styled.input`
  width: 100%;
  min-width: 150px;
  border-radius: 8px;
  border: 1.5px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  ${theme.typography.B3.Rg};
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    transform 120ms ease;
  height: 50px;
  min-height: 50px;
  padding: 0 14px;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus-visible {
    outline: 1px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 2px rgba(149, 239, 75, 0.15);
  }

  ${media.down(theme.breakPoints.tablet)} {
    height: 42px;
    min-height: 42px;
    ${theme.typography.B4.Rg};
  }
`

const ActionGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-left: auto;

  ${media.down(theme.breakPoints.tablet)} {
    width: 100%;
    margin-left: 0;

    button {
      flex: 1 1 0;
    }
  }
`

const SummaryLabel = styled.span`
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb};
`

const SummaryValue = styled.span`
  color: ${theme.colors.lime};
  ${theme.typography.H4.Sb};
`

const SummaryMeta = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C5.Rg};
`

const TargetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-of-type {
    color: ${theme.colors.white};
    ${theme.typography.C2.Sb};
  }

  span:last-of-type {
    color: ${theme.colors.gray[300]};
    ${theme.typography.C5.Rg};
    word-break: break-all;
  }
`

const DescriptionText = styled.span`
  color: ${theme.colors.white};
  ${theme.typography.C3.Md};
  word-break: break-word;
`

export {
  ActionGroup,
  Container,
  DescriptionText,
  FilterField,
  FilterLabel,
  SummaryLabel,
  SummaryMeta,
  SummaryValue,
  TargetInfo,
  TextInput,
}
