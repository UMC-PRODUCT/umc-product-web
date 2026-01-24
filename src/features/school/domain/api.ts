import { axiosInstance } from '@/api/axiosInstance'

import type {
  GetRecruitmentNoticesResponseDTO,
  GetRecruitmentSchedulesResponseDTO,
  GetRecruitmentsRequestDTO,
  GetRecruitmentsResponseDTO,
  GetTempSavedRecruitmentResponseDTO,
  PatchTempSavedRecruitQuestionsRequestDTO,
  PatchTempSavedRecruitQuestionsResponseDTO,
  PatchTempSaveRecruitmentRequestDTO,
  PatchTempSaveRecruitmentResponseDTO,
  PostFirstRecruitmentRequestDTO,
  PostFirstRecruitmentResponseDTO,
} from './types'

export const postFirstRecruitment = async (
  requestBody: PostFirstRecruitmentRequestDTO,
): Promise<PostFirstRecruitmentResponseDTO> => {
  const { data } = await axiosInstance.post('/recruitments', {
    requestBody,
  })
  return data
}

export const patchTempSaveRecruitment = async (
  recruitingId: string,
  requestBody: PatchTempSaveRecruitmentRequestDTO,
): Promise<PatchTempSaveRecruitmentResponseDTO> => {
  const { data } = await axiosInstance.patch(`/recruitments/${recruitingId}`, {
    requestBody,
  })
  return data
}

export const patchTempSavedRecruitQuestions = async (
  recruitingId: string,
  requestBody: PatchTempSavedRecruitQuestionsRequestDTO,
): Promise<PatchTempSavedRecruitQuestionsResponseDTO> => {
  const { data } = await axiosInstance.patch(`/recruitments/${recruitingId}/application-form`, {
    requestBody,
  })
  return data
}

export const getRecruitments = async (
  params: GetRecruitmentsRequestDTO,
): Promise<GetRecruitmentsResponseDTO> => {
  const { data } = await axiosInstance.get(`/recruitments`, {
    params,
  })
  return data
}

export const getTempSavedRecruitment = async (
  recruitingId: string,
): Promise<GetTempSavedRecruitmentResponseDTO> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}`)
  return data
}

export const getRecruitmentSchedules = async (
  recruitingId: string,
): Promise<GetRecruitmentSchedulesResponseDTO> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/schedules`)
  return data
}

export const getRecruitmentNotices = async (
  recruitingId: string,
): Promise<GetRecruitmentNoticesResponseDTO> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/notices`)
  return data
}

export const postRecruitmentPublish = async (
  recruitingId: string,
): Promise<PostFirstRecruitmentResponseDTO> => {
  const { data } = await axiosInstance.post(`/recruitments/${recruitingId}/publish`)
  return data
}
