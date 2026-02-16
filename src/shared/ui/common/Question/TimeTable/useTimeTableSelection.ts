import { useEffect, useMemo, useRef, useState } from 'react'

import type { TimeTableSlots } from '@/shared/types/apply'

import { buildDerivedSelected, indexToTime, isSameSelection } from './TimeTable.helpers'

type UseTimeTableSelectionArgs = {
  dates: Array<string>
  value: Partial<TimeTableSlots>
  totalSlots: number
  visualStartMin: number
  disabledIdxMap: Record<string, Set<number>>
  onChange?: (selected: Record<string, Array<string>>) => void
  slotMinutes?: number
}

export const useTimeTableSelection = ({
  dates,
  value,
  totalSlots,
  visualStartMin,
  disabledIdxMap,
  onChange,
  slotMinutes: _slotMinutes,
}: UseTimeTableSelectionArgs) => {
  // 현재 선택 상태를 내부 Set으로 관리.
  const [selectedIndices, setSelectedIndices] = useState<Record<string, Set<number>>>(() =>
    Object.fromEntries(dates.map((d) => [d, new Set<number>()])),
  )
  // 드래그 진행 상태 및 모드(선택/해제) 기억.
  const [isDragging, setIsDragging] = useState(false)
  const [dragMode, setDragMode] = useState(true)
  const [dragStart, setDragStart] = useState<{ dateIndex: number; slotIndex: number } | null>(null)
  // 드래그 시작 시점의 선택 상태를 보관해 when2meet 방식으로 적용.
  const dragBaseRef = useRef<Record<string, Set<number>> | null>(null)

  const derivedSelected = useMemo(
    () =>
      buildDerivedSelected({
        dates,
        value,
        totalSlots,
        visualStartMin,
      }),
    [value, dates, totalSlots, visualStartMin],
  )

  useEffect(() => {
    setSelectedIndices((prev) => (isSameSelection(prev, derivedSelected) ? prev : derivedSelected))
  }, [derivedSelected])

  // 외부 onChange로 전달할 선택 결과 생성.
  const notifyChange = (updated: Record<string, Set<number>>) => {
    const result: Record<string, Array<string>> = {}
    Object.entries(updated).forEach(([date, indices]) => {
      if (indices.size > 0) {
        result[date] = Array.from(indices)
          .sort((a, b) => a - b)
          .map((idx) => indexToTime(idx, visualStartMin))
      }
    })
    onChange?.(result)
  }

  const applySelectionRange = (
    baseIndices: Record<string, Set<number>>,
    startDateIndex: number,
    startSlotIndex: number,
    endDateIndex: number,
    endSlotIndex: number,
    shouldSelect: boolean,
  ) => {
    // 드래그 범위를 직사각형으로 계산해 선택/해제 반영.
    const minDate = Math.min(startDateIndex, endDateIndex)
    const maxDate = Math.max(startDateIndex, endDateIndex)
    const minSlot = Math.min(startSlotIndex, endSlotIndex)
    const maxSlot = Math.max(startSlotIndex, endSlotIndex)

    const newIndices = Object.fromEntries(dates.map((date) => [date, new Set(baseIndices[date])]))
    for (let dateIdx = minDate; dateIdx <= maxDate; dateIdx += 1) {
      const date = dates[dateIdx]
      const dateSet = new Set(newIndices[date])
      for (let slotIdx = minSlot; slotIdx <= maxSlot; slotIdx += 1) {
        if (disabledIdxMap[date].has(slotIdx)) continue
        if (shouldSelect) dateSet.add(slotIdx)
        else dateSet.delete(slotIdx)
      }
      newIndices[date] = dateSet
    }
    setSelectedIndices(newIndices)
    notifyChange(newIndices)
  }

  const handleHeaderClick = (date: string) => {
    // 날짜 헤더 클릭 시 해당 컬럼 전체 선택/해제.
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
    // 드래그 시작: 기준 상태를 저장하고 모드를 결정.
    const dateIndex = dates.indexOf(date)
    if (dateIndex < 0 || disabledIdxMap[date].has(idx)) return
    const baseIndices = Object.fromEntries(dates.map((d) => [d, new Set(selectedIndices[d])]))
    setIsDragging(true)
    setDragStart({ dateIndex, slotIndex: idx })
    dragBaseRef.current = baseIndices
    const isSelected = selectedIndices[date].has(idx)
    setDragMode(!isSelected)
    applySelectionRange(baseIndices, dateIndex, idx, dateIndex, idx, !isSelected)
  }

  const handleMouseEnter = (date: string, idx: number) => {
    // 드래그 중 범위 확장.
    if (!isDragging) return
    if (!dragStart || !dragBaseRef.current) return
    const dateIndex = dates.indexOf(date)
    if (dateIndex < 0) return
    applySelectionRange(
      dragBaseRef.current,
      dragStart.dateIndex,
      dragStart.slotIndex,
      dateIndex,
      idx,
      dragMode,
    )
  }

  const handleStopDrag = () => {
    // 드래그 종료.
    setIsDragging(false)
    setDragStart(null)
    dragBaseRef.current = null
  }

  return {
    selectedIndices,
    handleHeaderClick,
    handleMouseDown,
    handleMouseEnter,
    handleStopDrag,
  }
}
