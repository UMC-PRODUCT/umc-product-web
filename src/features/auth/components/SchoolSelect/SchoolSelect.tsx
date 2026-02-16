import { useMemo } from 'react'

import type { SchoolOption } from '@/features/auth/hooks/register/useSchoolSelection'
import { useGetAllSchoolsList } from '@/features/management/hooks/useManagementQueries'
import type { Option } from '@/shared/types/form'
import LabelDropdown from '@/shared/ui/form/LabelDropdown/LabelDropdown'

import * as S from './SchoolSelect.style'

type SchoolSelectProps = {
  value: SchoolOption
  onChange: (option: SchoolOption) => void
  error?: {
    error: boolean
    errorMessage?: string
  }
}

const SchoolSelect = ({ value, onChange, error }: SchoolSelectProps) => {
  const { data } = useGetAllSchoolsList()
  const selectedValue = useMemo<Option<string> | undefined>(
    () => (value.schoolId ? { id: value.schoolId, label: value.schoolName } : undefined),
    [value],
  )

  const handleChange = (option: Option<string>) => {
    onChange({ schoolId: String(option.id), schoolName: option.label })
  }

  return (
    <S.Wrapper>
      <LabelDropdown
        label="학교"
        placeholder={data ? '학교를 선택해 주세요.' : '학교를 불러오는 중입니다...'}
        options={
          data?.result.schools.map((school) => ({
            id: school.schoolId,
            label: school.schoolName,
          })) ?? []
        }
        value={selectedValue}
        error={{
          error: error?.error ?? false,
          errorMessage: error?.errorMessage ?? '',
        }}
        onChange={handleChange}
      />
    </S.Wrapper>
  )
}

export default SchoolSelect
