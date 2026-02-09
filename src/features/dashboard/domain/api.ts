import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

import type { GetMyApplicationResponseDTO } from './types'

/** GET /recruitments/me/applications - 내 지원 목록 조회 */
export const getMyApplications = async (): Promise<
  CommonResponseDTO<GetMyApplicationResponseDTO>
> => {
  const { data } = await axiosInstance.get('/recruitments/me/applications')
  return data
}
