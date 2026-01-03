import styled from '@emotion/styled'

import { inputShell } from '@/styles/formStyles'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

const Input = styled.input`
  ${inputShell};
  padding: 10px 0 10px 20px;
  ::placeholder {
    color: ${theme.colors.gray[400]};
  }
  flex: 1;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 50px;
  ${media.down(theme.breakPoints.mobile)} {
    gap: 8px;
  }
  button {
    width: 92px;
  }
`

const IconBox = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[300]};
`
const InputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export { IconBox, Input, InputHeader, InputWrapper }
