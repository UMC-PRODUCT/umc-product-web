/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import { addMonths, format, isSameDay, isWithinInterval, startOfDay } from 'date-fns'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import CalendarIcon from '@/shared/assets/icons/calendar.svg?react'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { RAW_EVENTS } from '@/shared/mocks/apply'
import { Flex } from '@/shared/ui/common/Flex'
import { getEventDateText, processEventsIntoSegments } from '@/shared/utils/calendar'

import * as S from './RecruitingCalendar.style'

import 'react-calendar/dist/Calendar.css'

export default function RecruitingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const allSegments = useMemo(() => processEventsIntoSegments(RAW_EVENTS), [])

  const [activeStartDate, setActiveStartDate] = useState<Date>(today)
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  // 선택된 날짜의 이벤트 필터링
  const selectedEvents = useMemo(() => {
    return allSegments
      .filter((seg) =>
        isWithinInterval(selectedDate, { start: seg.originalStart, end: seg.originalEnd }),
      )
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  }, [selectedDate, allSegments])

  // 월 이동 핸들러
  const handleMonth = (offset: number) => {
    setActiveStartDate((prev) => addMonths(prev, offset))
  }

  return (
    <Flex flexDirection="column" gap="24px">
      {/* 헤더 섹션 */}
      <S.Header flexDirection="row" justifyContent="space-between">
        <PageTitle title="모집 일정" />
        <S.DateNavigator width="fit-content">
          <Arrow css={{ transform: 'rotate(90deg)' }} onClick={() => handleMonth(-1)} />
          {format(activeStartDate, 'yyyy년 M월')}
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
          onActiveStartDateChange={({ activeStartDate: nextDate }) =>
            nextDate && setActiveStartDate(nextDate)
          }
          onChange={(val) => setSelectedDate(startOfDay(val as Date))}
          formatDay={(_, date) => format(date, 'd')}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null
            const segment = allSegments.find((seg) => isSameDay(seg.segmentStart, date))
            if (!segment) return null

            const isHighlighted = isWithinInterval(today, {
              start: segment.originalStart,
              end: segment.originalEnd,
            })

            return (
              <S.EventBarContainer>
                <S.EventBar
                  span={segment.span}
                  isHighlighted={isHighlighted}
                  isStart={segment.isStart}
                >
                  {segment.isStart && (
                    <span className="event-title">
                      {segment.title}
                      {!isSameDay(segment.originalStart, segment.originalEnd) &&
                        ` (${format(segment.originalStart, 'MM/dd')}~${format(segment.originalEnd, 'MM/dd')})`}
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
            isHighlighted={isWithinInterval(today, {
              start: event.originalStart,
              end: event.originalEnd,
            })}
          >
            <div className="icon">
              <CalendarIcon />
            </div>
            <S.EventInfo>
              <div className="title">{event.title}</div>
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
