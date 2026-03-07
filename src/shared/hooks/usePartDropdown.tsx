import { useMemo } from 'react'

import { PART_LIST, PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { buildDropdownOptions, useDropdownControl } from '@/shared/hooks/useDropdownControl'
import type { Option } from '@/shared/types/form'

type UsePartDropdownConfig = {
  placeholder?: string
  includeAllOption?: boolean
  allLabel?: string
  defaultToFirst?: boolean
  closeOnChange?: boolean
}

type UsePartDropdownResult = {
  value: Option<string> | undefined
  setValue: (value: Option<string> | undefined) => void
  options: Array<Option<string>>
  Dropdown: React.ReactElement
}

export const usePartDropdown = (config: UsePartDropdownConfig = {}): UsePartDropdownResult => {
  const {
    placeholder = '전체 파트',
    includeAllOption = true,
    allLabel = '-- 전체 파트 --',
    defaultToFirst = false,
    closeOnChange = false,
  } = config
  const options = useMemo(
    () =>
      buildDropdownOptions(
        [...PART_LIST],
        (part) => PART_TYPE_TO_SMALL_PART[part],
        (part) => part,
      ),
    [],
  )

  return useDropdownControl({
    options,
    placeholder,
    includeAllOption,
    allLabel,
    defaultToFirst,
    closeOnChange,
    disabled: false,
    keyPrefix: 'part',
    css: { width: '100%', height: '100%', maxWidth: '200px' },
  })
}
