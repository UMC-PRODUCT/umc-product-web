import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { SchoolListResponseDTO } from '@/shared/types/school'

/** GET /schools/all - 전체 학교 목록 조회 */
export const getAllSchools = async (): Promise<CommonResponseDTO<SchoolListResponseDTO>> => {
  const { data } = await axiosInstance.get('/schools/all')
  return data
}
