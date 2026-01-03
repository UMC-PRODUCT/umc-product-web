import { useId } from 'react'

import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import type { Option } from '@/components/common/Dropdown/Dropdown'
import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import Label from '@/components/common/Label/Label'
import { Field } from '@/styles/formStyles'

import * as S from './LabelDropdown.style'

type LabelDropdownProps = {
  label: string
  placeholder?: string
  options: Array<Option>
  value?: Option
  onChange: (option: Option) => void
  error?: {
    error: boolean
    errorMessage: string
  }
}

export default function LabelDropdown({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
}: LabelDropdownProps) {
  const baseId = useId()
  const triggerId = `${baseId}-selector`
  const labelId = `${baseId}-label`

  return (
    <Field>
      <S.SelectHeader>
        <Label
          id={labelId}
          htmlFor={triggerId}
          label={label}
          necessary={true}
        />
        {error?.error && (
          <ErrorMessage errorMessage={error.errorMessage}></ErrorMessage>
        )}
      </S.SelectHeader>
      <Dropdown
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        id={triggerId}
        ariaLabelledby={labelId}
      />
    </Field>
  )
}
