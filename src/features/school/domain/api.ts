import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonResponseDTO } from '@/shared/types/api'

import type {
  DeleteRecruitmentQuestionOptionRequestDTO,
  DeleteRecruitmentQuestionRequestDTO,
  DeleteRecruitmentQuestionResponseDTO,
  GetDocumentEvaluationAnswersResponseDTO,
  GetDocumentEvaluationApplicantsRequestDTO,
  GetDocumentEvaluationApplicantsResponseDTO,
  GetDocumentEvaluationApplicationResponseDTO,
  GetDocumentEvaluationMyAnswerResponseDTO,
  GetDocumentSelectedApplicantsRequestDTO,
  GetDocumentSelectedApplicantsResponseDTO,
  GetInterviewAvailablePartsResponseDTO,
  GetInterviewQuestionsResponseDTO,
  GetRecruitmentDashboardResponseDTO,
  GetRecruitmentDraftResponseDTO,
  GetRecruitmentNoticesResponseDTO,
  GetRecruitmentsRequestDTO,
  GetRecruitmentsResponseDTO,
  PatchDocumentEvaluationMyAnswerRequestDTO,
  PatchDocumentEvaluationMyAnswerResponseDTO,
  PatchDocumentSelectionStatusRequestDTO,
  PatchInterviewQuestionOrderRequestDTO,
  PatchInterviewQuestionRequestDTO,
  PatchRecruitmentApplicationFormDraftRequestDTO,
  PatchRecruitmentApplicationFormDraftResponseDTO,
  PatchRecruitmentDraftRequestDTO,
  PatchRecruitmentDraftResponseDTO,
  PatchRecruitmentPublishedRequestDTO,
  PostInterviewQuestionRequestDTO,
  PostRecruitmentCreateResponseDTO,
  PostRecruitmentPublishRequestDTO,
} from './model'

/** POST /recruitments - 모집 생성 (초기) */
export const postRecruitmentCreate = async (): Promise<
  CommonResponseDTO<PostRecruitmentCreateResponseDTO>
> => {
  const { data } = await axiosInstance.post('/recruitments')
  return data
}

/** PATCH /recruitments/{recruitingId} - 모집 임시저장 */
export const patchRecruitmentDraft = async (
  recruitingId: string,
  requestBody: PatchRecruitmentDraftRequestDTO,
): Promise<CommonResponseDTO<PatchRecruitmentDraftResponseDTO>> => {
  const { data } = await axiosInstance.patch(`/recruitments/${recruitingId}`, requestBody)
  return data
}

/** PATCH /recruitments/{recruitingId}/application-form - 지원서 폼 임시저장 */
export const patchRecruitmentApplicationFormDraft = async (
  recruitingId: string,
  requestBody: PatchRecruitmentApplicationFormDraftRequestDTO,
): Promise<CommonResponseDTO<PatchRecruitmentApplicationFormDraftResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitingId}/application-form`,
    requestBody,
  )
  return data
}
/** GET /recruitments/{recruitingId}/application-form/draft - 지원서 폼 임시저장 조회 */
export const getRecruitmentApplicationFormDraft = async (
  recruitingId: string,
): Promise<CommonResponseDTO<PatchRecruitmentApplicationFormDraftResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/application-form/draft`)
  return data
}
/** GET /recruitments - 모집 리스트 조회 */
export const getRecruitments = async (
  params: GetRecruitmentsRequestDTO,
): Promise<CommonResponseDTO<GetRecruitmentsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments`, {
    params,
  })
  return data
}

/** GET /recruitments/{recruitingId} - 모집 임시저장 조회 */
export const getRecruitmentDraft = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetRecruitmentDraftResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}`)
  return data
}

/** GET /recruitments/{recruitingId}/notices - 모집 공지 목록 조회 */
export const getRecruitmentNotices = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetRecruitmentNoticesResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/notices`)
  return data
}

/** POST /recruitments/{recruitingId}/publish - 모집 게시 */
export const postRecruitmentPublish = async (
  recruitingId: string,
  requestBody: PostRecruitmentPublishRequestDTO,
): Promise<CommonResponseDTO<PostRecruitmentCreateResponseDTO>> => {
  const { data } = await axiosInstance.post(`/recruitments/${recruitingId}/publish`, requestBody)
  return data
}

/** DELETE /recruitments/{recruitingId} - 모집 삭제 */
export const deleteRecruitment = async (recruitingId: string) => {
  const { data } = await axiosInstance.delete(`/recruitments/${recruitingId}`)
  return data
}

/** DELETE /recruitments/{recruitmentId}/application-form/questions/{questionId} - 질문 삭제 */
export const deleteRecruitmentQuestion = async ({
  recruitmentId,
  questionId,
}: DeleteRecruitmentQuestionRequestDTO): Promise<
  CommonResponseDTO<DeleteRecruitmentQuestionResponseDTO>
> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/application-form/questions/${questionId}`,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/published - 게시된 모집 수정 */
export const patchRecruitmentPublished = async ({
  recruitmentId,
  requestBody,
}: PatchRecruitmentPublishedRequestDTO) => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/published`,
    requestBody,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/dashboard - 대시보드 요약 조회 */
export const getRecruitmentDashboardSummary = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetRecruitmentDashboardResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/dashboard`)
  return data
}

/** DELETE /recruitments/{recruitmentId}/application-form/questions/{questionId}/options/{optionId} - 옵션 삭제 */
export const deleteRecruitmentQuestionOption = async ({
  recruitmentId,
  questionId,
  optionId,
}: DeleteRecruitmentQuestionOptionRequestDTO): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/application-form/questions/${questionId}/options/${optionId}`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/applications/document-evaluations - 서류 평가 대상자 목록 */
export const getDocumentEvaluationApplicants = async (
  recruitmentId: string,
  params: GetDocumentEvaluationApplicantsRequestDTO,
): Promise<CommonResponseDTO<GetDocumentEvaluationApplicantsResponseDTO>> => {
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

/** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluation - 지원서 상세 조회(서류 평가용) */
export const getDocumentEvaluationApplicationDetail = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetDocumentEvaluationApplicationResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluation`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations - 서류 평가 답변 목록 */
export const getDocumentEvaluationAnswers = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetDocumentEvaluationAnswersResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations/me - 내 서류 평가 조회 */
export const getDocumentEvaluationMyAnswer = async (
  recruitmentId: string,
  applicationId: string,
): Promise<CommonResponseDTO<GetDocumentEvaluationMyAnswerResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations/me`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/applications/document-selections - 서류 합격 대상자 목록 */
export const getDocumentSelectedApplicants = async (
  recruitmentId: string,
  params: GetDocumentSelectedApplicantsRequestDTO,
): Promise<CommonResponseDTO<GetDocumentSelectedApplicantsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/document-selections`,
    {
      params,
    },
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations/me - 내 서류 평가 저장/제출 */
export const patchDocumentEvaluationMyAnswer = async (
  recruitmentId: string,
  applicationId: string,
  requestBody: PatchDocumentEvaluationMyAnswerRequestDTO,
): Promise<CommonResponseDTO<PatchDocumentEvaluationMyAnswerResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-evaluations/me`,
    requestBody,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/applications/{applicationId}/document-status - 서류 합격 상태 변경 */
export const patchDocumentSelectionStatus = async (
  recruitmentId: string,
  applicationId: string,
  requestBody: PatchDocumentSelectionStatusRequestDTO,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${applicationId}/document-status`,
    requestBody,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interview-sheets/questions - 면접 질문지(사전 질문) 조회 */
export const getInterviewQuestions = async (
  recruitmentId: string,
  part: PartType | 'COMMON',
): Promise<CommonResponseDTO<GetInterviewQuestionsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interview-sheets/questions`,
    {
      params: { part },
    },
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interview-sheets/parts - 면접 질문지 작성 가능 파트 조회 */
export const getAvailableInterviewParts = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetInterviewAvailablePartsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/interview-sheets/parts`)
  return data
}

/** POST /recruitments/{recruitmentId}/interview-sheets/questions - 면접 질문지 등록 */
export const postInterviewQuestion = async (
  recruitmentId: string,
  requestBody: PostInterviewQuestionRequestDTO,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/interview-sheets/questions`,
    requestBody,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/interview-sheets/questions/{questionId} - 면접 질문지 수정 */
export const patchInterviewQuestion = async (
  recruitmentId: string,
  questionId: string,
  requestBody: PatchInterviewQuestionRequestDTO,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/interview-sheets/questions/${questionId}`,
    requestBody,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/interview-sheets/questions/reorder - 면접 질문지 순서 변경 */
export const patchInterviewQuestionOrder = async (
  recruitmentId: string,
  requestBody: PatchInterviewQuestionOrderRequestDTO,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/interview-sheets/questions/reorder`,
    requestBody,
  )
  return data
}

/** DELETE /recruitments/{recruitmentId}/interview-sheets/questions/{questionId} - 면접 질문지 삭제 */
export const deleteInterviewQuestion = async (
  recruitmentId: string,
  questionId: string,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/interview-sheets/questions/${questionId}`,
  )
  return data
}
