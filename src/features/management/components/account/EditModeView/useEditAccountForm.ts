import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { AccountEditForm } from '@/features/management/schemas/management'
import { accountEditSchema } from '@/features/management/schemas/management'
import type { AccountLevelType } from '@/shared/types/umc'
import type { Option } from '@/shared/ui/common/Dropdown'

type EditAccountInitialValues = {
  school?: Option<string>
  level?: Option<string>
  name?: string
  nickname?: string
  email?: string
}

const emptyOption: Option<string> = { id: undefined as unknown as string, label: '' }

type EditAccountFormReturn = UseFormReturn<AccountEditForm, unknown, AccountEditForm> & {
  handleAccountSelect: (option: Option<string>) => void
  handleSchoolSelect: (option: Option<string>) => void
  selectedAccountLevel: Option<string>
  selectedSchool: Option<string>
}

const useEditAccountForm = (
  {
    school = emptyOption,
    level = emptyOption,
    name = '',
    nickname = '',
    email = '',
  }: EditAccountInitialValues = {},
  resolveAccountLevelValue: (id: string | number) => AccountLevelType | undefined,
): EditAccountFormReturn => {
  const [selectedAccountLevel, setSelectedAccountLevel] = useState<Option<string>>(level)
  const [selectedSchool, setSelectedSchool] = useState<Option<string>>(school)

  const form = useForm<AccountEditForm, unknown, AccountEditForm>({
    mode: 'onChange',
    resolver: zodResolver(accountEditSchema),
    defaultValues: {
      schoolName: school.label,
      level: resolveAccountLevelValue(level.id),
      name,
      nickname,
      email,
    },
  })

  const handleAccountSelect = ({ id, label }: Option<string>) => {
    setSelectedAccountLevel({ id, label })
    const matchedLevel = resolveAccountLevelValue(id)
    if (!matchedLevel) return
    form.setValue('level', matchedLevel, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleSchoolSelect = ({ id, label }: Option<string>) => {
    setSelectedSchool({ id, label })
    form.setValue('schoolName', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return {
    ...form,
    handleAccountSelect,
    handleSchoolSelect,
    selectedAccountLevel,
    selectedSchool,
  }
}

export default useEditAccountForm
