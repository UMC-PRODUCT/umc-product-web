import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { components } from '@/shared/types/type'

type CommonResponseDTO<T> = {
  success: boolean
  code: string
  message: string
  result: T
}

export type TermsRequestDTO = {
  termsType: 'SERVICE' | 'PRIVACY' | 'MARKETING'
}
export type TermsResponseDTO = components['schemas']['TermsResponse']

export async function getTermsId(requestBody: TermsRequestDTO): Promise<TermsResponseDTO> {
  const { data } = await axiosInstance.get<CommonResponseDTO<TermsResponseDTO>>(
    `/terms/type/${requestBody.termsType}`,
    {
      headers: SKIP_AUTH_REDIRECT_HEADER,
    },
  )
  return data.result
}
