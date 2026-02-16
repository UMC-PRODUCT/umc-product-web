import type { Option } from '@/shared/types/form'

export const createDropdownOptions = <T>(
  items: Array<T>,
  mapLabel: (item: T) => string,
  mapId: (item: T) => string,
  allLabel: string,
): Array<Option<string>> => [
  { label: allLabel, id: '0' },
  ...items.map((item) => ({
    label: mapLabel(item),
    id: mapId(item),
  })),
]
