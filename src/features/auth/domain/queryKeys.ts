import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsType } from '@/shared/types/umc'

import { getActiveGisu, getGisuList, getMyInfo, getSchoolLink, getTerm, getTermById } from './api'

export const authKeys = createQueryKeys('auth', {
  terms: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => getTerm({ termsType }),
  }),
  me: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => getMyInfo(),
  }),
  termsById: (termId: string) => ({
    queryKey: ['terms', termId],
    queryFn: () => getTermById(termId),
  }),
})

export const schoolKeys = createQueryKeys('school', {
  schoolLink: (schoolId: string) => ({
    queryKey: [schoolId, 'link'],
    queryFn: () => getSchoolLink(schoolId),
  }),
  gisuList: () => ({
    queryKey: ['gisu'],
    queryFn: () => getGisuList(),
  }),
  activeGisu: () => ({
    queryKey: ['gisu', 'active'],
    queryFn: () => getActiveGisu(),
  }),
})
