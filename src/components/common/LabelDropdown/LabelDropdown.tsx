import { useId, useState } from 'react'

import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import Selector from '@/components/common/Dropdown/Dropdown'
import Label from '@/components/common/Label/Label'
import type { Option } from '@/hooks/useSelectorInteractions'
import { Field } from '@/styles/formStyles'

import * as S from './LabelDropdown.style'

type LabelDropdownProps = {
  label: string
  placeholder?: string
  options: Array<Option>
  value?: Option
  onClick: (option: Option) => void
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
  onClick,
}: LabelDropdownProps) {
  const [open, setOpen] = useState(false)
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
      <Selector
        placeholder={placeholder}
        options={options}
        value={value}
        onClick={(option) => {
          onClick(option)
          setOpen(false)
        }}
        setOpen={setOpen}
        open={open}
        id={triggerId}
        ariaLabelledby={labelId}
      ></Selector>
    </Field>
  )
}
