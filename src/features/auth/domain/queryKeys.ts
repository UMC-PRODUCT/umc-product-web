import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsType } from '@/shared/types/umc'

import {
  getActiveGisu,
  getGisuList,
  getMemberMe,
  getMemberOAuthMe,
  getSchoolLink,
  getTermsById,
  getTermsByType,
} from './api'

export const authKeys = createQueryKeys('auth', {
  /** GET /terms/type/{termsType} */
  getTermsByType: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => getTermsByType({ termsType }),
  }),
  /** GET /member/me */
  getMemberMe: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => getMemberMe(),
  }),
  /** GET /terms/{termId} */
  getTermsById: (termId: string) => ({
    queryKey: ['terms', termId],
    queryFn: () => getTermsById(termId),
  }),
  /** GET /member-oauth/me */
  getMemberOAuthMe: () => ({
    queryKey: ['member', 'oauth', 'me'],
    queryFn: () => getMemberOAuthMe(),
  }),
})

export const schoolKeys = createQueryKeys('school', {
  /** GET /schools/link/{schoolId} */
  getSchoolLink: (schoolId: string) => ({
    queryKey: [schoolId, 'link'],
    queryFn: () => getSchoolLink(schoolId),
  }),
  /** GET /gisu/all */
  getGisuList: () => ({
    queryKey: ['gisu'],
    queryFn: () => getGisuList(),
  }),
  /** GET /gisu/active */
  getActiveGisu: () => ({
    queryKey: ['gisu', 'active'],
    queryFn: () => getActiveGisu(),
  }),
})
