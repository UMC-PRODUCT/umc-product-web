import { useCallback, useEffect, useRef, useState } from 'react'

import type { ScheduleSummary as ScheduleSummaryType } from '@/features/school/domain'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import InterviewInfo from './InterviewInfo/InterviewInfo'
import * as S from './ScheduleSummary.style'

const formatDateDots = (value: string) => value.replace(/-/g, '.')
const formatDday = (dDay: string) => {
  const numericDay = Number(dDay)
  if (Number.isNaN(numericDay)) return `D-${dDay}`
  if (numericDay < 0) return `D+${Math.abs(numericDay)}`
  return `D-${numericDay}`
}

const ScheduleSummary = ({ scheduleSummary }: { scheduleSummary: ScheduleSummaryType }) => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [showBlur, setShowBlur] = useState(true)

  const updateBlur = useCallback((element?: HTMLDivElement | null) => {
    const el = element ?? gridRef.current
    if (!el) return
    const hasOverflow = el.scrollHeight > el.clientHeight + 1
    const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
    setShowBlur(hasOverflow && !atEnd)
  }, [])

  const setGridRef = useCallback(
    (node: HTMLDivElement | null) => {
      gridRef.current = node
      if (node) {
        updateBlur(node)
      }
    },
    [updateBlur],
  )

  const handleScroll = useCallback(() => updateBlur(), [updateBlur])

  useEffect(() => {
    const handleResize = () => updateBlur()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateBlur])

  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="일정 요약" />
      <Section variant="outline" padding={16}>
        <S.GridSection>
          <Section variant="solid" alignItems="flex-start" gap={20}>
            <S.ScheduleTitle>{scheduleSummary.phaseTitle}</S.ScheduleTitle>
            <Flex gap={9} flexDirection="column" alignItems="flex-start">
              <S.ScheduleCount>{formatDday(scheduleSummary.dDay)}</S.ScheduleCount>
              <S.ScheduleInfo>{`${formatDateDots(scheduleSummary.dateRange.start)} ~ ${formatDateDots(scheduleSummary.dateRange.end)}`}</S.ScheduleInfo>
            </Flex>
          </Section>
          <Section variant="solid" alignItems="flex-start" gap={18} css={{ position: 'relative' }}>
            <S.InterviewTitle>오늘 면접 예정자</S.InterviewTitle>
            <S.Grid
              empty={scheduleSummary.todayInterviews.length === 0}
              notProgress={scheduleSummary.todayInterviews.length === 0}
              ref={setGridRef}
              onScroll={handleScroll}
            >
              {showBlur && scheduleSummary.todayInterviews.length !== 0 ? <S.Blur /> : null}
              {scheduleSummary.todayInterviews.length !== 0 ? (
                scheduleSummary.todayInterviews.map((interview, index) => (
                  <InterviewInfo
                    key={index}
                    time={interview.interviewTime}
                    name={interview.name}
                    nickname={interview.nickName}
                  />
                ))
              ) : (
                <div className="not-progress">면접 진행 기간이 아닙니다.</div>
              )}
            </S.Grid>
          </Section>
        </S.GridSection>
      </Section>
    </Flex>
  )
}
export default ScheduleSummary
