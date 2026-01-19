import type { AxiosRequestConfig } from 'axios'

import { axiosInstance } from '@/api/axiosInstance'

export interface SchoolSearchParams {
  keyword?: string
  page?: number
  size?: number
}

export interface SchoolSearchPage {
  content: Array<{
    id: number | string
    name: string
  }>
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export const searchSchools = async (
  { keyword, page = 0, size = 20 }: SchoolSearchParams,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.get<SchoolSearchPage>('/admin/schools', {
    ...config,
    params: {
      page,
      size,
      keyword,
      ...config?.params,
    },
  })

  return response.data
}
