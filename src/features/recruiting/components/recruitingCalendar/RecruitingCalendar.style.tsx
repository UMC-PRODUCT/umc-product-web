import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

const Header = styled(Flex)`
  width: 100%;

  div {
    flex-wrap: nowrap;
    width: fit-content;
  }
`
const DateNavigator = styled(Flex)`
  ${theme.typography.B1.Sb}
  width: fit-content;
  color: ${theme.colors.white};
  gap: 16px;
`
const StyledCalendarWrapper = styled.div`
  width: 100%;

  .react-calendar {
    background: transparent;
    border: none;
    width: 100%;
    /* 달력 내부 컨테이너들의 쌓임 맥락을 해제하기 위해 설정 */
    overflow: visible;
  }

  .react-calendar__viewContainer {
    overflow: visible;
  }

  .react-calendar__month-view {
    overflow: visible;
  }

  .react-calendar__month-view > div {
    overflow: visible;
  }

  .react-calendar__month-view__days {
    overflow: visible !important;
    ${media.down(theme.breakPoints.tablet)} {
      border: 1px solid ${theme.colors.gray[600]};
    }
  }

  /* 날짜 타일 설정 */
  .react-calendar__tile {
    height: 150px;
    position: relative;
    border: none;
    outline: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: none !important;
    color: ${theme.colors.white};
    cursor: default;
    overflow: visible !important;
    z-index: auto;
    pointer-events: none;
    ${theme.typography.B1.Md}

    &:enabled:hover,
    &:enabled:focus,
    &--active {
      background: none !important;
    }

    /* 주말 색상 */
    &.react-calendar__month-view__days__day--weekend {
      color: ${theme.colors.gray[400]};
    }
    &:nth-of-type(7n) {
      color: ${theme.colors.gray[400]};
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 0.5px solid ${theme.colors.gray[600]};
      pointer-events: none;
      z-index: 1;
      ${media.down(theme.breakPoints.tablet)} {
        border: none;
      }
    }

    ${media.down(theme.breakPoints.desktop)} {
      height: 100px;
      align-items: center;
    }

    ${media.down(theme.breakPoints.tablet)} {
      height: 64px;
      align-items: center;
      pointer-events: auto;
    }
  }

  .react-calendar__tile:has(.event-bar-container) {
    z-index: 100 !important;
  }

  .react-calendar__tile--now {
    abbr {
      background-color: ${theme.colors.lime} !important;
      color: ${theme.colors.black} !important;
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
    ${media.down(theme.breakPoints.tablet)} {
      background: none !important;
      color: ${theme.colors.lime} !important;
      abbr {
        background-color: transparent;
        font-weight: bold;
        width: 26px;
        height: 26px;
      }
    }
  }

  /* 기본: 선택된 날짜는 하얀색 동그라미 */
  .react-calendar__tile--active {
    ${media.down(theme.breakPoints.tablet)} {
      background: none !important;

      abbr {
        background-color: ${theme.colors.white} !important;
        color: ${theme.colors.black} !important;
        border-radius: 50%;
        width: 26px;
        height: 26px;
      }
    }
  }

  /* 오늘이면서 동시에 선택된 날 */
  .react-calendar__tile--now.react-calendar__tile--active {
    abbr {
      background-color: ${theme.colors.lime} !important;
      color: ${theme.colors.black} !important;
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
    ${media.down(theme.breakPoints.tablet)} {
      color: ${theme.colors.black} !important;

      abbr {
        background-color: ${theme.colors.lime} !important;
        color: ${theme.colors.black} !important;
        width: 26px;
        height: 26px;
      }
    }
  }
  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    pointer-events: none;
    abbr {
      display: none;
    }
    div {
      display: none;
    }
  }

  .react-calendar__tile abbr {
    position: relative;
    z-index: 200;
  }
`

const EventBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 50;
`

const EventBar = styled.div<{ isHighlighted: boolean; isStart: boolean; span: number }>`
  position: absolute;
  top: 45px;
  left: 0;
  width: calc(${(props) => props.span} * 100% + (${(props) => props.span - 1} * 0.5px));
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 0 0 14px;
  ${theme.typography.B3.Md}
  white-space: nowrap;
  pointer-events: none;
  z-index: 150;
  background: linear-gradient(
    90deg,
    #2b2b2b 0%,
    rgba(43, 43, 43, 0.7) 80%,
    rgba(43, 43, 43, 0.4) 100%
  );
  color: ${(props) => (props.isHighlighted ? `${theme.colors.lime}` : `${theme.colors.white}`)};
  border-left: ${(props) =>
    props.isStart
      ? `4px solid ${props.isHighlighted ? `${theme.colors.lime}` : `${theme.colors.white}`}`
      : 'none'};
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.down(theme.breakPoints.tablet)} {
    height: 11px;
    pointer-events: auto;
    span {
      display: none;
    }
  }
  ${media.down(theme.breakPoints.desktop)} {
    ${theme.typography.B5.Md}
    padding: 0 0 0 5px;
  }
`

const EventItem = styled.div<{ isHighlighted?: boolean }>`
  display: none;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  gap: 12px;
  padding: 16px 22px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  ${media.down(theme.breakPoints.tablet)} {
    display: flex;
  }
  .icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    background-color: ${(props) => (props.isHighlighted ? theme.colors.lime : theme.colors.white)};
  }

  svg {
    width: 100%;
  }
`

const EventDot = styled.div<{ isHighlighted: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isHighlighted ? theme.colors.lime : theme.colors.gray[400]};
`

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .title {
    ${theme.typography.B3.Md}
    color: ${theme.colors.white};
  }
  .period {
    ${theme.typography.B5.Rg}
    color: ${theme.colors.gray[300]};
  }
`

const EmptyText = styled.div`
  ${theme.typography.B2.Md}
  color: ${theme.colors.gray[600]};
  padding: 20px 0;
  text-align: center;
`
export {
  DateNavigator,
  EmptyText,
  EventBar,
  EventBarContainer,
  EventDot,
  EventInfo,
  EventItem,
  Header,
  StyledCalendarWrapper,
}
