import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const TextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  padding: 12px 16px;
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  resize: none;
  background-color: ${theme.colors.black};
  overflow: hidden;
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`
export { TextArea }
