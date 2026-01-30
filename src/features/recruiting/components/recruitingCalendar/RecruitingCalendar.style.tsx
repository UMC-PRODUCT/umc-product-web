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

  .fc {
    --fc-border-color: ${theme.colors.gray[800]};
    --fc-daygrid-event-dot-width: 0px; /* 기본 점 숨김 */
  }

  /* 전체 배경 및 테두리 초기화 */
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }

  .fc-theme-standard th,
  .fc-theme-standard td {
    background: transparent;
  }

  .fc-scrollgrid-section-header,
  .fc-scrollgrid-section-header td,
  .fc-scrollgrid-section-header th {
    background: transparent !important;
  }

  .fc-theme-standard td {
    border: 1px solid ${theme.colors.gray[600]};
  }

  /* 요일 헤더 영역 (일~토) */
  .fc-col-header {
    background-color: transparent;
  }

  .fc-col-header-cell {
    border: none !important; /* 헤더 사이의 세로선 제거 */
    background: transparent !important; /* 하얀 배경 제거 */
    padding: 12px 0;
    border-bottom: 1px solid ${theme.colors.gray[800]};

    .fc-col-header-cell-cushion {
      ${theme.typography.B3.Md}
      color: ${theme.colors.white} !important;
      text-decoration: none;
    }
  }

  .fc-col-header-cell.fc-day-sun .fc-col-header-cell-cushion,
  .fc-col-header-cell.fc-day-sat .fc-col-header-cell-cushion {
    color: ${theme.colors.gray[400]} !important;
  }

  .fc-day-other {
    .fc-daygrid-day-top,
    .fc-daygrid-day-events,
    .fc-daygrid-day-bg {
      visibility: hidden; /* 영역은 유지하되 내용을 숨김 */
      margin-top: 3px;
    }
  }

  /* 날짜 칸(Tile) 스타일 */
  .fc-daygrid-day {
    min-height: 150px !important;
    height: 150px;
    max-height: 150px;
    background-color: ${theme.colors.black};
  }

  /* 날짜 숫자 위치 및 스타일 */
  .fc-daygrid-day-top {
    border-top: none;
    flex-direction: row-reverse; /* 숫자를 오른쪽으로 정렬 */
    padding: 12px 14px 0 0; /* 우측 상단 여백 */
  }

  .fc-daygrid-day-number {
    ${theme.typography.B1.Md}
    color: ${theme.colors.white};
    text-decoration: none;
  }

  .fc-day-sun .fc-daygrid-day-number,
  .fc-day-sat .fc-daygrid-day-number {
    color: ${theme.colors.gray[400]};
  }

  /* 오늘 날짜 표시 */
  .fc-day-today {
    background-color: transparent !important;
    .fc-daygrid-day-number {
      background: ${theme.colors.lime};
      color: ${theme.colors.black};
      border-radius: 50%;
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* 이벤트 바(Event Bar) 컨테이너 스타일 */
  .fc-event-track {
    margin-bottom: 4px;
  }

  .fc-daygrid-event-harness {
    margin-bottom: 4px !important; /* 이벤트 바 사이 간격 */
  }

  .fc-daygrid-event {
    border: none !important;
    border-radius: 0 4px 4px 0; /* 왼쪽은 보더를 위해 각지게 */
    margin: 0 4px 0 0 !important;
    cursor: pointer;
    background: linear-gradient(
      90deg,
      #2b2b2b 0%,
      rgba(43, 43, 43, 0.7) 80%,
      rgba(43, 43, 43, 0.4) 100%
    ) !important;
  }

  .fc-daygrid-day-frame & .fc-scrollgrid-sync-inner {
    width: 150px !important;
    height: 150px !important;
    min-height: 150px !important;
  }

  .fc-event {
    margin-right: 0 !important;
    margin-bottom: 10px !important;
  }

  /* 모바일 대응 */
  ${media.down(theme.breakPoints.tablet)} {
    border: 1px solid ${theme.colors.gray[600]};
    height: auto;
    .fc-daygrid-day {
      min-height: 80px !important;
    }
    .event-title,
    .event-range {
      display: none; /* 모바일은 바만 표시 (디자인 시안 참고) */
    }
    .fc-daygrid-day {
      min-height: 64px !important;
      height: 64px;
      max-height: 64px;
      background-color: ${theme.colors.black};
    }
    .fc-daygrid-day-top {
      border-top: none;
      text-align: center;
    }
    .fc-theme-standard td {
      border: 1px solid ${theme.colors.gray[600]};
      border-left: none;
      border-right: none;
    }
  }
`

const EventBar = styled.div<{ $isHighlighted: boolean }>`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-left: 3px solid
    ${(props) => (props.$isHighlighted ? theme.colors.lime : theme.colors.white)};

  .event-title {
    ${(props) => (props.$isHighlighted ? theme.typography.B3.Sb : theme.typography.B3.Md)}
    color: ${(props) => (props.$isHighlighted ? theme.colors.lime : theme.colors.white)};
    white-space: nowrap;
  }

  .event-range {
    font-size: 11px;
    ${(props) => (props.$isHighlighted ? theme.typography.B3.Sb : theme.typography.B3.Md)}
    color: ${(props) => (props.$isHighlighted ? theme.colors.lime : theme.colors.white)};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  ${media.down(theme.breakPoints.tablet)} {
    height: 11px;
    padding: 0;
  }
`
const EventItem = styled.div<{ $isHighlighted?: boolean }>`
  display: none;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  gap: 12px;
  padding: 16px 22px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  ${media.down(theme.breakPoints.tablet)} {
    display: flex;
  }
  .icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    background-color: ${(props) => (props.$isHighlighted ? theme.colors.lime : theme.colors.white)};
  }

  svg {
    width: 100%;
  }
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
    ${theme.typography.B3.Md}
    color: ${theme.colors.gray[400]};
  }
`

export { DateNavigator, EventBar, EventInfo, EventItem, Header, StyledCalendarWrapper }
