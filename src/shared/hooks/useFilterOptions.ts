import { useMemo } from 'react'

import type { Option } from '@/shared/types/form'

type UseFilterOptionsParams<TLabel extends string> = {
  label: string
  options: Array<Option<TLabel>>
  mapLabel?: (label: TLabel) => string
}

const useFilterOptions = <TLabel extends string>({
  label,
  options,
  mapLabel,
}: UseFilterOptionsParams<TLabel>) => {
  const allLabel = `-- 전체 ${label} --`
  const normalizedOptions = useMemo<Array<Option<string>>>(
    () => [
      { label: allLabel, id: 0 },
      ...options
        .filter((option) => option.id !== 0)
        .map((option) => ({
          ...option,
          label: mapLabel ? mapLabel(option.label) : String(option.label),
        })),
    ],
    [allLabel, mapLabel, options],
  )

  return { options: normalizedOptions }
}

export default useFilterOptions
