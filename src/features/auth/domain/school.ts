import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

export interface SchoolSearchPage {
  schools: Array<{
    schoolId: string
    schoolName: string
  }>
}

export const searchSchools = async () => {
  const response = await axiosInstance.get<CommonResponseDTO<SchoolSearchPage>>('/schools/all')

  return response.data.result
}
