import type { UserProfileRole } from '@/shared/store/useUserProfileStore'
import type { RoleType } from '@/shared/types/umc'

const ROLE_PRIORITY: Record<RoleType, number> = {
  SUPER_ADMIN: 100,
  CENTRAL_PRESIDENT: 90,
  CENTRAL_VICE_PRESIDENT: 80,
  CENTRAL_OPERATING_TEAM_MEMBER: 70,
  CENTRAL_EDUCATION_TEAM_MEMBER: 60,
  CHAPTER_PRESIDENT: 50,
  SCHOOL_PRESIDENT: 40,
  SCHOOL_VICE_PRESIDENT: 30,
  SCHOOL_PART_LEADER: 20,
  SCHOOL_ETC_ADMIN: 10,
}

export const getRolesByGisu = (roles: Array<UserProfileRole>, gisuId?: string | null) => {
  if (!gisuId) return []
  return roles.filter((role) => role.gisuId === gisuId)
}

export const getHighestPriorityRole = (roles: Array<UserProfileRole>) => {
  if (roles.length === 0) return null
  return [...roles].sort((a, b) => {
    const aPriority = a.roleType ? ROLE_PRIORITY[a.roleType] : -1
    const bPriority = b.roleType ? ROLE_PRIORITY[b.roleType] : -1
    return bPriority - aPriority
  })[0]
}

export const isManagementRole = (roleType?: RoleType | null) =>
  Boolean(roleType && (roleType === 'SUPER_ADMIN' || roleType.startsWith('CENTRAL_')))

export const isSchoolRole = (roleType?: RoleType | null) =>
  Boolean(roleType && roleType.startsWith('SCHOOL_'))

export const isSchoolPresidentRole = (roleType?: RoleType | null) => roleType === 'SCHOOL_PRESIDENT'

export const getActiveRolePool = ({
  role,
  roles,
  gisu,
}: {
  role?: UserProfileRole | null
  roles: Array<UserProfileRole>
  gisu?: string | null
}) => {
  const activeRoles = getRolesByGisu(roles, gisu)
  if (activeRoles.length > 0) return activeRoles
  if (role && (!gisu || role.gisuId === gisu)) return [role]
  return []
}

export const canAccessManagementByRoles = (roles: Array<UserProfileRole>) =>
  roles.some((role) => isManagementRole(role.roleType))

export const canAccessSchoolByRoles = (roles: Array<UserProfileRole>) =>
  roles.some((role) => isSchoolRole(role.roleType))
