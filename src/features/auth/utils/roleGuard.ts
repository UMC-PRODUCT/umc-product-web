import { getAccessToken } from '@/api/tokenManager'
import { getActiveGisu, getMemberMe } from '@/features/auth/domain/api'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { getActiveRolePool, getHighestPriorityRole, getRolesByGisu } from '@/shared/utils/role'

export const ensureActiveRolePool = async () => {
  const store = useUserProfileStore.getState()
  const currentRolePool = getActiveRolePool({
    role: store.role,
    roles: store.roles,
    gisu: store.gisu,
  })

  if (currentRolePool.length > 0) return currentRolePool
  if (typeof window === 'undefined') return currentRolePool
  if (!getAccessToken()) return currentRolePool

  try {
    const [profile, activeGisuResponse] = await Promise.all([getMemberMe(), getActiveGisu()])
    const activeGisuId = activeGisuResponse.result.gisuId
    const activeRoles = getRolesByGisu(profile.roles, activeGisuId)
    const selectedRole = getHighestPriorityRole(activeRoles)

    const { setName, setNickname, setEmail, setSchoolId, setGisu, setRoleList, setRoles } =
      useUserProfileStore.getState()

    setName(profile.name ?? '')
    setNickname(profile.nickname ?? '')
    setEmail(profile.email ?? '')
    setSchoolId(profile.schoolId ? profile.schoolId.toString() : '')
    setGisu(activeGisuId)
    setRoleList(profile.roles)
    setRoles(selectedRole)

    return getActiveRolePool({
      role: selectedRole,
      roles: profile.roles,
      gisu: activeGisuId,
    })
  } catch {
    return currentRolePool
  }
}
