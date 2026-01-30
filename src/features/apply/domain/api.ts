import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

import type {
  GetApplicationAnswerResponseDTO,
  GetApplicationFormResponseDTO,
  GetMyApplicationStatusResponseDTO,
  GetRecruitmentNotice,
  GetRecruitmentSchedulesResponseDTO,
  GetSpecificPartRecruiting,
  PostFirstDraftResponseDTO,
  PostResetDraftResponseDTO,
  PostSubmitApplicationResponseDTO,
} from './model'

export const getActiveRecruitmentId = async (): Promise<
  CommonResponseDTO<{ recruitmentId: string }>
> => {
  const { data } = await axiosInstance.get('/recruitments/active-id')
  return data
}

export const getApplicationForm = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetApplicationFormResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/application-form`)
  return data
}

export const getApplicationAnswer = async (
  recruitmentId: string,
  formResponseId: string,
): Promise<CommonResponseDTO<GetApplicationAnswerResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${formResponseId}`,
  )
  return data
}
export const getSpecificPartRecruiting = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetSpecificPartRecruiting>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/parts`)
  return data
}
export const getRecruitmentSchedules = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetRecruitmentSchedulesResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/schedules`)
  return data
}

export const getRecruitmentNotice = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetRecruitmentNotice>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/notice`)
  return data
}
export const getMyApplicationStatus = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetMyApplicationStatusResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/me/${recruitmentId}/applications`)
  return data
}
export const postSubmitApplication = async (
  recruitmentId: string,
  formResponseId: string,
): Promise<CommonResponseDTO<PostSubmitApplicationResponseDTO>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/applications/${formResponseId}/submit`,
  )
  return data
}
export const postFirstDraftApplication = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<PostFirstDraftResponseDTO>> => {
  const { data } = await axiosInstance.post(`/recruitments/${recruitmentId}/applications/draft`)
  return data
}
export const postClearDraftApplication = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<PostResetDraftResponseDTO>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/applications/draft/reset`,
  )
  return data
}

export const patchSaveDraftApplication = async (
  recruitmentId: string,
  formResponseId: string,
  answers: Record<string, unknown>,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${formResponseId}/answers`,
    { answers },
  )
  return data
}
