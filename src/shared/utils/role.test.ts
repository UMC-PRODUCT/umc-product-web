import { describe, expect, it } from 'vitest'

import type { UserProfileRole } from '@/shared/store/useUserProfileStore'
import {
  canAccessManagementByRoles,
  canAccessSchoolByRoles,
  getActiveRolePool,
  getHighestPriorityRole,
  getRolesByGisu,
  isManagementRole,
  isSchoolRole,
} from '@/shared/utils/role'

const makeRole = (override: Partial<UserProfileRole>): UserProfileRole => ({
  id: 'role-id',
  challengerId: 'challenger-id',
  roleType: 'SCHOOL_PART_LEADER',
  organizationType: 'SCHOOL',
  responsiblePart: 'WEB',
  gisuId: '9',
  ...override,
})

describe('role util smoke tests', () => {
  it('selects highest priority role', () => {
    const roles: Array<UserProfileRole> = [
      makeRole({ id: 'a', roleType: 'SCHOOL_PART_LEADER' }),
      makeRole({ id: 'b', roleType: 'SCHOOL_PRESIDENT' }),
      makeRole({ id: 'c', roleType: 'CENTRAL_PRESIDENT' }),
    ]

    expect(getHighestPriorityRole(roles)?.id).toBe('c')
  })

  it('filters roles by gisu and uses fallback role when filtered set is empty', () => {
    const roles: Array<UserProfileRole> = [makeRole({ id: 'r1', gisuId: '8' })]
    const currentRole = makeRole({ id: 'current', gisuId: '9', roleType: 'SCHOOL_PRESIDENT' })

    expect(getRolesByGisu(roles, '8')).toHaveLength(1)
    expect(getRolesByGisu(roles, '9')).toHaveLength(0)
    expect(getActiveRolePool({ role: currentRole, roles, gisu: '9' })).toEqual([currentRole])
  })

  it('detects management/school access by role type', () => {
    expect(isManagementRole('SUPER_ADMIN')).toBe(true)
    expect(isManagementRole('CENTRAL_OPERATING_TEAM_MEMBER')).toBe(true)
    expect(isManagementRole('SCHOOL_PRESIDENT')).toBe(false)

    expect(isSchoolRole('SCHOOL_PRESIDENT')).toBe(true)
    expect(isSchoolRole('CENTRAL_PRESIDENT')).toBe(false)

    expect(canAccessManagementByRoles([makeRole({ roleType: 'SUPER_ADMIN' })])).toBe(true)
    expect(canAccessSchoolByRoles([makeRole({ roleType: 'SCHOOL_PRESIDENT' })])).toBe(true)
  })
})
