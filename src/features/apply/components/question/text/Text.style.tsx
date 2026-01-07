import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: transparent;
  border: none;
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
export { TextArea }
