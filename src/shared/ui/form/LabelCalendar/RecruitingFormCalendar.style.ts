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

  ${media.down(theme.breakPoints.mobile)} {
    div {
      gap: 8px;
    }
  }
`
const DateNavigator = styled(Flex)`
  ${theme.typography.B3.Sb}
  width: fit-content;
  color: ${theme.colors.white};
  gap: 16px;

  ${media.down(theme.breakPoints.mobile)} {
    ${theme.typography.B4.Sb}
    gap: 10px;
  }
`
const StyledCalendarWrapper = styled.div`
  width: 100%;

  .react-calendar {
    background: transparent;
    border: none;
    width: 100%;
    max-width: 100%;
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
    border: 1px solid ${theme.colors.gray[600]};
  }

  /* 날짜 타일 설정 */
  .react-calendar__tile {
    height: 48px;
    position: relative;
    border: none;
    outline: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: none !important;
    color: ${theme.colors.white};
    cursor: pointer;
    overflow: visible !important;
    z-index: auto;
    pointer-events: auto !important;
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
      border-top: 0.5px solid ${theme.colors.gray[600]};
      pointer-events: none;
      z-index: 1;
    }
    align-items: center;
  }

  ${media.down(theme.breakPoints.mobile)} {
    .react-calendar__tile {
      height: 38px;
      padding: 6px;
      ${theme.typography.B3.Md}
    }
  }

  .react-calendar__tile:has(.event-bar-container) {
    z-index: 100 !important;
  }

  .react-calendar__month-view__weekdays {
    color: ${theme.colors.white};
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile--now {
    background: none !important;
    color: ${theme.colors.lime} !important;
    abbr {
      background-color: transparent;
      font-weight: bold;
      width: 26px;
      height: 26px;
      ${media.down(theme.breakPoints.mobile)} {
        width: 20px;
        height: 20px;
      }
    }
  }

  /* 기본: 선택된 날짜는 하얀색 동그라미 */
  .react-calendar__tile--active {
    background: none !important;

    abbr {
      background-color: ${theme.colors.white} !important;
      color: ${theme.colors.black} !important;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      ${media.down(theme.breakPoints.mobile)} {
        width: 20px;
        height: 20px;
      }
    }
  }

  /* 오늘이면서 동시에 선택된 날 */
  .react-calendar__tile--now.react-calendar__tile--active {
    color: ${theme.colors.black} !important;

    abbr {
      background-color: ${theme.colors.lime} !important;
      color: ${theme.colors.black} !important;
      width: 26px;
      height: 26px;
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

export { DateNavigator, Header, StyledCalendarWrapper }
