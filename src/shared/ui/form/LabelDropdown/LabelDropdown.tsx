import { useId } from 'react'

import { Field } from '@shared/styles/formStyles'
import { Dropdown } from '@shared/ui/common/Dropdown/Dropdown'
import ErrorMessage from '@shared/ui/common/ErrorMessage/ErrorMessage'
import Label from '@shared/ui/common/Label/Label'

import type { Option } from '@/shared/types/form'

import * as S from './LabelDropdown.style'

type LabelDropdownProps<T> = {
  label: string
  placeholder?: string
  options: Array<Option<T>>
  value?: Option<T>
  onChange: (option: Option<T>) => void
  error?: {
    error: boolean
    errorMessage: string
  }
  onScrollEnd?: () => void
}

const LabelDropdown = <T,>({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
  onScrollEnd,
}: LabelDropdownProps<T>) => {
  const baseId = useId()
  const triggerId = `${baseId}-selector`
  const labelId = `${baseId}-label`

  return (
    <Field>
      <S.SelectHeader>
        <Label id={labelId} htmlFor={triggerId} label={label} necessary={true} />
        {error?.error && (
          <ErrorMessage
            typo="B4.Md"
            responsiveTypo={{ tablet: 'C5.Md' }}
            errorMessage={error.errorMessage}
          />
        )}
      </S.SelectHeader>
      <Dropdown
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        id={triggerId}
        ariaLabelledby={labelId}
        onScrollEnd={onScrollEnd}
      />
    </Field>
  )
}

export default LabelDropdown
