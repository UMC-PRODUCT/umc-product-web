import type { TimeTableSlots } from '@/shared/types/apply'

export const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export const buildVisualRange = (timeRange: { start: string; end: string }) => {
  const actualStartMin = timeToMinutes(timeRange.start)
  const actualEndMin = timeToMinutes(timeRange.end)
  const visualStartMin = Math.floor(actualStartMin / 60) * 60
  const visualEndMin = Math.ceil(actualEndMin / 60) * 60
  return { actualStartMin, actualEndMin, visualStartMin, visualEndMin }
}

export const indexToTime = (idx: number, visualStartMin: number) => {
  const totalMin = visualStartMin + idx * 30
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const timeToIndex = (time: string, visualStartMin: number) => {
  const currentMin = timeToMinutes(time)
  return Math.floor((currentMin - visualStartMin) / 30)
}

export const buildDisabledIndexMap = ({
  dates,
  disabledSlots,
  timeRange,
}: {
  dates: Array<string>
  disabledSlots: Array<{
    date: string
    times: Array<string>
  }>
  timeRange: {
    start: string
    end: string
  }
}) => {
  const { actualStartMin, actualEndMin, visualStartMin, visualEndMin } = buildVisualRange(timeRange)
  const totalSlots = Math.floor((visualEndMin - visualStartMin) / 30)

  const disabledByDate = disabledSlots.reduce<Record<string, Array<string>>>((acc, slot) => {
    const { date, times } = slot
    if (!date || !Array.isArray(times)) return acc
    const normalizedTimes = times.filter((time): time is string => typeof time === 'string')
    if (normalizedTimes.length === 0) return acc
    acc[date] = (acc[date] ?? []).concat(normalizedTimes)
    return acc
  }, {})

  const map = Object.fromEntries(
    dates.map((d) => {
      const set = new Set<number>()
      const disabledTimes = disabledByDate[d] ?? []
      disabledTimes.forEach((time) => {
        const index = timeToIndex(time, visualStartMin)
        if (index >= 0 && index < totalSlots) {
          set.add(index)
        }
      })

      for (let i = 0; i < totalSlots; i++) {
        const currentSlotMin = visualStartMin + i * 30
        if (currentSlotMin < actualStartMin || currentSlotMin >= actualEndMin) {
          set.add(i)
        }
      }
      return [d, set]
    }),
  )

  return { map, totalSlots, visualStartMin, visualEndMin }
}

export const buildDerivedSelected = ({
  dates,
  value,
  totalSlots,
  visualStartMin,
}: {
  dates: Array<string>
  value: Partial<TimeTableSlots>
  totalSlots: number
  visualStartMin: number
}) => {
  const nextState: Record<string, Set<number>> = {}
  dates.forEach((date) => {
    const times = value[date] ?? []
    nextState[date] = new Set(
      times
        .map((time: string) => timeToIndex(time, visualStartMin))
        .filter((idx: number) => idx >= 0 && idx < totalSlots),
    )
  })
  return nextState
}

export const isSameSelection = (a: Record<string, Set<number>>, b: Record<string, Set<number>>) => {
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

export const buildTimeLabels = ({
  visualStartMin,
  visualEndMin,
}: {
  visualStartMin: number
  visualEndMin: number
}) => {
  const labels = []
  for (let min = visualStartMin; min <= visualEndMin; min += 60) {
    const h = Math.floor(min / 60)
    const ampm = h >= 12 ? '오후' : '오전'
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
    const i = (min - visualStartMin) / 30

    labels.push({
      text: `${ampm} ${displayH}시`,
      top: i * 25 + 53,
    })
  }
  return labels
}

export const miniBuildTimeLabels = ({
  visualStartMin,
  visualEndMin,
}: {
  visualStartMin: number
  visualEndMin: number
}) => {
  const labels = []
  for (let min = visualStartMin; min <= visualEndMin; min += 60) {
    const h = Math.floor(min / 60)
    const ampm = h >= 12 ? '오후' : '오전'
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
    const i = (min - visualStartMin) / 30

    labels.push({
      text: `${ampm} ${displayH}시`,
      top: i * 15 + 53,
    })
  }
  return labels
}

const parseDateParts = (dateStr: string) => {
  const delimiter = dateStr.includes('-') ? '-' : '/'
  const parts = dateStr.split(delimiter).map(Number)
  if (parts.length === 3) {
    const [y, m, d] = parts
    return { year: y, month: m, day: d }
  }
  const [m, d] = parts
  const currentYear = new Date().getFullYear()
  return { year: currentYear, month: m, day: d }
}

export const formatDateLabel = (dateStr: string) => {
  const { month, day } = parseDateParts(dateStr)
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${mm}/${dd}`
}

export const getDayLabel = (dateStr: string) => {
  const { year, month, day } = parseDateParts(dateStr)
  const date = new Date(year, month - 1, day)
  const dayName = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date)
  return `(${dayName})`
}
