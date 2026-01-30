import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

import type { GetMyApplicationResponseDTO } from './apiType'

export const getMyApplications = async (): Promise<
  CommonResponseDTO<GetMyApplicationResponseDTO>
> => {
  const { data } = await axiosInstance.get('/recruitments/me/applications')
  return data
}
