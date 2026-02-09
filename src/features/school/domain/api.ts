import { axiosInstance } from '@/api/axiosInstance'
import type {
  GetApplicationsAnswerResponseDTO,
  GetDocumentEvaluationApplicationResponseDTO,
} from '@/features/apply/domain/model'
import type { PartType } from '@/features/auth/domain'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { FinalSelectionsSortType } from '@/shared/types/umc'

import type {
  DeleteSingleQuestionResponseDTO,
  GetAllDocsApplicantsResponseDTO,
  GetApplicationFormResponseDTO,
  GetDashboardResponseDTO,
  GetDocsMyEvaluationResponseDTO,
  GetRecruitmentNoticesResponseDTO,
  GetRecruitmentsRequestDTO,
  GetRecruitmentsResponseDTO,
  GetTempSavedRecruitmentResponseDTO,
  PatchDocsMyEvaluationResponseDTO,
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

export const getDashboardSummary = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetDashboardResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/dashboard`)
  return data
}

export const deleteOption = async ({
  recruitmentId,
  questionId,
  optionId,
}: {
  recruitmentId: string
  questionId: string
  optionId: string
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/application-form/questions/${questionId}/options/${optionId}`,
  )
  return data
}

export const getDocumentAllApplicants = async (
  recruitmentId: string,
  params: {
    part: PartType | 'ALL'
    keyword: string
    page: string
    size: string
  },
): Promise<CommonResponseDTO<GetAllDocsApplicantsResponseDTO>> => {
  const { part, ...restParams } = params
  const requestParams = part === 'ALL' ? restParams : { ...restParams, part }
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/document-evaluations`,
    {
      params: requestParams,
    },
  )
  return data
}

export const getDocumentEvaluationApplication = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetDocumentEvaluationApplicationResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluation`,
  )
  return data
}

export const getDocumentEvaluationAnswers = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetApplicationsAnswerResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations`,
  )
  return data
}

export const getDocumentEvaluationAnswerMe = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetDocsMyEvaluationResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations/me`,
  )
  return data
}

export const getDocumentSelectedApplicants = async (
  recruitmentId: string,
  params: {
    part: PartType
    page: string
    size: string
    sort: FinalSelectionsSortType
  },
): Promise<CommonResponseDTO<GetAllDocsApplicantsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/document-selections`,
    {
      params,
    },
  )
  return data
}

export const patchMyDocumentEvaluationAnswer = async (
  recruitmentId: string,
  applicationId: string,
  requestBody: {
    score: string
    comments: string
    action: 'DRAFT_SAVE' | 'SUBMIT'
  },
): Promise<CommonResponseDTO<PatchDocsMyEvaluationResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations/me`,
    requestBody,
  )
  return data
}
