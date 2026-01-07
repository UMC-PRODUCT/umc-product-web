import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const StepperWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const ProgressLineContainer = styled.div`
  position: absolute;
  top: 4px;
  left: calc(100% / 12);
  right: calc(100% / 12);
  height: 3px;
  background-color: ${theme.colors.gray[600]};
  z-index: 1;
`

const ActiveLine = styled.div<{ progressWidth: number }>`
  height: 100%;
  background-color: ${theme.colors.lime};
  width: ${({ progressWidth }) => progressWidth}%;
  transition: width 0.3s ease-in-out;
`

const StepItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  flex: 1;
`

const Dot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? `${theme.colors.lime}` : `${theme.colors.gray[600]}`};
  margin-bottom: 12px;
  transition: background-color 0.3s ease;
  ${media.down(theme.breakPoints.tablet)} {
    margin-bottom: 8px;
  }
`

const Label = styled.span<{ isActive: boolean }>`
  font-size: 13px;
  color: ${({ isActive }) => (isActive ? `${theme.colors.lime}` : `${theme.colors.gray[400]}`)};
  text-align: center;
  white-space: nowrap;
  ${theme.typography.C5.Md}
  ${media.down(theme.breakPoints.tablet)} {
    font-size: 11px;
    line-height: 1.3;
    max-width: 56px;
    white-space: normal;
    word-break: keep-all;
  }
`
export { ActiveLine, Dot, Label, ProgressLineContainer, StepItem, StepperWrapper }
