import type { PartType } from '@/features/auth/domain'
import { useGetCurriculums } from '@/features/management/hooks/getManagementQueries'

import * as S from './CurriculumTimeline.style'

type Props = {
  activeTab: PartType
}

export const CurriculumTimeline = ({ activeTab }: Props) => {
  const { data } = useGetCurriculums(activeTab)
  const currentData = data.result.workbooks

  const firstColWeeks = currentData.filter((item) => Number(item.weekNo) <= 6)
  const secondColWeeks = currentData.filter((item) => Number(item.weekNo) >= 7)

  const secondLastIndex = secondColWeeks.length > 0 ? secondColWeeks.length - 1 : -1
  const lenFirstColumn = firstColWeeks.length

  return (
    <S.TimelineGrid>
      <S.FirstColumn $indexLength={lenFirstColumn}>
        {firstColWeeks.map((item) => (
          <S.WeekRow key={item.weekNo}>
            <S.Dot />
            <S.WeekLabel>{item.weekNo.toString().padStart(2, '0')}주차</S.WeekLabel>
            <S.ContentLabel>{item.title}</S.ContentLabel>
          </S.WeekRow>
        ))}
      </S.FirstColumn>

      <S.SecondColumn $lastIndex={secondLastIndex}>
        {secondColWeeks.map((item) => (
          <S.WeekRow key={item.weekNo}>
            <S.Dot />
            <S.WeekLabel>{item.weekNo.toString().padStart(2, '0')}주차</S.WeekLabel>
            <S.ContentLabel>{item.title}</S.ContentLabel>
          </S.WeekRow>
        ))}
      </S.SecondColumn>
    </S.TimelineGrid>
  )
}
