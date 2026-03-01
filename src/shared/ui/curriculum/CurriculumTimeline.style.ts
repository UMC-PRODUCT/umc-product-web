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

const DOT_SIZE = 10
const ROW_VERTICAL_PADDING = 12
const TIMELINE_LINE_WIDTH = 2
const TIMELINE_LINE_LEFT = DOT_SIZE / 2 - TIMELINE_LINE_WIDTH / 2
const TIMELINE_LINE_OFFSET = ROW_VERTICAL_PADDING + DOT_SIZE / 2

export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const MobileColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const WeekRow = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  gap: 20px;
  height: fit-content;
  padding: ${ROW_VERTICAL_PADDING}px 0;

  &:not(:last-of-type)::before {
    content: '';
    position: absolute;
    left: ${TIMELINE_LINE_LEFT}px;
    top: ${TIMELINE_LINE_OFFSET}px;
    bottom: -${TIMELINE_LINE_OFFSET}px;
    width: ${TIMELINE_LINE_WIDTH}px;
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;
  }
`

export const Dot = styled.div`
  width: ${DOT_SIZE}px;
  min-width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: 50%;
  background-color: ${theme.colors.lime};
  z-index: 1;
`

export const WeekLabel = styled.span`
  color: ${theme.colors.lime};
  width: 50px;
  min-width: 50px;
  ${theme.typography.B3.Sb};
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 13px;
  }
`

export const ContentLabel = styled.span`
  color: ${theme.colors.white};
  padding-left: 18px;
  display: flex;
  border-left: 1px solid ${theme.colors.gray[500]};
  word-break: break-word;
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 13px;
  }
`
