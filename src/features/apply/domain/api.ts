import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

import type {
  GetMyApplicationStatusResponseDTO,
  GetRecruitmentApplicationAnswerResponseDTO,
  GetRecruitmentApplicationFormResponseDTO,
  GetRecruitmentNoticeResponseDTO,
  GetRecruitmentPartsResponseDTO,
  GetRecruitmentSchedulesResponseDTO,
  PatchRecruitmentApplicationAnswersRequestDTO,
  PatchRecruitmentApplicationAnswersResponseDTO,
  PostRecruitmentApplicationDraftResetResponseDTO,
  PostRecruitmentApplicationDraftResponseDTO,
  PostRecruitmentApplicationSubmitResponseDTO,
} from './model'

/** GET /recruitments/active-id - 현재 활성 모집 ID 조회 */
export const getActiveRecruitmentId = async (): Promise<
  CommonResponseDTO<{ recruitmentId: string }>
> => {
  const { data } = await axiosInstance.get('/recruitments/active-id')
  return data
}

/** GET /recruitments/{recruitmentId}/application-form - 지원서 폼 조회 */
export const getRecruitmentApplicationForm = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetRecruitmentApplicationFormResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/application-form`)
  return data
}

/** GET /recruitments/{recruitmentId}/applications/{formResponseId} - 지원서 답변 조회 */
export const getRecruitmentApplicationAnswer = async (
  recruitmentId: string,
  formResponseId: string,
): Promise<CommonResponseDTO<GetRecruitmentApplicationAnswerResponseDTO>> => {
  const { data } = await axiosInstance.get(
    `/recruitments/${recruitmentId}/applications/${formResponseId}`,
  )
  return data
}
/** GET /recruitments/{recruitmentId}/parts - 모집 파트 목록 조회 */
export const getRecruitmentParts = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetRecruitmentPartsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/parts`)
  return data
}
/** GET /recruitments/{recruitmentId}/schedules - 모집 일정 조회 */
export const getRecruitmentSchedules = async (
  recruitingId: string,
): Promise<CommonResponseDTO<GetRecruitmentSchedulesResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitingId}/schedules`)
  return data
}

/** GET /recruitments/{recruitmentId}/notice - 모집 공지 조회 */
export const getRecruitmentNotice = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetRecruitmentNoticeResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/${recruitmentId}/notice`)
  return data
}
/** GET /recruitments/me/{recruitmentId}/applications - 내 지원 상태 조회 */
export const getMyApplicationStatus = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<GetMyApplicationStatusResponseDTO>> => {
  const { data } = await axiosInstance.get(`/recruitments/me/${recruitmentId}/applications`)
  return data
}
/** POST /recruitments/{recruitmentId}/applications/{formResponseId}/submit - 지원서 제출 */
export const postRecruitmentApplicationSubmit = async (
  recruitmentId: string,
  formResponseId: string,
): Promise<CommonResponseDTO<PostRecruitmentApplicationSubmitResponseDTO>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/applications/${formResponseId}/submit`,
  )
  return data
}
/** POST /recruitments/{recruitmentId}/applications/draft - 지원서 초안 생성 */
export const postRecruitmentApplicationDraft = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<PostRecruitmentApplicationDraftResponseDTO>> => {
  const { data } = await axiosInstance.post(`/recruitments/${recruitmentId}/applications/draft`)
  return data
}
/** POST /recruitments/{recruitmentId}/applications/draft/reset - 지원서 초안 리셋 */
export const postRecruitmentApplicationDraftReset = async (
  recruitmentId: string,
): Promise<CommonResponseDTO<PostRecruitmentApplicationDraftResetResponseDTO>> => {
  const { data } = await axiosInstance.post(
    `/recruitments/${recruitmentId}/applications/draft/reset`,
  )
  return data
}

/** PATCH /recruitments/{recruitmentId}/applications/{formResponseId}/answers - 지원서 답변 저장 */
export const patchRecruitmentApplicationAnswers = async ({
  recruitmentId,
  formResponseId,
  items,
}: PatchRecruitmentApplicationAnswersRequestDTO): Promise<
  CommonResponseDTO<PatchRecruitmentApplicationAnswersResponseDTO>
> => {
  const { data } = await axiosInstance.patch(
    `/recruitments/${recruitmentId}/applications/${formResponseId}/answers`,
    { items },
  )
  return data
}
