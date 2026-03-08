import { useMemo } from 'react'

import * as S from './CurriculumTimeline.style'

type Props = {
  workbooks?: Array<{
    id: string
    weekNo: string
    title: string
  }>
}

export const CurriculumTimeline = ({ workbooks = [] }: Props) => {
  const getWeekLabel = (weekNo: string | null | undefined) => {
    const parsed = Number(weekNo)
    return Number.isFinite(parsed) ? parsed.toString().padStart(2, '0') : '--'
  }

  const sortedWeeks = useMemo(
    () => [...workbooks].sort((a, b) => Number(a.weekNo) - Number(b.weekNo)),
    [workbooks],
  )
  const firstColWeeks = sortedWeeks.filter((item) => Number(item.weekNo) <= 6)
  const secondColWeeks = sortedWeeks.filter((item) => Number(item.weekNo) >= 7)
  const hasColumnBridge = firstColWeeks.length > 0 && secondColWeeks.length > 0

  return (
    <>
      <S.TimelineGrid>
        <S.FirstColumn>
          {firstColWeeks.map((item, index) => (
            <S.WeekRow
              key={`${item.id}-${index}`}
              $connectToNext={index < firstColWeeks.length - 1}
            >
              <S.Dot
                data-curriculum-dot="true"
                $extendBottom={hasColumnBridge && index === firstColWeeks.length - 1}
              />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.FirstColumn>

        <S.SecondColumn>
          {secondColWeeks.map((item, index) => (
            <S.WeekRow
              key={`${item.id}-${index}`}
              $connectToNext={index < secondColWeeks.length - 1}
            >
              <S.Dot data-curriculum-dot="true" $extendTop={hasColumnBridge && index === 0} />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.SecondColumn>
      </S.TimelineGrid>
      <S.MobileTimeline>
        <S.MobileColumn>
          {sortedWeeks.map((item, index) => (
            <S.WeekRow key={`${item.id}-${index}`} $connectToNext={index < sortedWeeks.length - 1}>
              <S.Dot data-curriculum-dot="true" />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.MobileColumn>
      </S.MobileTimeline>
    </>
  )
}
