import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const RadioChoiceInput = styled.input<{ isChecked?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: 18px; /* 시안과 비슷하게 크기 조정 */
  height: 18px;
  border: 2px solid ${theme.colors.gray[500]};
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  /* 핵심 수정 부분: props로 전달된 isChecked에 따라 스타일 적용 */
  ${({ isChecked }) =>
    isChecked &&
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
    border-color: ${({ isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray[300])};
  }
`
// 라벨과 라디오를 묶어주는 컨테이너 (이미지처럼 정렬하기 위함)
export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  color: ${theme.colors.white};
  ${theme.typography.B3.Md}; /* 텍스트 스타일 적용 */

  &:hover ${RadioChoiceInput} {
    border-color: ${theme.colors.gray[300]};
  }
`
