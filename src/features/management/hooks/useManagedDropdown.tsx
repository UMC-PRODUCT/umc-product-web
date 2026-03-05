import { useMemo } from 'react'

import { buildDropdownOptions, useDropdownControl } from '@/shared/hooks/useDropdownControl'
import type { Option } from '@/shared/types/form'

import { useGetAllGisu, useGetAllSchools, useGetChapters } from './useManagementQueries'

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

export const useSchoolDropdown = (
  config: UseManagedDropdownConfig = {},
): UseManagedDropdownResult => {
  const {
    placeholder = '전체 학교',
    includeAllOption = true,
    allLabel = '-- 전체 학교 --',
    defaultToFirst = false,
    closeOnChange = false,
  } = config
  const { data, isLoading } = useGetAllSchools()
  const options = useMemo(() => {
    const schools = data?.result.schools ?? []
    return buildDropdownOptions(
      schools,
      (school) => school.schoolName,
      (school) => school.schoolId,
    )
  }, [data?.result.schools])

  return useDropdownControl({
    options,
    placeholder,
    includeAllOption,
    allLabel,
    defaultToFirst,
    closeOnChange,
    disabled: isLoading,
    keyPrefix: 'school',
  })
}

export const useChapterDropdown = (
  config: UseManagedDropdownConfig = {},
): UseManagedDropdownResult => {
  const {
    placeholder = '전체 지부',
    includeAllOption = true,
    allLabel = '-- 전체 지부 --',
    defaultToFirst = false,
    closeOnChange = false,
  } = config
  const { data, isLoading } = useGetChapters()
  const options = useMemo(() => {
    const chapters = data?.result.chapters ?? []
    return buildDropdownOptions(
      chapters,
      (chapter) => chapter.name,
      (chapter) => chapter.id,
    )
  }, [data?.result.chapters])

  return useDropdownControl({
    options,
    placeholder,
    includeAllOption,
    allLabel,
    defaultToFirst,
    closeOnChange,
    disabled: isLoading,
    keyPrefix: 'chapter',
  })
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
