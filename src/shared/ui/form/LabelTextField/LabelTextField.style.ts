import styled from '@emotion/styled'

import { inputShell } from '@/shared/styles/formStyles'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const Input = styled.input<{ IconPlaced?: 'left' | 'right' }>`
  ${inputShell};
  padding: ${(props) =>
    props.IconPlaced === 'left' ? '10px 10px 10px 35px' : '10px 10px 10px 20px'};
  ::placeholder {
    color: ${theme.colors.gray[400]};
  }
  flex: 1;
  overflow-x: auto;

  ${media.down(theme.breakPoints.mobile)} {
    padding: 10px 8px 10px 12px;
  }
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 40px;
  max-height: 40px;
  ${media.down(theme.breakPoints.mobile)} {
    gap: 8px;
  }
  button {
    width: 92px;
  }
`

const IconBox = styled.span<{ iconPlaced?: 'left' | 'right' }>`
  position: absolute;
  right: ${(props) => props.iconPlaced === 'right' && '8px'};
  left: ${(props) => props.iconPlaced === 'left' && '8px'};
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
  margin-bottom: 10px;
`
export { IconBox, Input, InputHeader, InputWrapper }
