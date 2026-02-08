import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { authKeys } from '../domain'

export function useMyInfo() {
  return useCustomSuspenseQuery(authKeys.me().queryKey, authKeys.me().queryFn)
}

export function useOAuthInfoMe() {
  return useCustomSuspenseQuery(authKeys.oAuthMe().queryKey, authKeys.oAuthMe().queryFn)
}
