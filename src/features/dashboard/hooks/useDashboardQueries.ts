import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { dashboardKeys } from '@/shared/queryKeys'

import { getMyApplications } from '../domain/api'

/** 내 지원 목록 조회 */
export function useGetMyApplications() {
  return useCustomSuspenseQuery(dashboardKeys.getMyApplications, getMyApplications)
}
