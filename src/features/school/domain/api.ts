import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonResponseDTO } from '@/shared/types/api'

import type {
  DeleteInterviewAssignApplicantsResponseDTO,
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
  GetFinalSelectionApplicationsRequestDTO,
  GetFinalSelectionApplicationsResponseDTO,
  GetInterviewAssignmentsResponseDTO,
  GetInterviewAvailablePartsResponseDTO,
  GetInterviewEvaluationMyAnswerResponseDTO,
  GetInterviewEvaluationOptionsResponseDTO,
  GetInterviewEvaluationSummaryResponseDTO,
  GetInterviewLiveQuestionsResponseDTO,
  GetInterviewQuestionsResponseDTO,
  GetInterviewSchedulingSlotApplicantsResponseDTO,
  GetInterviewSchedulingSummaryResponseDTO,
  GetInterviewSlotAssignmentsResponseDTO,
  GetInterviewSlotsResponseDTO,
  GetRecruitmentDashboardResponseDTO,
  GetRecruitmentDraftResponseDTO,
  GetRecruitmentNoticesResponseDTO,
  GetRecruitmentsRequestDTO,
  GetRecruitmentsResponseDTO,
  InterviewEvaluationViewResponseDTO,
  InterviewLiveQuestion,
  PatchDocumentEvaluationMyAnswerRequestDTO,
  PatchDocumentEvaluationMyAnswerResponseDTO,
  PatchDocumentSelectionStatusRequestDTO,
  PatchFinalSelectionStatusRequestDTO,
  PatchFinalSelectionStatusResponseDTO,
  PatchInterviewEvaluationMyAnswerRequestDTO,
  PatchInterviewEvaluationMyAnswerResponseDTO,
  PatchInterviewLiveQuestionRequestDTO,
  PatchInterviewLiveQuestionResponseDTO,
  PatchInterviewQuestionOrderRequestDTO,
  PatchInterviewQuestionRequestDTO,
  PatchRecruitmentApplicationFormDraftRequestDTO,
  PatchRecruitmentApplicationFormDraftResponseDTO,
  PatchRecruitmentDraftRequestDTO,
  PatchRecruitmentDraftResponseDTO,
  PatchRecruitmentPublishedRequestDTO,
  PostInterviewAssignApplicantsResponseDTO,
  PostInterviewLiveQuestionRequestDTO,
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

/** GET /recruitments/{recruitmentId}/applications/final-selections - 최종 선발 대상 리스트 조회 */
export const getFinalSelectionApplications = async (
  recruitmentId: string,
  params: GetFinalSelectionApplicationsRequestDTO,
): Promise<CommonResponseDTO<GetFinalSelectionApplicationsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/final-selections`,
    { params },
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/applications/{applicationId}/final-status - 최종 선발 단건 합격/합격 취소 */
export const patchFinalSelectionStatus = async (
  recruitmentId: string,
  applicationId: string,
  requestBody: PatchFinalSelectionStatusRequestDTO,
): Promise<CommonResponseDTO<PatchFinalSelectionStatusResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${applicationId}/final-status`,
    requestBody,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/evaluations/me - 내 면접 평가 제출/재제출 */
export const patchInterviewEvaluationMyAnswer = async (
  recruitmentId: string,
  assignmentId: string,
  requestBody: PatchInterviewEvaluationMyAnswerRequestDTO,
): Promise<CommonResponseDTO<PatchInterviewEvaluationMyAnswerResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/evaluations/me`,
    requestBody,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/evaluations/summary - 실시간 평가 현황 조회(평균/리스트) */
export const getInterviewEvaluationSummary = async (
  recruitmentId: string,
  assignmentId: string,
): Promise<CommonResponseDTO<GetInterviewEvaluationSummaryResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/evaluations/summary`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/view - 실시간 면접 평가 상세 화면 초기 진입 */
export const getInterviewEvaluationView = async (
  recruitmentId: string,
  assignmentId: string,
): Promise<CommonResponseDTO<InterviewEvaluationViewResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/view`,
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/assignments - 실시간 면접 평가 대상 리스트 조회 */
export const getInterviewAssignments = async (
  recruitmentId: string,
  params?: { date?: string; part?: PartType | 'ALL' },
): Promise<CommonResponseDTO<GetInterviewAssignmentsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/assignments`,
    { params },
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/options - 실시간 면접 평가용 드롭다운 옵션 조회 */
export const getInterviewEvaluationOptions = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetInterviewEvaluationOptionsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/interviews/options`)
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/evaluations/me - 내 면접 평가 조회 */
export const getInterviewEvaluationMyAnswer = async (
  recruitmentId: string,
  assignmentId: string,
): Promise<CommonResponseDTO<GetInterviewEvaluationMyAnswerResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/evaluations/me`,
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

/** GET /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/live-questions - 추가 질문(즉석 질문) 조회 */
export const getInterviewLiveQuestions = async (
  recruitmentId: string,
  assignmentId: string,
): Promise<CommonResponseDTO<GetInterviewLiveQuestionsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/live-questions`,
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

/** POST /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/live-questions - 추가 질문(즉석 질문) 등록 */
export const postInterviewLiveQuestion = async (
  recruitmentId: string,
  assignmentId: string,
  requestBody: PostInterviewLiveQuestionRequestDTO,
): Promise<CommonResponseDTO<InterviewLiveQuestion>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/live-questions`,
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

/** PATCH /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/live-questions/{liveQuestionId} - 추가 질문(즉석 질문) 수정 */
export const patchInterviewLiveQuestion = async (
  recruitmentId: string,
  assignmentId: string,
  liveQuestionId: string,
  requestBody: PatchInterviewLiveQuestionRequestDTO,
): Promise<CommonResponseDTO<PatchInterviewLiveQuestionResponseDTO>> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/live-questions/${liveQuestionId}`,
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

/** DELETE /recruitments/{recruitmentId}/interviews/assignments/{assignmentId}/live-questions/{liveQuestionId} - 추가 질문(즉석 질문) 삭제 */
export const deleteInterviewLiveQuestion = async (
  recruitmentId: string,
  assignmentId: string,
  liveQuestionId: string,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/interviews/assignments/${assignmentId}/live-questions/${liveQuestionId}`,
  )
  return data
}
/** GET /recruitments/{recruitmentId}/interview-sheets/slot-applicants - 특정 슬롯에 배정 가능한 지원자 / 이미 배정된 지원자 조회 */
export const getInterviewSchedulingSlotApplicants = async (
  recruitmentId: string,
  slotId: string,
  part?: PartType | 'ALL',
  keyword?: string,
): Promise<CommonResponseDTO<GetInterviewSchedulingSlotApplicantsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/scheduling/applicants`,
    { params: { slotId, part, keyword } },
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/scheduling/slots - 면접 슬롯 목록 조회 */
export const getInterviewSlots = async (
  recruitmentId: string,
  date?: string,
  part?: PartType | 'ALL',
): Promise<CommonResponseDTO<GetInterviewSlotsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/scheduling/slots`,
    {
      params: { date, part },
    },
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/scheduling/summary - 면접 스케줄링 요약 조회 */
export const getInterviewSchedulingSummary = async (
  recruitmentId: string,
  date?: string,
  part?: PartType | 'ALL',
): Promise<CommonResponseDTO<GetInterviewSchedulingSummaryResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/scheduling/summary`,
    {
      params: { date, part },
    },
  )
  return data
}

/** GET /recruitments/{recruitmentId}/interviews/scheduling/assignments - 특정 면접 슬롯에 배정된 지원자 조회 */
export const getInterviewSlotAssignments = async (
  recruitmentId: string,
  slotId: string,
): Promise<CommonResponseDTO<GetInterviewSlotAssignmentsResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/interviews/scheduling/assignments`,
    {
      params: { slotId },
    },
  )
  return data
}

/** POST /recruitments/{recruitmentId}/interviews/scheduling/assignments - 면접 슬롯에 지원자 배정 */
export const postInterviewAssignApplicants = async (
  recruitmentId: string,
  slotId: string,
  applicationId: string,
): Promise<CommonResponseDTO<PostInterviewAssignApplicantsResponseDTO>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/interviews/scheduling/assignments`,
    {
      applicationId,
      to: {
        slotId,
      },
    },
  )
  return data
}

/** DELETE /recruitments/{recruitmentId}/interviews/scheduling/assignments/{assignmentId} - 면접 슬롯에서 지원자 배정 해제 */
export const deleteInterviewAssignApplicants = async (
  recruitmentId: string,
  assignmentId: string,
): Promise<CommonResponseDTO<DeleteInterviewAssignApplicantsResponseDTO>> => {
  const { data } = await axiosInstance.delete(
    `/recruitments/${recruitmentId}/interviews/scheduling/assignments/${assignmentId}`,
  )
  return data
}
