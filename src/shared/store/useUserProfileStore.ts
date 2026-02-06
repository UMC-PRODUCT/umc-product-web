import { create } from 'zustand'

type UserProfileState = {
  name: string
  nickname: string
  email: string
  setName: (name: string) => void
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  gisu: string
  setGisu: (gisu: string) => void
  schoolId: string
  setSchoolId: (schoolId: string) => void
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  name: '',
  nickname: '',
  email: '',
  setName: (name) => set({ name }),
  setNickname: (nickname) => set({ nickname }),
  setEmail: (email) => set({ email }),
  gisu: '',
  setGisu: (gisu) => set({ gisu }),
  schoolId: '',
  setSchoolId: (schoolId) => set({ schoolId }),
}))
