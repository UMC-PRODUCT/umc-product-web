import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { authKeys } from '@/shared/queryKeys'

import { getMemberMe, getMemberOAuthMe } from '../domain/api'

/** 내 정보 조회 */
export function useGetMemberMe() {
  return useCustomSuspenseQuery(authKeys.getMemberMe, getMemberMe)
}

/** OAuth 연결 정보 조회 */
export function useGetMemberOAuthMe() {
  return useCustomSuspenseQuery(authKeys.getMemberOAuthMe, getMemberOAuthMe)
}
