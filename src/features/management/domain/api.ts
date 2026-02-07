import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonResponseDTO } from '@/shared/types/api'

import type { Curriculum } from './model'

export const getCurriculums = async (params: {
  part: PartType
}): Promise<CommonResponseDTO<Curriculum>> => {
  const { data } = await axiosInstance.get('/curriculums', { params })
  return data
}
