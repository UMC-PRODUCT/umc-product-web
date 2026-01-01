import styled from '@emotion/styled'
import { theme } from '@/styles/theme'

const TermTitle = styled.span`
  color: ${theme.colors.lime};
  margin-left: 4px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  ${theme.typography.B4.Rg}
`

const Title = styled.span`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.white};
  margin-left: 4px;
`

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`

const Box = styled.span`
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 4px;
  background: ${theme.colors.gray[800]};
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  display: flex;
  ${HiddenCheckbox}:checked + & {
    border-color: ${theme.colors.lime};
    background-color: ${theme.colors.lime};
  }
`
export { TermTitle, Title, HiddenCheckbox, Box }
