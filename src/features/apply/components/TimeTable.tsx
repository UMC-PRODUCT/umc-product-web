/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import * as S from '@/features/apply/components/TimeTable.style'
import { Badge } from '@/shared/ui/common/Badge'
// --- Types ---
interface TimeSlot {
  date: string // "1/4"
  startTime: string // "16:30"
}

interface ScheduleSelectorProps {
  dates: Array<string> // ['1/4', '1/5', '1/6', '1/7', '1/8', '1/9', '1/10']
  startHour: number // 시작 시간 (예: 16)
  endHour: number // 종료 시간 (예: 22)
  disabledSlots?: Partial<Record<string, Array<string>>> // {"1/4": ["16:00", "16:30"]}
  onChange?: (selected: Array<TimeSlot>) => void
}

// --- Component ---
export const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  dates,
  startHour,
  endHour,
  disabledSlots = {},
  onChange,
}) => {
  const SLOTS_PER_HOUR = 2 // 30분 단위
  const totalSlots = (endHour - startHour) * SLOTS_PER_HOUR
  const currentYear = new Date().getFullYear()

  // 1. 상태 및 드래그 로직
  const [selected, setSelected] = useState<Record<string, Set<number>>>(
    Object.fromEntries(dates.map((d) => [d, new Set<number>()])),
  )
  const [isDragging, setIsDragging] = useState(false)
  const [dragMode, setDragMode] = useState(true)

  // 2. 헬퍼 함수
  const timeToIndex = useCallback(
    (time: string) => {
      const [h, m] = time.split(':').map(Number)
      return (h - startHour) * 2 + (m === 30 ? 1 : 0)
    },
    [startHour],
  )

  const indexToTime = useCallback(
    (idx: number) => {
      const h = startHour + Math.floor(idx / 2)
      const m = idx % 2 === 0 ? '00' : '30'
      return `${String(h).padStart(2, '0')}:${m}`
    },
    [startHour],
  )

  const getDayLabel = (dateStr: string) => {
    const [m, d] = dateStr.split('/').map(Number)
    return new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(
      new Date(currentYear, m - 1, d),
    )
  }

  // 3. 비활성화 인덱스 계산
  const disabledIdxMap = useMemo(() => {
    return Object.fromEntries(
      dates.map((d) => [d, new Set((disabledSlots[d] || []).map(timeToIndex))]),
    )
  }, [dates, disabledSlots, timeToIndex])

  // 4. 데이터 변경 알림
  useEffect(() => {
    const result: Array<TimeSlot> = []
    Object.entries(selected).forEach(([date, indices]) => {
      indices.forEach((idx) => {
        result.push({ date, startTime: indexToTime(idx) })
      })
    })
    onChange?.(
      result.sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)),
    )
  }, [selected, indexToTime, onChange])

  // 5. 핸들러
  const handleToggleColumn = (date: string) => {
    const disabledSet = disabledIdxMap[date]
    const availableCount = totalSlots - disabledSet.size

    setSelected((prev) => {
      const isAllSelected = prev[date].size === availableCount && availableCount > 0
      const newSet = new Set<number>()
      if (!isAllSelected) {
        for (let i = 0; i < totalSlots; i++) {
          if (!disabledSet.has(i)) newSet.add(i)
        }
      }
      return { ...prev, [date]: newSet }
    })
  }

  const handleInteraction = (date: string, idx: number, isInitial: boolean) => {
    if (disabledIdxMap[date].has(idx)) return

    setSelected((prev) => {
      const newSet = new Set(prev[date])
      const mode = isInitial ? !newSet.has(idx) : dragMode
      if (isInitial) setDragMode(mode)

      mode ? newSet.add(idx) : newSet.delete(idx)
      return { ...prev, [date]: newSet }
    })
  }

  // 6. 시간 라벨 데이터
  const timeLabels = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i
    return {
      text: `오후 ${hour > 12 ? hour - 12 : hour}시`,
      top: i * (SLOTS_PER_HOUR * 25) + 53,
    }
  })

  return (
    <S.Container onMouseLeave={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
      <S.TableWrapper>
        <S.TimeLabelsColumn>
          {timeLabels.map((item, i) => (
            <S.TimeLabel key={i} top={item.top}>
              {item.text}
            </S.TimeLabel>
          ))}
        </S.TimeLabelsColumn>

        <S.MainArea>
          <S.HeaderRow cols={dates.length}>
            {dates.map((d) => (
              <S.HeaderCell
                key={d}
                onClick={() => handleToggleColumn(d)}
                isAllSelected={
                  selected[d].size > 0 && selected[d].size === totalSlots - disabledIdxMap[d].size
                }
              >
                <Badge
                  typo="C5.Md"
                  tone={selected[d].size === totalSlots - disabledIdxMap[d].size ? 'white' : 'gray'}
                  variant={
                    selected[d].size === totalSlots - disabledIdxMap[d].size ? 'solid' : 'outline'
                  }
                >{`${d} (${getDayLabel(d)})`}</Badge>
              </S.HeaderCell>
            ))}
          </S.HeaderRow>

          <S.GridBody cols={dates.length}>
            {Array.from({ length: totalSlots }).map((_, idx) =>
              dates.map((date) => (
                <S.SlotCell
                  key={`${date}-${idx}`}
                  isSelected={selected[date].has(idx)}
                  isDisabled={disabledIdxMap[date].has(idx)}
                  isHourBoundary={(idx + 1) % 2 === 0}
                  onMouseDown={() => {
                    setIsDragging(true)
                    handleInteraction(date, idx, true)
                  }}
                  onMouseEnter={() => isDragging && handleInteraction(date, idx, false)}
                />
              )),
            )}
          </S.GridBody>
        </S.MainArea>
      </S.TableWrapper>
    </S.Container>
  )
}
