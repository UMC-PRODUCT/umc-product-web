// 학교 검색 결과를 무한 페이징으로 불러오는 훅
import { useEffect, useMemo } from 'react'
import type { InfiniteData, QueryFunctionContext } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import type { SchoolSearchPage } from '@/features/auth/domain/school'
import { searchSchools } from '@/features/auth/domain/school'
import type { SchoolOption } from '@/features/auth/hooks/register/useSchoolSelection'

const DEFAULT_PAGE_SIZE = 20

export const useSchoolPaginator = (keyword?: string) => {
  const queryKey = ['auth-schools', keyword] as const

  const query = useInfiniteQuery<
    SchoolSearchPage,
    Error,
    InfiniteData<SchoolSearchPage>,
    typeof queryKey,
    number
  >({
    queryKey,
    queryFn: ({ pageParam = 0 }: QueryFunctionContext<typeof queryKey, number>) =>
      searchSchools({
        page: pageParam,
        size: DEFAULT_PAGE_SIZE,
        keyword,
      }),
    getNextPageParam: (lastPage: SchoolSearchPage) => {
      if (lastPage.hasNext) {
        const currentPage = Number(lastPage.page)
        return Number.isNaN(currentPage) ? undefined : currentPage + 1
      }
      return undefined
    },
    initialPageParam: 0,
  })

  const options = useMemo(() => {
    const pages = query.data?.pages ?? []

    return pages.flatMap((page) => {
      const schools = Array.isArray(page.content) ? page.content : []
      return schools.map<SchoolOption>((school) => ({
        id: school.schoolId,
        label: school.schoolName,
      }))
    })
  }, [query.data])

  const totalCount = Number(query.data?.pages[0]?.totalElements ?? 0)

  useEffect(() => {
    const fetchAllPages = async () => {
      while (query.hasNextPage) {
        await query.fetchNextPage()
      }
    }

    fetchAllPages()

    return () => {
      /* no-op */
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage])

  return {
    ...query,
    options,
    totalCount,
  }
}
