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

  return (
    <>
      <S.TimelineGrid>
        <S.FirstColumn>
          {firstColWeeks.map((item, index) => (
            <S.WeekRow key={`${item.id}-${index}`}>
              <S.Dot data-curriculum-dot="true" />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.FirstColumn>

        <S.SecondColumn>
          {secondColWeeks.map((item, index) => (
            <S.WeekRow key={`${item.id}-${index}`}>
              <S.Dot data-curriculum-dot="true" />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.SecondColumn>
      </S.TimelineGrid>
      <S.MobileTimeline>
        <S.MobileColumn>
          {sortedWeeks.map((item, index) => (
            <S.WeekRow key={`${item.id}-${index}`}>
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
