import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'

import type { CommonResponseDTO } from '../types/api'

export type TermsRequestDTO = {
  termsType: 'SERVICE' | 'PRIVACY' | 'MARKETING'
}
export type TermsResponseDTO = CommonResponseDTO<{
  id: number
  title: string
  content: string
  isMandatory: boolean
}>

export async function getTermsId(requestBody: TermsRequestDTO): Promise<TermsResponseDTO> {
  const { data } = await axiosInstance.get(`/terms/type/${requestBody.termsType}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}
