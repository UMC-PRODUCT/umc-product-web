import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '@shared/styles/theme'

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
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  align-self: center;
  justify-self: center;
`

const LoadingSpinner = styled.span`
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${({ theme: styledTheme }) => styledTheme.colors.lime};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-flex;
`

export { LoadingSpinner, SpinnerWrapper, TermTitle, Title }
