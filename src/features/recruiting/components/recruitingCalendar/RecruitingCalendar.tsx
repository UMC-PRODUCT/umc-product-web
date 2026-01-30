/** @jsxImportSource @emotion/react */
import type { ComponentProps, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import CalendarIcon from '@/shared/assets/icons/calendar.svg?react'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import { getEventDateText, processEventsIntoSegments } from '@/shared/utils/calendar'
import { transformRecruitingScheduleTypeKorean } from '@/shared/utils/transformKorean'

import type { RECRUITING_SCHEDULE_TYPE } from '../../domain'
import * as S from './RecruitingCalendar.style'

import 'react-calendar/dist/Calendar.css'

type RecruitingCalendarProps = {
  events: {
    recruitmentId: string
    schedules: Array<{
      type: RECRUITING_SCHEDULE_TYPE
      kind: string
      startDate: string
      endDate: string
    }>
  }
}

const toStartOfDay = (value: Date) => dayjs(value).startOf('day')

const isSameDay = (left: Date, right: Date) => dayjs(left).isSame(right, 'day')

const isWithinRange = (target: Date, start: Date, end: Date) => {
  const time = toStartOfDay(target).valueOf()
  return time >= toStartOfDay(start).valueOf() && time <= toStartOfDay(end).valueOf()
}

const RecruitingCalendar = ({ events }: RecruitingCalendarProps) => {
  const today = useMemo(() => toStartOfDay(new Date()).toDate(), [])
  const allSegments = useMemo(() => processEventsIntoSegments(events.schedules), [events])

  const [activeStartDate, setActiveStartDate] = useState<Date>(today)
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const handleDateChange: ComponentProps<typeof Calendar>['onChange'] = (value) => {
    const nextValue = Array.isArray(value) ? value[0] : value
    if (!nextValue) return
    setSelectedDate(toStartOfDay(nextValue).toDate())
  }

  const handleActiveStartDateChange: ComponentProps<typeof Calendar>['onActiveStartDateChange'] = ({
    activeStartDate: nextDate,
  }) => {
    if (!nextDate) return
    setActiveStartDate(nextDate)
  }

  // 선택된 날짜의 이벤트 필터링
  const selectedEvents = useMemo(() => {
    return allSegments
      .filter((seg) => isWithinRange(selectedDate, seg.originalStart, seg.originalEnd))
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  }, [selectedDate, allSegments])

  // 월 이동 핸들러
  const handleMonth = (offset: number) => {
    setActiveStartDate((prev) => dayjs(prev).add(offset, 'month').toDate())
  }

  return (
    <Flex flexDirection="column" gap="24px">
      {/* 헤더 섹션 */}
      <S.Header flexDirection="row" justifyContent="space-between">
        <PageTitle title="모집 일정" />
        <S.DateNavigator width="fit-content">
          <Arrow css={{ transform: 'rotate(90deg)' }} onClick={() => handleMonth(-1)} />
          {dayjs(activeStartDate).format('YYYY년 M월')}
          <Arrow css={{ transform: 'rotate(270deg)' }} onClick={() => handleMonth(1)} />
        </S.DateNavigator>
      </S.Header>

      {/* 캘린더 섹션 */}
      <S.StyledCalendarWrapper>
        <Calendar
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
          prevLabel={null}
          nextLabel={null} // 네비게이션 숨김
          value={selectedDate}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          onChange={handleDateChange}
          formatDay={(_: string | undefined, date: Date) => dayjs(date).format('D')}
          tileContent={({
            date,
            view,
          }: {
            date: Date
            view: 'month' | 'year' | 'decade' | 'century'
          }): ReactNode => {
            if (view !== 'month') return null
            const segment = allSegments.find((seg) => isSameDay(seg.segmentStart, date))
            if (!segment) return null

            const isHighlighted = isWithinRange(today, segment.originalStart, segment.originalEnd)
            const titleKorean = transformRecruitingScheduleTypeKorean(segment.title)
            return (
              <S.EventBarContainer>
                <S.EventBar
                  $span={segment.span}
                  $isHighlighted={isHighlighted}
                  $isStart={segment.isStart}
                >
                  {segment.isStart && (
                    <span className="event-title">
                      {titleKorean}
                      {!isSameDay(segment.originalStart, segment.originalEnd) &&
                        ` (${dayjs(segment.originalStart).format('MM/DD')}~${dayjs(
                          segment.originalEnd,
                        ).format('MM/DD')})`}
                    </span>
                  )}
                </S.EventBar>
              </S.EventBarContainer>
            )
          }}
        />
      </S.StyledCalendarWrapper>

      {/* 하단 리스트 섹션 */}
      <Flex flexDirection="column" gap="12px">
        {selectedEvents.map((event) => (
          <S.EventItem
            key={event.id}
            $isHighlighted={isWithinRange(today, event.originalStart, event.originalEnd)}
          >
            <div className="icon">
              <CalendarIcon />
            </div>
            <S.EventInfo>
              <div className="title">{transformRecruitingScheduleTypeKorean(event.title)}</div>
              <div className="period">
                {getEventDateText(event.originalStart, event.originalEnd)}
              </div>
            </S.EventInfo>
          </S.EventItem>
        ))}
      </Flex>
    </Flex>
  )
}

export default RecruitingCalendar
