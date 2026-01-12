/** @jsxImportSource @emotion/react */
import type { ForwardedRef } from 'react'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'

import type { QuestionMode } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'

import * as S from './TimeTable.style'

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
  const [isDragging, setIsDragging] = useState(false)
  const [dragMode, setDragMode] = useState(true)

  const timeToMinutes = useCallback((time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  }, [])

  // --- 보정 로직 시작 ---
  const actualStartMin = useMemo(() => timeToMinutes(timeRange[0]), [timeRange, timeToMinutes])
  const actualEndMin = useMemo(() => timeToMinutes(timeRange[1]), [timeRange, timeToMinutes])

  // 시각적 시작점: 16:30 -> 16:00 (정각으로 내림)
  const visualStartMin = useMemo(() => Math.floor(actualStartMin / 60) * 60, [actualStartMin])
  // 시각적 종료점: 21:15 -> 22:00 (정각으로 올림)
  const visualEndMin = useMemo(() => Math.ceil(actualEndMin / 60) * 60, [actualEndMin])

  const totalSlots = useMemo(
    () => Math.floor((visualEndMin - visualStartMin) / 30),
    [visualStartMin, visualEndMin],
  )
  // --- 보정 로직 끝 ---

  const [selectedIndices, setSelectedIndices] = useState<Record<string, Set<number>>>(() =>
    Object.fromEntries(dates.map((d) => [d, new Set<number>()])),
  )

  const indexToTime = useCallback(
    (idx: number) => {
      const totalMin = visualStartMin + idx * 30
      const h = Math.floor(totalMin / 60)
      const m = totalMin % 60
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    },
    [visualStartMin],
  )

  const timeToIndex = useCallback(
    (time: string) => {
      const currentMin = timeToMinutes(time)
      return Math.floor((currentMin - visualStartMin) / 30)
    },
    [visualStartMin, timeToMinutes],
  )

  // 비활성화 맵 계산 (사용자 설정 + 실제 시간 범위 밖 자동 처리)
  const disabledIdxMap = useMemo(() => {
    return Object.fromEntries(
      dates.map((d) => {
        const set = new Set<number>()
        // 1. 사용자 지정 비활성화 시간 추가
        const disabledForDate = disabledSlots[d] ?? []
        disabledForDate.forEach((t) => set.add(timeToIndex(t)))

        // 2. 실제 시간 범위(actualStartMin ~ actualEndMin) 밖의 칸 자동 비활성화
        for (let i = 0; i < totalSlots; i++) {
          const currentSlotMin = visualStartMin + i * 30
          if (currentSlotMin < actualStartMin || currentSlotMin >= actualEndMin) {
            set.add(i)
          }
        }
        return [d, set]
      }),
    )
  }, [dates, disabledSlots, timeToIndex, totalSlots, visualStartMin, actualStartMin, actualEndMin])

  const derivedSelected = useMemo(() => {
    const nextState: Record<string, Set<number>> = {}
    dates.forEach((date) => {
      const times = value[date] ?? []
      nextState[date] = new Set(
        times.map(timeToIndex).filter((idx) => idx >= 0 && idx < totalSlots),
      )
    })
    return nextState
  }, [value, dates, timeToIndex, totalSlots])

  const isSameSelection = (
    a: Record<string, Set<number>>,
    b: Record<string, Set<number>>,
  ): boolean => {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false
      const setA = a[key]
      const setB = b[key]
      if (setA.size !== setB.size) return false
      for (const val of setA) {
        if (!setB.has(val)) return false
      }
      return true
    })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndices((prev) => (isSameSelection(prev, derivedSelected) ? prev : derivedSelected))
  }, [derivedSelected])

  const notifyChange = (updated: Record<string, Set<number>>) => {
    const result: Record<string, Array<string>> = {}
    Object.entries(updated).forEach(([date, indices]) => {
      if (indices.size > 0) {
        result[date] = Array.from(indices)
          .sort((a, b) => a - b)
          .map(indexToTime)
      }
    })
    onChange?.(result)
  }

  const handleInteraction = (date: string, idx: number, isInitial: boolean) => {
    if (disabledIdxMap[date].has(idx)) return
    const newIndices = { ...selectedIndices }
    const dateSet = new Set(newIndices[date])
    const nextMode = isInitial ? !dateSet.has(idx) : dragMode
    if (isInitial) setDragMode(nextMode)
    nextMode ? dateSet.add(idx) : dateSet.delete(idx)
    newIndices[date] = dateSet
    setSelectedIndices(newIndices)
    notifyChange(newIndices)
  }

  // 시간 라벨: 무조건 1시간 단위로만 생성
  const timeLabels = useMemo(() => {
    const labels = []
    for (let min = visualStartMin; min <= visualEndMin; min += 60) {
      const h = Math.floor(min / 60)
      const ampm = h >= 12 ? '오후' : '오전'
      const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
      const i = (min - visualStartMin) / 30

      labels.push({
        text: `${ampm} ${displayH}시`,
        top: i * 25 + 53, // 1칸당 25px 기준
      })
    }
    return labels
  }, [visualStartMin, visualEndMin])

  const getDayLabel = (dateStr: string) => {
    const [m, d] = dateStr.split('/').map(Number)
    const currentYear = new Date().getFullYear() // 현재 연도 기준

    // 자바스크립트 Date 객체는 월이 0부터 시작하므로 m - 1
    const date = new Date(currentYear, m - 1, d)

    // '일', '월' 등 한 글자 요일 추출
    const dayName = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date)

    return `(${dayName})`
  }

  const handleHeaderClick = (date: string) => {
    if (!isEditable) return
    const disabledSet = disabledIdxMap[date]
    const availableCount = totalSlots - disabledSet.size
    if (availableCount <= 0) return

    const newIndices = { ...selectedIndices }
    const isAllSelected = newIndices[date].size === availableCount
    const nextSet = new Set<number>()
    if (!isAllSelected) {
      for (let i = 0; i < totalSlots; i++) {
        if (!disabledSet.has(i)) nextSet.add(i)
      }
    }
    newIndices[date] = nextSet
    setSelectedIndices(newIndices)
    notifyChange(newIndices)
  }

  const handleMouseDown = (date: string, idx: number) => {
    if (!isEditable) return
    setIsDragging(true)
    handleInteraction(date, idx, true)
  }

  const handleMouseEnter = (date: string, idx: number) => {
    if (!isEditable || !isDragging) return
    handleInteraction(date, idx, false)
  }

  const handleStopDrag = () => {
    setIsDragging(false)
  }

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
        <S.MainArea>
          <S.HeaderRow $cols={dates.length}>
            {dates.map((d) => (
              <S.HeaderCell
                key={d}
                onClick={() => handleHeaderClick(d)}
                $isAllSelected={
                  selectedIndices[d].size > 0 &&
                  selectedIndices[d].size === totalSlots - disabledIdxMap[d].size
                }
                $isInteractive={isEditable}
              >
                <Badge
                  typo="C5.Md"
                  tone={
                    selectedIndices[d].size === totalSlots - disabledIdxMap[d].size
                      ? 'white'
                      : 'gray'
                  }
                  variant={
                    selectedIndices[d].size === totalSlots - disabledIdxMap[d].size
                      ? 'solid'
                      : 'outline'
                  }
                >
                  {`${d} ${getDayLabel(d)}`}
                </Badge>
              </S.HeaderCell>
            ))}
          </S.HeaderRow>
          <S.GridBody $cols={dates.length}>
            {Array.from({ length: totalSlots }).map((_, idx) =>
              dates.map((date) => (
                <S.SlotCell
                  key={`${date}-${idx}`}
                  $isSelected={selectedIndices[date].has(idx)}
                  $isDisabled={disabledIdxMap[date].has(idx)}
                  $isHourBoundary={(visualStartMin + (idx + 1) * 30) % 60 === 0}
                  $isInteractive={isEditable}
                  onMouseDown={isEditable ? () => handleMouseDown(date, idx) : undefined}
                  onMouseEnter={isEditable ? () => handleMouseEnter(date, idx) : undefined}
                />
              )),
            )}
          </S.GridBody>
        </S.MainArea>
      </S.TableWrapper>
    </S.Container>
  )
}

export const TimeTable = forwardRef<HTMLDivElement, ScheduleSelectorProps>(TimeTableComponent)
TimeTable.displayName = 'TimeTable'
