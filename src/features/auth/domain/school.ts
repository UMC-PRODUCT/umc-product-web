import type { AxiosRequestConfig } from 'axios'

import { axiosInstance } from '@/api/axiosInstance'

export interface SchoolSearchParams {
  keyword?: string
  page?: number
  size?: number
}

export interface SchoolSearchPage {
  content: Array<{
    schoolId: string
    schoolName: string
  }>
  page: string
  size: string
  totalPages: string
  totalElements: string
  hasNext: boolean
  hasPrevious: boolean
}

interface SchoolSearchResponse {
  success: boolean
  code: string
  message: string
  result: SchoolSearchPage
}

export const searchSchools = async (
  { keyword, page = 0, size = 20 }: SchoolSearchParams,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.get<SchoolSearchResponse>('/admin/schools', {
    ...config,
    params: {
      page,
      size,
      keyword,
      ...config?.params,
    },
  })

  return response.data.result
}
