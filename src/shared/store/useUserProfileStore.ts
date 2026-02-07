import { create } from 'zustand'

import type { PartType } from '@/features/auth/domain'
import type { AccountLevelType, OrganizationType, RoleType } from '@/shared/types/umc'

type UserProfileState = {
  name: string
  nickname: string
  email: string
  level?: AccountLevelType
  role: {
    id: string
    challengerId: string
    roleType: RoleType
    organizationType: OrganizationType
    responsiblePart: PartType | null
    gisuId: string
  } | null
  setLevel: (level: AccountLevelType | undefined) => void
  setName: (name: string) => void
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  setRoles: (
    roles: {
      id: string
      challengerId: string
      roleType: RoleType
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
  level: 'ADMIN', // TODO: 추후 수정
  role: {
    id: '',
    challengerId: '',
    roleType: 'SUPER_ADMIN',
    organizationType: 'CENTRAL',
    responsiblePart: null,
    gisuId: '',
  },
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setLevel: (level) => set({ level }),
  gisu: '',
  setGisu: (gisu) => set({ gisu }),
  schoolId: '',
  setSchoolId: (schoolId) => set({ schoolId }),
  setRoles: (role) => set({ role }),
}))
