// 학교 검색 결과를 한 번에 불러오는 훅
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { SchoolSearchPage } from '@/features/auth/domain/school'
import { searchSchools } from '@/features/auth/domain/school'
import type { SchoolOption } from '@/features/auth/hooks/register/useSchoolSelection'

export const useSchoolPaginator = (keyword?: string) => {
  const queryKey = ['auth-schools', keyword] as const

  const query = useQuery<SchoolSearchPage, Error>({
    queryKey,
    queryFn: () => searchSchools(),
  })

  const options = useMemo(() => {
    const schools = query.data?.content || []
    return schools.map<SchoolOption>((school) => ({
      id: school.schoolId,
      label: school.schoolName,
    }))
  }, [query.data])

  const totalCount = Number(query.data?.totalElements)

  return {
    ...query,
    options,
    totalCount,
  }
}
