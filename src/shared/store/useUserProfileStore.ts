import { create } from 'zustand'

import type { PartType } from '@/features/auth/domain'
import type { OrganizationType, RoleType } from '@/shared/types/umc'

export type UserProfileRole = {
  id: string
  challengerId: string
  roleType: RoleType | null
  organizationType: OrganizationType
  responsiblePart: PartType | null
  gisuId: string
}

type UserProfileState = {
  name: string
  nickname: string
  email: string
  role: UserProfileRole | null
  roles: Array<UserProfileRole>
  setName: (name: string) => void
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  setRoles: (role: UserProfileRole | null) => void
  setRoleList: (roles: Array<UserProfileRole>) => void
  gisu: string
  setGisu: (gisu: string) => void
  schoolId: string
  setSchoolId: (schoolId: string) => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  name: '',
  nickname: '',
  email: '',
  role: null,
  roles: [],
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setRoles: (role) => set({ role }),
  setRoleList: (roles) => set({ roles }),
  gisu: '',
  setGisu: (gisu) => set({ gisu }),
  schoolId: '',
  setSchoolId: (schoolId) => set({ schoolId }),
}))
