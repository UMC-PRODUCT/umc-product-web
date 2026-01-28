// 약관 ID와 내용을 한 번에 가져오는 쿼리 훅

import type { TermsResponseDTO } from '@/shared/api/terms'
import { getTermsId } from '@/shared/api/terms'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import type { TermsType } from '@/shared/types/umc'

import type { TermsAgreementKey } from './index'

const TERMS_API_KEY_MAP: Record<TermsAgreementKey, TermsType> = {
  SERVICE: 'SERVICE',
  PRIVACY: 'PRIVACY',
  MARKETING: 'MARKETING',
}

const TERMS_CACHE_KEY = ['terms-ids'] as const

const fetchTermsIds = async () => {
  const entries = Object.entries(TERMS_API_KEY_MAP) as Array<[TermsAgreementKey, TermsType]>

  const responses = await Promise.all(entries.map(([, termsType]) => getTermsId({ termsType })))

  return entries.reduce<Record<TermsAgreementKey, TermsResponseDTO>>(
    (acc, [termKey], index) => {
      const response = responses[index]
      const parsedId = Number(response.result.id)
      if (Number.isNaN(parsedId)) {
        throw new Error(`Terms id for ${termKey} is missing`)
      }

      acc[termKey] = {
        ...response,
        result: {
          ...response.result,
          id: parsedId,
        },
      }
      return acc
    },
    {} as Record<TermsAgreementKey, TermsResponseDTO>,
  )
}

export const useTermsIds = () => {
  return useCustomQuery<Record<TermsAgreementKey, TermsResponseDTO>, Error>(
    TERMS_CACHE_KEY,
    fetchTermsIds,
    { retry: false },
  )
}
