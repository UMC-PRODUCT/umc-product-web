import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const RadioChoiceInput = styled.input<{
  $isChecked?: boolean
  $isInteractive?: boolean
}>`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: 18px; /* 시안과 비슷하게 크기 조정 */
  height: 18px;
  border: 2px solid ${theme.colors.gray[500]};
  border-radius: 50%;
  background-color: transparent;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  /* 핵심 수정 부분: props로 전달된 isChecked에 따라 스타일 적용 */
  ${({ $isChecked }) =>
    $isChecked &&
    `
    border-color: ${theme.colors.white};
    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      background-color: ${theme.colors.white};
      border-radius: 50%;
    }
  `}

  &:hover {
    border-color: ${({ $isChecked }) => ($isChecked ? theme.colors.white : theme.colors.gray[300])};
  }
`

export const RadioChoiceText = styled.span`
  color: ${theme.colors.white};
  ${theme.typography.B3.Rg}
`
