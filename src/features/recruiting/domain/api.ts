import { axiosInstance } from '@/api/axiosInstance'

export const getRecruitmentSpecificPart = async ({
  recruitmentId,
}: {
  recruitmentId: string
}): Promise<void> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/parts`)
  return data
}
