import { create } from 'zustand'

import type { AccountLevelType } from '@/shared/types/umc'

type UserProfileState = {
  name: string
  nickname: string
  email: string
  level?: AccountLevelType
  setName: (name: string) => void
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  setLevel: (level?: AccountLevelType) => void
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
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  setLevel: (level) => set({ level }),
  gisu: '',
  setGisu: (gisu) => set({ gisu }),
  schoolId: '',
  setSchoolId: (schoolId) => set({ schoolId }),
}))
