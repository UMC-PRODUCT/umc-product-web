import { useMemo } from 'react'

import { buildDropdownOptions, useDropdownControl } from '@/shared/hooks/useDropdownControl'
import type { Option } from '@/shared/types/form'

import { useGetAllGisu } from './useManagementQueries'

type UseManagedDropdownConfig = {
  placeholder?: string
  includeAllOption?: boolean
  allLabel?: string
  defaultToFirst?: boolean
  closeOnChange?: boolean
}

type UseManagedDropdownResult = {
  value: Option<string> | undefined
  setValue: (value: Option<string> | undefined) => void
  options: Array<Option<string>>
  Dropdown: React.ReactElement
}

export const useGisuDropdown = (
  config: UseManagedDropdownConfig = {},
): UseManagedDropdownResult => {
  const {
    placeholder = '전체 기수',
    includeAllOption = true,
    allLabel = '-- 전체 기수 --',
    defaultToFirst = false,
    closeOnChange = false,
  } = config
  const { data, isLoading } = useGetAllGisu()
  const options = useMemo(() => {
    const gisuList = data?.result.gisuList ?? []
    return buildDropdownOptions(
      gisuList,
      (gisu) => `${gisu.gisu}기`,
      (gisu) => gisu.gisuId,
    )
  }, [data?.result.gisuList])

  return useDropdownControl({
    options,
    placeholder,
    includeAllOption,
    allLabel,
    defaultToFirst,
    closeOnChange,
    disabled: isLoading,
    keyPrefix: 'gisu',
  })
}
