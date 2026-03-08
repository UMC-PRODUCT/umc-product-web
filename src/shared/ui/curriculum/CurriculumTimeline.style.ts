import { css } from '@emotion/react'
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
const DOT_TOP_OFFSET = 4
const ROW_VERTICAL_PADDING = 12
const TIMELINE_LINE_WIDTH = 2
const TIMELINE_LINE_LEFT = DOT_SIZE / 2 - TIMELINE_LINE_WIDTH / 2
const TIMELINE_LINE_OFFSET = ROW_VERTICAL_PADDING + DOT_TOP_OFFSET + DOT_SIZE / 2
const COLUMN_BRIDGE_LENGTH = 28

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

export const WeekRow = styled.div<{ $connectToNext?: boolean }>`
  display: flex;
  position: relative;
  align-items: flex-start;
  gap: 20px;
  height: fit-content;
  padding: ${ROW_VERTICAL_PADDING}px 0;

  ${({ $connectToNext }) =>
    $connectToNext &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: ${TIMELINE_LINE_LEFT}px;
        top: ${TIMELINE_LINE_OFFSET}px;
        bottom: -${TIMELINE_LINE_OFFSET}px;
        width: ${TIMELINE_LINE_WIDTH}px;
        background: linear-gradient(
          to bottom,
          ${theme.colors.lime} 0%,
          ${theme.colors.lime} 82%,
          #95ef4b80 94%,
          #95ef4b00 100%
        );
        opacity: 0.72;
      }
    `}
`

export const Dot = styled.div<{ $extendTop?: boolean; $extendBottom?: boolean }>`
  position: relative;
  width: ${DOT_SIZE}px;
  min-width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  margin-top: ${DOT_TOP_OFFSET}px;
  border-radius: 50%;
  background-color: ${theme.colors.lime};
  z-index: 1;
  box-shadow: 0 0 10px #95ef4b66;

  ${({ $extendTop }) =>
    $extendTop &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: ${TIMELINE_LINE_LEFT}px;
        bottom: 50%;
        width: ${TIMELINE_LINE_WIDTH}px;
        height: ${COLUMN_BRIDGE_LENGTH}px;
        transform: translateY(1px);
        background: linear-gradient(
          to top,
          ${theme.colors.lime} 0%,
          #95ef4bcc 28%,
          #95ef4b66 60%,
          #95ef4b00 100%
        );
        box-shadow: 0 -6px 12px #95ef4b33;
      }
    `}

  ${({ $extendBottom }) =>
    $extendBottom &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: ${TIMELINE_LINE_LEFT}px;
        top: 50%;
        width: ${TIMELINE_LINE_WIDTH}px;
        height: ${COLUMN_BRIDGE_LENGTH}px;
        transform: translateY(-1px);
        background: linear-gradient(
          to bottom,
          ${theme.colors.lime} 0%,
          #95ef4bcc 28%,
          #95ef4b66 60%,
          #95ef4b00 100%
        );
        box-shadow: 0 6px 12px #95ef4b33;
      }
    `}
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
  display: block;
  border-left: 1px solid ${theme.colors.gray[500]};
  word-break: keep-all;
  ${theme.typography.B3.Md};
  ${media.down(theme.breakPoints.mobile)} {
    font-size: 13px;
  }
`
