import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { dashboardKeys } from '../domain/queryKeys'

/** 내 지원 목록 조회 */
export function useGetMyApplications() {
  return useCustomSuspenseQuery(
    dashboardKeys.getMyApplications().queryKey,
    dashboardKeys.getMyApplications().queryFn,
  )
}
