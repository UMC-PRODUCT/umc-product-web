import { useMemo, useState } from 'react'

import { PART_LIST, PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import {
  useGetAllGisu,
  useGetAllSchools,
  useGetChapters,
} from '../../features/management/hooks/useManagementQueries'

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

const ALL_ID = '__ALL__'

const buildOptions = <T,>(
  items: Array<T>,
  mapLabel: (item: T) => string,
  mapId: (item: T) => string,
  allLabel: string,
  includeAllOption: boolean,
): Array<Option<string>> => {
  const options: Array<Option<string>> = includeAllOption ? [{ label: allLabel, id: ALL_ID }] : []
  const seenIds = new Set<string>(options.map((option) => String(option.id)))

  items.forEach((item) => {
    const id = String(mapId(item))
    if (seenIds.has(id)) return
    seenIds.add(id)
    options.push({
      label: mapLabel(item),
      id,
    })
  })

  return options
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
  const [value, setValueState] = useState<Option<string> | undefined>()
  const [dropdownKey, setDropdownKey] = useState(0)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  const options = useMemo(() => {
    const schools = data?.result.schools ?? []
    return buildOptions(
      schools,
      (school) => school.schoolName,
      (school) => school.schoolId,
      allLabel,
      includeAllOption,
    )
  }, [allLabel, includeAllOption, data?.result.schools])
  const defaultValue = useMemo(() => {
    if (!defaultToFirst || options.length === 0) return undefined
    return options.find((option) => option.id !== ALL_ID)
  }, [defaultToFirst, options])
  const selectedValue = !hasUserSelected && value === undefined ? defaultValue : value
  const setValue = (next: Option<string> | undefined) => {
    setHasUserSelected(true)
    setValueState(next)
    if (closeOnChange) {
      setDropdownKey((prev) => prev + 1)
    }
  }

  return {
    value: selectedValue,
    setValue,
    options,
    Dropdown: (
      <Dropdown
        key={`school-${dropdownKey}`}
        options={options}
        placeholder={placeholder}
        value={selectedValue}
        disabled={isLoading}
        onChange={(option) =>
          setValue(includeAllOption && option.id === ALL_ID ? undefined : option)
        }
      />
    ),
  }
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
  const [value, setValueState] = useState<Option<string> | undefined>()
  const [dropdownKey, setDropdownKey] = useState(0)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  const options = useMemo(() => {
    const chapters = data?.result.chapters ?? []
    return buildOptions(
      chapters,
      (chapter) => chapter.name,
      (chapter) => chapter.id,
      allLabel,
      includeAllOption,
    )
  }, [allLabel, includeAllOption, data?.result.chapters])
  const defaultValue = useMemo(() => {
    if (!defaultToFirst || options.length === 0) return undefined
    return options.find((option) => option.id !== ALL_ID)
  }, [defaultToFirst, options])
  const selectedValue = !hasUserSelected && value === undefined ? defaultValue : value
  const setValue = (next: Option<string> | undefined) => {
    setHasUserSelected(true)
    setValueState(next)
    if (closeOnChange) {
      setDropdownKey((prev) => prev + 1)
    }
  }

  return {
    value: selectedValue,
    setValue,
    options,
    Dropdown: (
      <Dropdown
        key={`chapter-${dropdownKey}`}
        options={options}
        placeholder={placeholder}
        value={selectedValue}
        disabled={isLoading}
        onChange={(option) =>
          setValue(includeAllOption && option.id === ALL_ID ? undefined : option)
        }
      />
    ),
  }
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
  const [value, setValueState] = useState<Option<string> | undefined>()
  const [dropdownKey, setDropdownKey] = useState(0)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  const options = useMemo(() => {
    const gisuList = data?.result.gisuList ?? []
    return buildOptions(
      gisuList,
      (gisu) => `${gisu.generation}기`,
      (gisu) => gisu.gisuId,
      allLabel,
      includeAllOption,
    )
  }, [allLabel, includeAllOption, data?.result.gisuList])
  const defaultValue = useMemo(() => {
    if (!defaultToFirst || options.length === 0) return undefined
    return options.find((option) => option.id !== ALL_ID)
  }, [defaultToFirst, options])
  const selectedValue = !hasUserSelected && value === undefined ? defaultValue : value
  const setValue = (next: Option<string> | undefined) => {
    setHasUserSelected(true)
    setValueState(next)
    if (closeOnChange) {
      setDropdownKey((prev) => prev + 1)
    }
  }

  return {
    value: selectedValue,
    setValue,
    options,
    Dropdown: (
      <Dropdown
        key={`gisu-${dropdownKey}`}
        options={options}
        placeholder={placeholder}
        value={selectedValue}
        disabled={isLoading}
        onChange={(option) =>
          setValue(includeAllOption && option.id === ALL_ID ? undefined : option)
        }
      />
    ),
  }
}

export const usePartDropdown = (
  config: UseManagedDropdownConfig = {},
): UseManagedDropdownResult => {
  const {
    placeholder = '전체 파트',
    includeAllOption = true,
    allLabel = '-- 전체 파트 --',
    defaultToFirst = false,
    closeOnChange = false,
  } = config
  const [value, setValueState] = useState<Option<string> | undefined>()
  const [dropdownKey, setDropdownKey] = useState(0)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  const options = useMemo(
    () =>
      buildOptions(
        [...PART_LIST],
        (part) => PART_TYPE_TO_SMALL_PART[part],
        (part) => part,
        allLabel,
        includeAllOption,
      ),
    [allLabel, includeAllOption],
  )
  const defaultValue = useMemo(() => {
    if (!defaultToFirst || options.length === 0) return undefined
    return options.find((option) => option.id !== ALL_ID)
  }, [defaultToFirst, options])
  const selectedValue = !hasUserSelected && value === undefined ? defaultValue : value
  const setValue = (next: Option<string> | undefined) => {
    setHasUserSelected(true)
    setValueState(next)
    if (closeOnChange) {
      setDropdownKey((prev) => prev + 1)
    }
  }

  return {
    value: selectedValue,
    setValue,
    options,
    Dropdown: (
      <Dropdown
        key={`part-${dropdownKey}`}
        options={options}
        placeholder={placeholder}
        value={selectedValue}
        disabled={false}
        css={{ width: '100%', height: '100%', maxWidth: '200px' }}
        onChange={(option) =>
          setValue(includeAllOption && option.id === ALL_ID ? undefined : option)
        }
      />
    ),
  }
}
