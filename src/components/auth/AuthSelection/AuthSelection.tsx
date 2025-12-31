import { useState } from 'react'
import { Field } from '@/styles/formStyles'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import Label from '@/components/common/Label/Label'
import * as S from './AuthSelection.style'
import Selector from '@/components/common/Selector/Selector'

type Option = { label: string; id: string }

type AuthSelectionProps = {
  label: string
  placeholder?: string
  options: Option[]
  value?: {
    id: string
    label: string
  }
  onClick: (option: { id: string; label: string }) => void
  error?: {
    error: boolean
    errorMessage: string
  }
}

export default function AuthSelection({
  label,
  placeholder,
  options,
  value,
  error,
  onClick,
}: AuthSelectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <Field>
      <S.SelectHeader>
        <Label label={label} necessary={true}></Label>
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
      ></Selector>
    </Field>
  )
}
