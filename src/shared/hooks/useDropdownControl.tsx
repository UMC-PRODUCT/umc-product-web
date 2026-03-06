import { useMemo, useState } from 'react'
import type { Interpolation, Theme } from '@emotion/react'

import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown'

type UseDropdownControlConfig = {
  placeholder?: string
  options: Array<Option<string>>
  includeAllOption?: boolean
  allLabel?: string
  defaultToFirst?: boolean
  closeOnChange?: boolean
  disabled?: boolean
  keyPrefix?: string
  css?: Interpolation<Theme>
}

type UseDropdownControlResult = {
  value: Option<string> | undefined
  setValue: (value: Option<string> | undefined) => void
  options: Array<Option<string>>
  Dropdown: React.ReactElement
}

const ALL_ID = '__ALL__'

export const buildDropdownOptions = <T,>(
  items: Array<T>,
  mapLabel: (item: T) => string,
  mapId: (item: T) => string | number,
): Array<Option<string>> => {
  const seenIds = new Set<string>()
  const options: Array<Option<string>> = []

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

export const useDropdownControl = ({
  placeholder,
  options,
  includeAllOption = false,
  allLabel = '-- 전체 --',
  defaultToFirst = false,
  closeOnChange = false,
  disabled = false,
  keyPrefix = 'dropdown',
  css,
}: UseDropdownControlConfig): UseDropdownControlResult => {
  const [value, setValueState] = useState<Option<string> | undefined>()
  const [dropdownKey, setDropdownKey] = useState(0)
  const [hasUserSelected, setHasUserSelected] = useState(false)

  const resolvedOptions = useMemo(() => {
    if (!includeAllOption) return options

    const merged: Array<Option<string>> = [{ label: allLabel, id: ALL_ID }]
    const seenIds = new Set<string>([ALL_ID])

    options.forEach((option) => {
      const id = String(option.id)
      if (seenIds.has(id)) return
      seenIds.add(id)
      merged.push(option)
    })

    return merged
  }, [allLabel, includeAllOption, options])

  const defaultValue = useMemo(() => {
    if (!defaultToFirst || resolvedOptions.length === 0) return undefined
    return resolvedOptions.find((option) => option.id !== ALL_ID)
  }, [defaultToFirst, resolvedOptions])

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
    options: resolvedOptions,
    Dropdown: (
      <Dropdown
        key={`${keyPrefix}-${dropdownKey}`}
        options={resolvedOptions}
        placeholder={placeholder}
        value={selectedValue}
        disabled={disabled}
        css={css}
        onChange={(option) =>
          setValue(includeAllOption && option.id === ALL_ID ? undefined : option)
        }
      />
    ),
  }
}
