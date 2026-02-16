import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const Title = styled.div`
  ${theme.typography.H3.Sb}
  color: ${theme.colors.white};
`

export const SubTitle = styled.div`
  ${theme.typography.C4.Rg}
  color: ${theme.colors.gray[400]};
`
export const ModalButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
`
export const ContentWrapper = styled(Flex)`
  white-space: pre-wrap;
  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.typography.B3.Md}
  width: 100%;
`

export const ScoreInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`
export const Score = styled.div`
  display: flex;
  gap: 12px;
  .score {
    ${theme.typography.B4.Md};
    color: ${theme.colors.white};
  }
  .label {
    ${theme.typography.B4.Rg};
    color: ${theme.colors.gray[400]};
  }
  .totalScore {
    ${theme.typography.B3.Sb};
    color: ${theme.colors.lime};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  margin-bottom: 30px;
`

export const PartButton = styled.button<{ Active: boolean }>`
  height: 44px;
  width: 220px;
  background-color: transparent;
  padding: 16px 14px;
  border-radius: 8px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  gap: 10px;
  height: fit-content;
  ${(props) => props.theme.typography.B3.Md}
  color: ${(props) => (props.Active ? props.theme.colors.lime : props.theme.colors.gray[300])};
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.Active ? props.theme.colors.lime : props.theme.colors.gray[600])};
`
export const ModalContentWrapper = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.gray[700]};
  border-radius: 8px;
  width: 520px;
  max-width: 520px;
  height: 324px;
  padding: 20px;
  overflow: hidden;
`

export const RadioChoiceInput = styled.input<{
  $isChecked?: boolean
  $isInteractive?: boolean
}>`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: 18px;
  height: 18px;
  border: 2px solid ${theme.colors.gray[500]};
  border-radius: 50%;
  background-color: transparent;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${({ $isChecked }) =>
    $isChecked &&
    `
    border-color: ${theme.colors.lime};
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
