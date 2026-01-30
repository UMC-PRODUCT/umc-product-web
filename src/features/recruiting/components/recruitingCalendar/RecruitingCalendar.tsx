/** @jsxImportSource @emotion/react */
import type { ComponentProps } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import CalendarIcon from '@/shared/assets/icons/calendar.svg?react'
import type { RECRUITING_SCHEDULE_TYPE } from '@/shared/constants/umc'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import type { CalendarEvent } from '@/shared/types/calendar'
import { Flex } from '@/shared/ui/common/Flex'
import { getEventDateText } from '@/shared/utils/calendar'
import { transformRecruitingScheduleTypeKorean } from '@/shared/utils/transformKorean'

import * as S from './RecruitingCalendar.style'

dayjs.extend(isBetween)

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

type RecruitmentCalendarEvent = CalendarEvent & {
  extendedProps: {
    kind: string
    displayRange: string
  }
}

const RecruitingCalendar = ({ events }: RecruitingCalendarProps) => {
  const today = useMemo(() => toStartOfDay(new Date()).toDate(), [])
  const [activeStartDate, setActiveStartDate] = useState<Date>(today)
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const calendarRef = useRef<FullCalendar>(null)

  useEffect(() => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    const raf = requestAnimationFrame(() => {
      api.updateSize()
    })
    return () => cancelAnimationFrame(raf)
  }, [activeStartDate])

  const calendarEvents = useMemo<Array<RecruitmentCalendarEvent>>(
    () =>
      events.schedules.map((schedule, idx) => {
        const start = dayjs(schedule.startDate)
        const end = dayjs(schedule.endDate)
        const startDate = start.format('YYYY-MM-DD')
        const endDate = end.format('YYYY-MM-DD')
        const displayRange = start.isSame(end, 'day')
          ? ''
          : `(${start.format('MM/DD')}~${end.format('MM/DD')})`
        return {
          id: idx,
          title: schedule.type,
          startDate,
          endDate,
          extendedProps: {
            kind: schedule.kind,
            displayRange,
          },
        }
      }),
    [events],
  )

  const selectedEvents = useMemo(() => {
    return calendarEvents.filter((event) => {
      const start = dayjs(event.startDate)
      const end = dayjs(event.endDate)
      return dayjs(selectedDate).isBetween(start, end, 'day', '[]')
    })
  }, [calendarEvents, selectedDate])

  const handleDateClick: ComponentProps<typeof FullCalendar>['dateClick'] = ({ date }) => {
    setSelectedDate(toStartOfDay(date).toDate())
  }

  const handleDatesSet: ComponentProps<typeof FullCalendar>['datesSet'] = ({ view }) => {
    setActiveStartDate(dayjs(view.currentStart).toDate())
  }

  const handleMonth = (offset: number) => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    const nextDate = dayjs(activeStartDate).add(offset, 'month').toDate()
    api.gotoDate(nextDate)
  }

  return (
    <Flex flexDirection="column" gap="24px">
      <S.Header flexDirection="row" justifyContent="space-between">
        <PageTitle title="모집 일정" />
        <S.DateNavigator width="fit-content">
          <Arrow
            color="white"
            css={{ transform: 'rotate(90deg)' }}
            onClick={() => handleMonth(-1)}
          />
          {dayjs(activeStartDate).format('YYYY년 M월')}
          <Arrow
            color="white"
            css={{ transform: 'rotate(270deg)' }}
            onClick={() => handleMonth(1)}
          />
        </S.DateNavigator>
      </S.Header>

      <S.StyledCalendarWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          locale="ko"
          firstDay={0}
          height="auto"
          headerToolbar={false}
          events={calendarEvents.map((event) => ({
            id: String(event.id),
            title: event.title,
            start: event.startDate,
            end: dayjs(event.endDate).add(1, 'day').format('YYYY-MM-DD'),
            extendedProps: event.extendedProps,
          }))}
          dateClick={handleDateClick}
          datesSet={handleDatesSet}
          eventContent={(eventInfo) => {
            const start = eventInfo.event.start
            const end = eventInfo.event.end
            const isHighlighted =
              !!start &&
              dayjs(today).isBetween(
                dayjs(start),
                dayjs(end ?? start).subtract(1, 'day'),
                'day',
                '[]',
              )

            return (
              <S.EventBar $isHighlighted={isHighlighted}>
                <span className="event-title">
                  {transformRecruitingScheduleTypeKorean(
                    eventInfo.event.title as RECRUITING_SCHEDULE_TYPE,
                  )}
                </span>
                {eventInfo.event.extendedProps.displayRange ? (
                  <span className="event-range">{eventInfo.event.extendedProps.displayRange}</span>
                ) : null}
              </S.EventBar>
            )
          }}
          // 날짜 칸 렌더링 커스텀 (선택된 날짜 표시)
          dayCellContent={(args) => {
            return args.dayNumberText.replace('일', '')
          }}
          dayHeaderContent={(args) => {
            // 요일 이름만 깔끔하게 반환 (일, 월, 화...)
            return args.text.replace('요일', '')
          }}
          dayCellClassNames={({ date }) => {
            const isSelected = dayjs(date).isSame(selectedDate, 'day')
            return isSelected ? ['fc-selected-day'] : []
          }}
        />
      </S.StyledCalendarWrapper>

      <Flex flexDirection="column" gap="12px">
        {selectedEvents.map((event) => {
          const isTodayActive = dayjs(today).isBetween(
            dayjs(event.startDate),
            dayjs(event.endDate),
            'day',
            '[]',
          )

          return (
            <S.EventItem key={event.id} $isTodayActive={isTodayActive}>
              <div className="icon">
                <CalendarIcon />
              </div>
              <S.EventInfo $isTodayActive={isTodayActive}>
                <div className="title">
                  {transformRecruitingScheduleTypeKorean(event.title as RECRUITING_SCHEDULE_TYPE)}
                </div>
                <div className="period">
                  {getEventDateText(dayjs(event.startDate).toDate(), dayjs(event.endDate).toDate())}
                </div>
              </S.EventInfo>
            </S.EventItem>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default RecruitingCalendar
