import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const StepperWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  padding: 5px 10px 5px 10px;
  ${media.down(theme.breakPoints.tablet)} {
    margin-top: 24px;
    padding: 5px 30px 5px 30px;
  }
`

const ProgressLineContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 10px;
  right: 10px;
  height: 6px;
  background-color: ${theme.colors.gray[600]};
  z-index: 1;

  ${media.down(theme.breakPoints.tablet)} {
    top: 9px;
    height: 3px;
    left: 30px;
    right: 30px;
  }
`

const ActiveLine = styled.div<{ $progressWidth: number }>`
  height: 100%;
  background-color: ${theme.colors.lime};
  width: ${({ $progressWidth }) => $progressWidth}%;
  transition: width 0.3s ease-in-out;
`

const StepItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  &:first-of-type {
    align-items: flex-start;
  }
  &:last-of-type {
    align-items: flex-end;
  }
`

const Label = styled.span<{ $isActive: boolean }>`
  font-size: 13px;
  color: ${({ $isActive }) => ($isActive ? `${theme.colors.lime}` : `${theme.colors.gray[400]}`)};
  text-align: center;
  ${theme.typography.C3.Md}
  ${media.down(theme.breakPoints.tablet)} {
    font-size: 11px;
    line-height: 1.3;
    max-width: 56px;
    word-break: keep-all;
  }
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`

const Dot = styled.div<{ $isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $isActive }) =>
    $isActive ? `${theme.colors.lime}` : `${theme.colors.gray[600]}`};
  margin-bottom: 12px;
  position: relative;
  z-index: 2;

  ${media.down(theme.breakPoints.tablet)} {
    width: 10px;
    height: 10px;
    margin-bottom: 8px;
  }
`

export { ActiveLine, Dot, Label, ProgressLineContainer, StepItem, StepperWrapper }
