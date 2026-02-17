import type { RoleType } from '@/shared/types/umc'
import { isManagementRole, isSchoolRole } from '@/shared/utils/role'

/**
 * 로그인 직후 사용자 역할에 맞는 초기 진입 경로를 반환한다.
 */
export const resolveInitialPathByRole = (roleType?: RoleType | null) => {
  if (!roleType) return '/dashboard'
  if (isManagementRole(roleType)) return '/management/generation'
  if (isSchoolRole(roleType)) return '/school/dashboard'
  return '/dashboard'
}
