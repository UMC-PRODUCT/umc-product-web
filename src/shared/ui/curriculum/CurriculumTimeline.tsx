import type { Dispatch, SetStateAction } from 'react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import type { Workbook } from '@/features/management/domain/model'
import { useGetCurriculums } from '@/features/management/hooks/useManagementQueries'
import { CURRICULUM_MOCK } from '@/features/management/mocks/managementMocks'

import * as S from './CurriculumTimeline.style'

type Props = {
  activeTab: PartType
}

type LinePosition = {
  top: number
  bottom: number
  show: boolean
}

const INITIAL_LINE_POSITION: LinePosition = {
  top: 0,
  bottom: 0,
  show: false,
}

const getLinePosition = (column: HTMLDivElement | null): LinePosition => {
  if (!column) return INITIAL_LINE_POSITION

  const dots = column.querySelectorAll<HTMLElement>('[data-curriculum-dot="true"]')
  if (dots.length < 2) return INITIAL_LINE_POSITION

  const firstDot = dots[0]
  const lastDot = dots[dots.length - 1]

  const top = Math.round(firstDot.offsetTop + firstDot.offsetHeight / 2)
  const bottom = Math.round(column.offsetHeight - (lastDot.offsetTop + lastDot.offsetHeight / 2))

  return {
    top,
    bottom,
    show: true,
  }
}

export const CurriculumTimeline = ({ activeTab }: Props) => {
  const firstColumnRef = useRef<HTMLDivElement | null>(null)
  const secondColumnRef = useRef<HTMLDivElement | null>(null)
  const mobileColumnRef = useRef<HTMLDivElement | null>(null)
  const [firstLinePosition, setFirstLinePosition] = useState<LinePosition>(INITIAL_LINE_POSITION)
  const [secondLinePosition, setSecondLinePosition] = useState<LinePosition>(INITIAL_LINE_POSITION)
  const [mobileLinePosition, setMobileLinePosition] = useState<LinePosition>(INITIAL_LINE_POSITION)

  const { data } = useGetCurriculums(activeTab)
  const apiWorkbooksCandidate = (data as { result?: { workbooks?: unknown } }).result?.workbooks
  const apiWorkbooks = Array.isArray(apiWorkbooksCandidate)
    ? (apiWorkbooksCandidate as Array<Workbook>)
    : []
  const currentData = apiWorkbooks.length > 0 ? apiWorkbooks : CURRICULUM_MOCK[activeTab]
  const getWeekLabel = (weekNo: string | null | undefined) => {
    const parsed = Number(weekNo)
    return Number.isFinite(parsed) ? parsed.toString().padStart(2, '0') : '--'
  }

  const sortedWeeks = useMemo(
    () => [...currentData].sort((a, b) => Number(a.weekNo) - Number(b.weekNo)),
    [currentData],
  )
  const firstColWeeks = sortedWeeks.filter((item) => Number(item.weekNo) <= 6)
  const secondColWeeks = sortedWeeks.filter((item) => Number(item.weekNo) >= 7)

  useLayoutEffect(() => {
    const setIfChanged = (setter: Dispatch<SetStateAction<LinePosition>>, next: LinePosition) => {
      setter((prev) =>
        prev.top === next.top && prev.bottom === next.bottom && prev.show === next.show
          ? prev
          : next,
      )
    }

    const updateLinePosition = () => {
      setIfChanged(setFirstLinePosition, getLinePosition(firstColumnRef.current))
      setIfChanged(setSecondLinePosition, getLinePosition(secondColumnRef.current))
      setIfChanged(setMobileLinePosition, getLinePosition(mobileColumnRef.current))
    }

    updateLinePosition()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(updateLinePosition)
    if (firstColumnRef.current) observer.observe(firstColumnRef.current)
    if (secondColumnRef.current) observer.observe(secondColumnRef.current)
    if (mobileColumnRef.current) observer.observe(mobileColumnRef.current)

    return () => observer.disconnect()
  }, [firstColWeeks.length, secondColWeeks.length, sortedWeeks.length])

  return (
    <>
      <S.TimelineGrid>
        <S.FirstColumn
          ref={firstColumnRef}
          $showLine={firstLinePosition.show}
          $lineTop={firstLinePosition.top}
          $lineBottom={firstLinePosition.bottom}
        >
          {firstColWeeks.map((item, index) => (
            <S.WeekRow key={`${item.id}-${index}`}>
              <S.Dot data-curriculum-dot="true" />
              <S.WeekLabel>{getWeekLabel(item.weekNo)}주차</S.WeekLabel>
              <S.ContentLabel>{item.title || '-'}</S.ContentLabel>
            </S.WeekRow>
          ))}
        </S.FirstColumn>

        <S.SecondColumn
          ref={secondColumnRef}
          $showLine={secondLinePosition.show}
          $lineTop={secondLinePosition.top}
          $lineBottom={secondLinePosition.bottom}
        >
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
        <S.MobileColumn
          ref={mobileColumnRef}
          $showLine={mobileLinePosition.show}
          $lineTop={mobileLinePosition.top}
          $lineBottom={mobileLinePosition.bottom}
        >
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
