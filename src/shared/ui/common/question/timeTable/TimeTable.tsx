/** @jsxImportSource @emotion/react */
import type { ForwardedRef } from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import type { QuestionMode } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'

import {
  buildDisabledIndexMap,
  buildTimeLabels,
  formatDateLabel,
  getDayLabel,
} from './TimeTable.helpers'
import * as S from './TimeTable.style'
import { useTimeTableSelection } from './useTimeTableSelection'

interface ScheduleSelectorProps {
  dates: Array<string>
  timeRange: [string, string] // 예: ['16:30', '22:00']
  disabledSlots?: Partial<Record<string, Array<string>>>
  value?: Partial<Record<string, Array<string>>>
  onChange?: (selected: Record<string, Array<string>>) => void
  mode: QuestionMode
}

const TimeTableComponent = (
  { dates, timeRange, disabledSlots = {}, value = {}, onChange, mode }: ScheduleSelectorProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const isEditable = mode === 'edit'
  const mainAreaRef = useRef<HTMLDivElement>(null)
  const [showScrollShadow, setShowScrollShadow] = useState(true)
  const {
    map: disabledIdxMap,
    totalSlots,
    visualStartMin,
    visualEndMin,
  } = useMemo(
    () => buildDisabledIndexMap({ dates, disabledSlots, timeRange }),
    [dates, disabledSlots, timeRange],
  )
  const dateCount = dates.length
  const timeRangeStart = timeRange[0]
  const timeRangeEnd = timeRange[1]

  // 시간 라벨: 무조건 1시간 단위로만 생성
  const timeLabels = useMemo(
    () => buildTimeLabels({ visualStartMin, visualEndMin }),
    [visualStartMin, visualEndMin],
  )
  const { selectedIndices, handleHeaderClick, handleMouseDown, handleMouseEnter, handleStopDrag } =
    useTimeTableSelection({
      dates,
      value,
      totalSlots,
      visualStartMin,
      disabledIdxMap,
      onChange,
    })

  useEffect(() => {
    const el = mainAreaRef.current
    if (!el) return

    const updateShadow = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth
      const canScroll = maxScrollLeft > 1
      const atEnd = maxScrollLeft <= 1 || el.scrollLeft >= maxScrollLeft - 1
      setShowScrollShadow(canScroll && !atEnd)
    }

    updateShadow()
    el.addEventListener('scroll', updateShadow)
    window.addEventListener('resize', updateShadow)

    return () => {
      el.removeEventListener('scroll', updateShadow)
      window.removeEventListener('resize', updateShadow)
    }
  }, [dateCount, totalSlots, timeRangeStart, timeRangeEnd])

  return (
    <S.Container
      ref={ref}
      onMouseUp={isEditable ? handleStopDrag : undefined}
      onMouseLeave={isEditable ? handleStopDrag : undefined}
    >
      <S.TableWrapper>
        <S.TimeLabelsColumn>
          {timeLabels.map((item, i) => (
            <S.TimeLabel key={i} $top={item.top}>
              {item.text}
            </S.TimeLabel>
          ))}
        </S.TimeLabelsColumn>
        <S.MainAreaWrapper>
          <S.MainArea ref={mainAreaRef}>
            <S.HeaderRow $cols={dates.length}>
              {dates.map((d) => {
                const selectedForDate = selectedIndices[d] ?? new Set<number>()
                const disabledForDate = disabledIdxMap[d] ?? new Set<number>()
                const availableCount = totalSlots - disabledForDate.size
                return (
                  <S.HeaderCell
                    key={d}
                    onClick={isEditable ? () => handleHeaderClick(d) : undefined}
                    $isAllSelected={
                      selectedForDate.size > 0 && selectedForDate.size === availableCount
                    }
                    $isInteractive={isEditable}
                  >
                    <Badge
                      typo="C5.Md"
                      tone={selectedForDate.size === availableCount ? 'white' : 'gray'}
                      variant={selectedForDate.size === availableCount ? 'solid' : 'outline'}
                    >
                      {`${formatDateLabel(d)} ${getDayLabel(d)}`}
                    </Badge>
                  </S.HeaderCell>
                )
              })}
            </S.HeaderRow>
            <S.GridBody $cols={dates.length}>
              {Array.from({ length: totalSlots }).map((_, idx) =>
                dates.map((date) => {
                  const selectedForDate = selectedIndices[date] ?? new Set<number>()
                  const disabledForDate = disabledIdxMap[date] ?? new Set<number>()
                  return (
                    <S.SlotCell
                      key={`${date}-${idx}`}
                      $isSelected={selectedForDate.has(idx)}
                      $isDisabled={disabledForDate.has(idx)}
                      $isHourBoundary={(visualStartMin + (idx + 1) * 30) % 60 === 0}
                      $isInteractive={isEditable}
                      onMouseDown={isEditable ? () => handleMouseDown(date, idx) : undefined}
                      onMouseEnter={isEditable ? () => handleMouseEnter(date, idx) : undefined}
                    />
                  )
                }),
              )}
            </S.GridBody>
          </S.MainArea>
          {showScrollShadow ? <S.ScrollShadow /> : null}
        </S.MainAreaWrapper>
      </S.TableWrapper>
    </S.Container>
  )
}

export const TimeTable = forwardRef<HTMLDivElement, ScheduleSelectorProps>(TimeTableComponent)
TimeTable.displayName = 'TimeTable'
