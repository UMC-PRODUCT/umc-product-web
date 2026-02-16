// 학교 선택 상태를 관리하는 훅
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

import type { RegisterForm } from '../../schemas/register'

export interface SchoolOption {
  schoolId: string
  schoolName: string
}

const EMPTY_SCHOOL: SchoolOption = { schoolId: '', schoolName: '' }

/**
 * 학교 선택 상태를 관리하는 훅
 */
export function useSchoolSelection(setValue: UseFormSetValue<RegisterForm>) {
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption>(EMPTY_SCHOOL)

  const handleSchoolSelect = ({ schoolId, schoolName }: SchoolOption) => {
    setSelectedSchool({ schoolId, schoolName })
    setValue('school', schoolName, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return {
    selectedSchool,
    handleSchoolSelect,
  }
}
