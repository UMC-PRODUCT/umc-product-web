import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

export const FirstColumn = styled.div<{ $indexLength: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 20px;
    bottom: 0px;
    width: 2px;
    height: ${(props) => (props.$indexLength === 7 ? `315px` : '270px')};
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;

    ${media.down(theme.breakPoints.tablet)} {
      height: ${(props) =>
        props.$indexLength === 7 ? `316px` : props.$indexLength === 6 ? '278px' : '270px'};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
    ${media.down(theme.breakPoints.mobile)} {
      height: ${(props) =>
        props.$indexLength === 7 ? `316px` : props.$indexLength === 6 ? '248.5px' : '250px'};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
  }
`

export const SecondColumn = styled.div<{ $lastIndex: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    bottom: 80px;
    width: 2px;
    height: ${(props) => (props.$lastIndex === 3 ? `170px` : '260px')};
    background: linear-gradient(
      to top,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;

    ${media.down(theme.breakPoints.tablet)} {
      height: ${(props) => (props.$lastIndex === 3 ? `170px` : '260px')};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
    ${media.down(theme.breakPoints.tablet)} {
      height: ${(props) => (props.$lastIndex === 3 ? `160px` : '260px')};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
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
