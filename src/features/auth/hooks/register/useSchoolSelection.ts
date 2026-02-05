// 학교 선택 상태를 관리하는 훅
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

import type { RegisterForm } from '../../schemas/register'

export interface SchoolOption {
  id: string | number
  label: string
}

const EMPTY_SCHOOL: SchoolOption = { id: '', label: '' }

/**
 * 학교 선택 상태를 관리하는 훅
 */
export function useSchoolSelection(setValue: UseFormSetValue<RegisterForm>) {
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption>(EMPTY_SCHOOL)

  const handleSchoolSelect = ({ id, label }: SchoolOption) => {
    setSelectedSchool({ id, label })
    setValue('school', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return {
    selectedSchool,
    handleSchoolSelect,
  }
}
