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
  email: string
  school: string
  branch: string
  role: AccountLevelType
  status: AccountStateType
}> = [
  {
    id: 1,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '서울대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '연세대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'PENDING',
  },
  {
    id: 3,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '고려대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'INACTIVE',
  },
  {
    id: 4,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '한양대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 5,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '성균관대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 6,
    name: '성이름',
    email: 'email1234@gmail.com',
    school: '성균관대학교',
    branch: 'Ain 지부',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
]
