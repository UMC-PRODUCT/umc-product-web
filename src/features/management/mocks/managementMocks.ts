import type { PartType } from '@/features/auth/domain'
import type { Option } from '@/shared/types/form'
import type { AccountLevelType, AccountStateType, SchoolStateType } from '@/shared/types/umc'

export const STATUS_MOCK: Array<Option<AccountStateType | '-- 전체 상태 --'>> = [
  { label: '-- 전체 상태 --', id: 0 },
  { label: 'ACTIVE', id: 1 },
  { label: 'INACTIVE', id: 2 },
]

export const UNI_DELETE_MOCK: Array<{
  id: number
  name: string
  branch: string
  date: string
  status: SchoolStateType
}> = [
  {
    id: 1,
    name: '서울대학교',
    branch: 'Ain 지부',
    date: '2025.12.31',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: '연세대학교',
    branch: 'Ain 지부',
    date: '2025.12.29',
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: '고려대학교',
    branch: 'Ain 지부',
    date: '2025.12.30',
    status: 'INACTIVE',
  },
  {
    id: 4,
    name: '한양대학교',
    branch: 'Ain 지부',
    date: '2025.12.29',
    status: 'ACTIVE',
  },
  {
    id: 5,
    name: '성균관대학교',
    branch: 'Ain 지부',
    date: '2025.12.29',
    status: 'INACTIVE',
  },
]

export const ACCOUNT_DELETE_MOCK: Array<{
  id: number
  name: string
  nickname: string
  school: string
  generation: string
  part: PartType
  role: AccountLevelType
}> = [
  {
    id: 1,
    name: '성이름',
    nickname: '별명이름',
    school: '서울대학교',
    generation: '27기',
    part: 'WEB',
    role: 'ADMIN',
  },
  {
    id: 2,
    name: '성이름',
    nickname: '별명이름',
    school: '연세대학교',
    generation: '27기',
    part: 'DESIGN',
    role: 'MANAGER',
  },
  {
    id: 3,
    name: '성이름',
    nickname: '별명이름',
    school: '고려대학교',
    generation: '26기',
    part: 'NODEJS',
    role: 'USER',
  },
  {
    id: 4,
    name: '성이름',
    nickname: '별명이름',
    school: '한양대학교',
    generation: '25기',
    part: 'IOS',
    role: 'CHALLENGER',
  },
]
