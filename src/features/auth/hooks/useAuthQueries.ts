import type { UseQueryOptions } from '@tanstack/react-query'

import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { authKeys, gisuKeys } from '@/shared/queryKeys'
import type { CommonResponseDTO } from '@/shared/types/api'

import { getActiveGisu, getMemberMe, getMemberOAuthMe } from '../domain/api'
import type { GetActiveGisuResponseDTO } from '../domain/types'

/** 내 정보 조회 */
export function useGetMemberMe() {
  return useCustomSuspenseQuery(authKeys.getMemberMe, getMemberMe)
}

/** 내 정보 조회 (non-suspense) */
export function useMemberMeQuery() {
  return useCustomQuery(authKeys.getMemberMe, getMemberMe)
}

/** 활성 기수 조회 */
export function useActiveGisuQuery(
  options?: Omit<
    UseQueryOptions<CommonResponseDTO<GetActiveGisuResponseDTO>>,
    'queryKey' | 'queryFn'
  > & {
    staleTime?: number
    retry?: number | boolean
  },
) {
  return useCustomQuery(gisuKeys.active, getActiveGisu, options)
}

/** OAuth 연결 정보 조회 */
export function useGetMemberOAuthMe() {
  return useCustomSuspenseQuery(authKeys.getMemberOAuthMe, getMemberOAuthMe)
}
