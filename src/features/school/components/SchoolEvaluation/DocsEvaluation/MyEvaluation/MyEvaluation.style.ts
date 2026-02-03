import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FlexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ScoreInputBox = styled.div`
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  padding: 10px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  &:focus-within {
    border-color: ${theme.colors.lime};
  }
  .total {
    ${theme.typography.B5.Md};
    color: ${theme.colors.gray[300]};
  }
`

export const ScoreInput = styled.input`
  background: transparent;
  border: none;
  color: ${theme.colors.lime};
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  line-height: 1;
  width: 40px;
  outline: none;
  padding: 0;
  /* Chrome, Safari, Edge, Opera에서 스핀 버튼 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox에서 스핀 버튼 제거 */
  appearance: textfield;
`

export const CharCount = styled.span`
  color: #888;
  font-size: 14px;
`

export const TextArea = styled.textarea`
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  padding: 10px 14px;
  color: ${theme.colors.white};
  min-height: 72px;
  resize: none;
  font-size: 15px;
  line-height: 1.5;
  overflow-y: auto;
  height: 72px;
  outline: none;
  &:focus {
    border-color: ${theme.colors.lime};
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DateText = styled.span`
  ${theme.typography.B5.Md};
  color: ${theme.colors.gray[400]};
`

export const SubmitButton = styled.button`
  background-color: #b0f248;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #9cdb3d;
  }
`
