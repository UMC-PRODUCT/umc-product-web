import { create } from 'zustand'

import type { PartType } from '@/features/auth/domain'
import type { OrganizationType, RoleType } from '@/shared/types/umc'

type UserProfileState = {
  name: string
  nickname: string
  email: string
  role: {
    id: string
    challengerId: string
    roleType: RoleType | null
    organizationType: OrganizationType
    responsiblePart: PartType | null
    gisuId: string
  } | null
  setName: (name: string) => void
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  setRoles: (
    roles: {
      id: string
      challengerId: string
      roleType: RoleType | null
      organizationType: OrganizationType
      responsiblePart: PartType | null
      gisuId: string
    } | null,
  ) => void
  gisu: string
  setGisu: (gisu: string) => void
  schoolId: string
  setSchoolId: (schoolId: string) => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  name: '',
  nickname: '',
  email: '',
  role: {
    id: '',
    challengerId: '',
    roleType: null,
    // roleType: 'SCHOOL_PRESIDENT',
    // roleType: 'SUPER_ADMIN',
    organizationType: 'CENTRAL',
    responsiblePart: null,
    gisuId: '1',
  },
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  gisu: '1',
  setGisu: (gisu) => set({ gisu }),
  schoolId: '',
  setSchoolId: (schoolId) => set({ schoolId }),
  setRoles: (role) => set({ role }),
}))
