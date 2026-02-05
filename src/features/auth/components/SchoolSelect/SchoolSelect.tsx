import { useMemo } from 'react'

import { useSchoolPaginator } from '@/features/auth/hooks/register/useSchoolPaginator'
import type { SchoolOption } from '@/features/auth/hooks/register/useSchoolSelection'
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
  const { options, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSchoolPaginator()

  const selectedValue = useMemo(
    () => (value.id ? { id: value.id, label: value.label } : undefined),
    [value],
  )

  const handleScrollEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <S.Wrapper>
      <LabelDropdown
        label="학교"
        placeholder={isFetching ? '학교를 불러오는 중입니다...' : '학교를 선택해 주세요.'}
        options={[...options]} // 임시로 UMC 추가
        value={selectedValue}
        error={{
          error: error?.error ?? false,
          errorMessage: error?.errorMessage ?? '',
        }}
        onChange={onChange}
        onScrollEnd={handleScrollEnd}
      />
    </S.Wrapper>
  )
}

export default SchoolSelect
