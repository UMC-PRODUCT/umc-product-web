/** @jsxImportSource @emotion/react */
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './RecruitingFormCalendar.style'

import 'react-calendar/dist/Calendar.css'

type RecruitingCalendarProps = {
  value?: Date | null
  onChange?: (date: Date) => void
}

const toStartOfDay = (value: Date) => dayjs(value).startOf('day')

const RecruitingFormCalendar = ({ value, onChange }: RecruitingCalendarProps) => {
  const today = useMemo(() => toStartOfDay(new Date()).toDate(), [])

  const [activeStartDate, setActiveStartDate] = useState<Date>(() =>
    value ? toStartOfDay(value).toDate() : today,
  )
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    value ? toStartOfDay(value).toDate() : today,
  )
  const isValuePropProvided = value !== undefined
  const selectedValue = isValuePropProvided ? (value ?? null) : selectedDate

  const handleDateChange: ComponentProps<typeof Calendar>['onChange'] = (nextValue) => {
    const resolvedValue = Array.isArray(nextValue) ? nextValue[0] : nextValue
    if (!resolvedValue) return
    const normalizedValue = toStartOfDay(resolvedValue).toDate()
    if (!isValuePropProvided) {
      setSelectedDate(normalizedValue)
    }
    setActiveStartDate(normalizedValue)
    onChange?.(normalizedValue)
  }

  const handleActiveStartDateChange: ComponentProps<typeof Calendar>['onActiveStartDateChange'] = ({
    activeStartDate: nextDate,
  }) => {
    if (!nextDate) return
    setActiveStartDate(nextDate)
  }

  // 월 이동 핸들러
  const handleMonth = (offset: number) => {
    setActiveStartDate((prev) => dayjs(prev).add(offset, 'month').toDate())
  }

  return (
    <Flex flexDirection="column" gap="10px">
      {/* 헤더 섹션 */}
      <S.Header flexDirection="row" justifyContent="center" alignItems="center" width={'100%'}>
        <S.DateNavigator width="fit-content">
          <Arrow width={16} css={{ transform: 'rotate(90deg)' }} onClick={() => handleMonth(-1)} />
          {dayjs(activeStartDate).format('YYYY년 M월')}
          <Arrow width={16} css={{ transform: 'rotate(270deg)' }} onClick={() => handleMonth(1)} />
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
          nextLabel={null}
          value={selectedValue}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          onChange={handleDateChange}
          formatDay={(_: string | undefined, date: Date) => dayjs(date).format('D')}
        />
      </S.StyledCalendarWrapper>
    </Flex>
  )
}

export default RecruitingFormCalendar
