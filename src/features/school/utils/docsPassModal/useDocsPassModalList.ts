import { useMemo } from 'react'

import type { PartType } from '@/features/auth/domain'
import { useGetDocumentSelectedApplicants } from '@/features/school/hooks/useRecruitingQueries'
import type { SelectionsSortType } from '@/shared/types/umc'

export const useDocsPassModalList = ({
  recruitingId,
  part,
  sortId,
}: {
  recruitingId: string
  part: PartType | 'ALL'
  sortId: SelectionsSortType
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetDocumentSelectedApplicants(recruitingId, {
      part,
      size: '10',
      sort: sortId,
    })

  const pages = data?.pages ?? []
  const summary =
    pages.length > 0 ? pages[0].result.summary : { totalCount: '0', selectedCount: '0' }
  const totalCount = Number(summary.totalCount)
  const items = useMemo(
    () => pages.flatMap((page) => page.result.documentSelectionApplications.content),
    [pages],
  )

  return {
    data,
    pages,
    items,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  }
}
