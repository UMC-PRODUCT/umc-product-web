import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsType } from '@/shared/types/umc'

import { fetchMyInfo, fetchTerm, getGisuList, getMyInfo, getSchoolLink, getTerm } from './api'

export const authKeys = createQueryKeys('auth', {
  terms: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => getTerm({ termsType }),
  }),
  me: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => getMyInfo(),
  }),
})

export const schoolKeys = createQueryKeys('school', {
  schoolLink: (schoolId: string) => ({
    queryKey: [schoolId, 'link'],
    queryFn: () => getSchoolLink(schoolId),
  }),
  gisu: () => ({
    queryKey: ['gisu'],
    queryFn: () => getGisuList(),
  }),
})

export const termsKeys = createQueryKeys('terms', {
  detail: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => fetchTerm({ termsType }),
  }),
})

export const memberKeys = createQueryKeys('member', {
  me: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => fetchMyInfo(),
  }),
})
