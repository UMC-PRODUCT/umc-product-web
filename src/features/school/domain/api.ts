import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

import type {
  DeleteSingleQuestionResponseDTO,
  GetApplicationFormResponseDTO,
  GetRecruitmentNoticesResponseDTO,
  GetRecruitmentsRequestDTO,
  GetRecruitmentsResponseDTO,
  GetTempSavedRecruitmentResponseDTO,
  patchPublishedRecruitmentRequestDTO,
  PatchTempSavedRecruitQuestionsRequestDTO,
  PatchTempSavedRecruitQuestionsResponseDTO,
  PatchTempSaveRecruitmentRequestDTO,
  PatchTempSaveRecruitmentResponseDTO,
  PostFirstRecruitmentResponseDTO,
  PostRecruitmentRequestPublishDTO,
} from './model'

export const postFirstRecruitment = async (): Promise<
  CommonResponseDTO<PostFirstRecruitmentResponseDTO>
> => {
  const { data } = await axiosInstance.post('/recruitments')
  return data
}

export const patchTempSaveRecruitment = async (
  recruitingId: string,
  requestBody: PatchTempSaveRecruitmentRequestDTO,
): Promise<CommonResponseDTO<PatchTempSaveRecruitmentResponseDTO>> => {
  const { data } = await axiosInstance.patch(`/recruitments/${recruitingId}`, requestBody)
  return data
}

export const patchTempSavedRecruitQuestions = async (
  recruitingId: string,
  requestBody: PatchTempSavedRecruitQuestionsRequestDTO,
): Promise<CommonResponseDTO<PatchTempSavedRecruitQuestionsResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitingId}/application-form`,
    requestBody,
  )
  return data
}
export const getTempSavedApplicationQuestions = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetApplicationFormResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/application-form/draft`)
  return data
}
export const getSavedApplicationQuestions = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetApplicationFormResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/application-form`)
  return data
}
export const getRecruitments = async (
  params: GetRecruitmentsRequestDTO,
): Promise<CommonResponseDTO<GetRecruitmentsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments`, {
    params,
  })
  return data
}

export const getTempSavedRecruitment = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetTempSavedRecruitmentResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}`)
  return data
}

export const getRecruitmentNotices = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetRecruitmentNoticesResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/notices`)
  return data
}

export const postRecruitmentPublish = async (
  recruitingId: string,
  requestBody: PostRecruitmentRequestPublishDTO,
): Promise<CommonResponseDTO<PostFirstRecruitmentResponseDTO>> => {
  const { data } = await axiosInstance.post(`/recruitments/${recruitingId}/publish`, requestBody)
  return data
}

export const deleteRecruitment = async (recruitingId: string) => {
  const { data } = await axiosInstance.delete(`/recruitments/${recruitingId}`)
  return data
}

export const deleteSingleQuestion = async ({
  recruitmentId,
  questionId,
}: {
  recruitmentId: string
  questionId: string
}): Promise<CommonResponseDTO<DeleteSingleQuestionResponseDTO>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/application-form/questions/${questionId}`,
  )
  return data
}

export const patchPublishedRecruitment = async ({
  recruitmentId,
  requestBody,
}: patchPublishedRecruitmentRequestDTO) => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/published`,
    requestBody,
  )
  return data
}
