import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    display: none;
  }
`

export const MobileTimeline = styled.div`
  display: none;
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    display: block;
  }
`

type ColumnLineProps = {
  $showLine: boolean
  $lineTop: number
  $lineBottom: number
}

export const FirstColumn = styled.div<ColumnLineProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: ${(props) => `${props.$lineTop}px`};
    bottom: ${(props) => `${props.$lineBottom}px`};
    width: 2px;
    display: ${(props) => (props.$showLine ? 'block' : 'none')};
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;
  }
`

export const SecondColumn = styled.div<ColumnLineProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: ${(props) => `${props.$lineTop}px`};
    bottom: ${(props) => `${props.$lineBottom}px`};
    width: 2px;
    display: ${(props) => (props.$showLine ? 'block' : 'none')};
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;
  }
`

export const MobileColumn = styled.div<ColumnLineProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: ${(props) => `${props.$lineTop}px`};
    bottom: ${(props) => `${props.$lineBottom}px`};
    width: 2px;
    display: ${(props) => (props.$showLine ? 'block' : 'none')};
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;
  }
`

export const WeekRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 0;
`

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${theme.colors.lime};
  z-index: 1;
`

export const WeekLabel = styled.span`
  color: ${theme.colors.lime};
  width: 50px;
  min-width: 50px;
  ${theme.typography.B3.Sb}
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 13px;
    min-width: fit-content;
  }
`

export const ContentLabel = styled.span`
  color: ${theme.colors.white};
  padding-left: 18px;
  border-left: 1px solid ${theme.colors.gray[500]};
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 13px;
  }
`
