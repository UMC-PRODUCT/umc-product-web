import type { PartType } from '@/features/auth/domain'
import type { Option } from '@/shared/types/form'
import type { AccountLevelType, AccountStateType, SchoolStateType } from '@/shared/types/umc'

export const AFFILIATED_MOCK: Array<Option<string>> = [
  { label: '-- 전체 지부 --', id: 0 },
  { label: 'Leo', id: 1 },
  { label: 'Scorpio', id: 2 },
  { label: '지부이름뭐있지', id: 3 },
]

export const ROLE_MOCK: Array<Option<AccountLevelType | '-- 전체 역할 --'>> = [
  { label: '-- 전체 역할 --', id: 0 },
  { label: 'ADMIN', id: 1 },
  { label: 'USER', id: 2 },
]

export const STATUS_MOCK: Array<Option<AccountStateType | '-- 전체 상태 --'>> = [
  { label: '-- 전체 상태 --', id: 0 },
  { label: 'ACTIVE', id: 1 },
  { label: 'INACTIVE', id: 2 },
]

export const GENERATIONS_MOCK: Array<Option<string | '-- 전체 기수 --'>> = [
  { label: '-- 전체 기수 --', id: 0 },
  { label: '1기', id: 1 },
  { label: '2기', id: 2 },
  { label: '3기', id: 3 },
  { label: '4기', id: 4 },
  { label: '5기', id: 5 },
  { label: '6기', id: 6 },
  { label: '7기', id: 7 },
  { label: '8기', id: 8 },
  { label: '9기', id: 9 },
  { label: '10기', id: 10 },
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
