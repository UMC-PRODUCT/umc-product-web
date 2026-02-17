import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const ScheduleTitle = styled.div`
  ${theme.typography.B1.Sb};
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B3.Sb}
  }
`
export const ScheduleCount = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: ${theme.colors.lime};
`

export const ScheduleInfo = styled.div`
  ${theme.typography.B4.Md};
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
`

export const InterviewTitle = styled.div`
  ${theme.typography.B4.Md}
  color: ${theme.colors.white}
`
export const Grid = styled.div<{ notProgress: boolean; empty: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ notProgress, empty }) =>
    empty ? '1fr' : notProgress ? '1fr' : '1fr 1fr 1fr'};
  gap: 14px;
  max-height: 100px;
  min-height: 100px;
  overflow-y: auto;
  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: ${({ empty }) => (empty ? '1fr' : '1fr 1fr')};
  }
  .not-progress {
    ${theme.typography.B5.Rg}
    color: ${theme.colors.gray[400]};
    text-align: center;
    align-self: center;
    margin-bottom: 10px;
  }
`
export const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 20px;
  width: 100%;
  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
  }
`
export const Blur = styled.div`
  padding: 0px;
  position: absolute;
  left: 0;
  right: 12px;
  bottom: 0;
  height: 100px;
  pointer-events: none;

  background: linear-gradient(
    180deg,
    rgba(32, 32, 32, 0) 0%,
    rgba(32, 32, 32, 0.6) 40%,
    rgba(32, 32, 32, 0.95) 70%,
    #202020 85%,
    #202020 100%
  );
  background-clip: content-box;
  background-color: transparent;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 0 15px;
  }
`
