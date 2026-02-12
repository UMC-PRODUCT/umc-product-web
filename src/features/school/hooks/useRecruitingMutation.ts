import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteInterviewAssignApplicants,
  deleteInterviewLiveQuestion,
  deleteInterviewQuestion,
  deleteRecruitment,
  deleteRecruitmentQuestion,
  deleteRecruitmentQuestionOption,
  patchDocumentEvaluationMyAnswer,
  patchDocumentSelectionStatus,
  patchFinalSelectionStatus,
  patchInterviewEvaluationMyAnswer,
  patchInterviewLiveQuestion,
  patchInterviewQuestion,
  patchInterviewQuestionOrder,
  patchRecruitmentApplicationFormDraft,
  patchRecruitmentDraft,
  patchRecruitmentPublished,
  postInterviewAssignApplicants,
  postInterviewLiveQuestion,
  postInterviewQuestion,
  postRecruitmentCreate,
  postRecruitmentPublish,
} from '../domain/api'
import type {
  PatchFinalSelectionStatusRequestDTO,
  PatchInterviewEvaluationMyAnswerRequestDTO,
  PatchInterviewLiveQuestionRequestDTO,
  PatchInterviewQuestionOrderRequestDTO,
  PatchInterviewQuestionRequestDTO,
  PatchRecruitmentApplicationFormDraftRequestDTO,
  PatchRecruitmentDraftRequestDTO,
  PostInterviewLiveQuestionRequestDTO,
  PostInterviewQuestionRequestDTO,
  PostRecruitmentPublishRequestDTO,
  RecruitmentEditable,
} from '../domain/model'

export function useRecruitingMutation() {
  // 모집 생성
  function usePostRecruitmentCreate() {
    return useCustomMutation(postRecruitmentCreate)
  }
  // 모집 임시저장
  function usePatchRecruitmentDraft(recruitingId: string) {
    return useCustomMutation((data: PatchRecruitmentDraftRequestDTO) =>
      patchRecruitmentDraft(recruitingId, data),
    )
  }
  // 지원서 폼 임시저장
  function usePatchRecruitmentApplicationFormDraft(recruitingId: string) {
    return useCustomMutation((data: PatchRecruitmentApplicationFormDraftRequestDTO) =>
      patchRecruitmentApplicationFormDraft(recruitingId, data),
    )
  }
  // 모집 삭제
  function useDeleteRecruitment(recruitingId: string) {
    return useCustomMutation(() => deleteRecruitment(recruitingId))
  }

  // 지원서 질문 삭제
  function useDeleteRecruitmentQuestion(recruitingId: string) {
    return useCustomMutation((questionId: string) =>
      deleteRecruitmentQuestion({ recruitmentId: recruitingId, questionId }),
    )
  }
  // 모집 게시
  function usePostRecruitmentPublish(recrutingId: string) {
    return useCustomMutation((requestBody: PostRecruitmentPublishRequestDTO) =>
      postRecruitmentPublish(recrutingId, requestBody),
    )
  }

  // 게시된 모집 수정
  function usePatchRecruitmentPublished(recruitmentId: string) {
    return useCustomMutation((requestBody: RecruitmentEditable) =>
      patchRecruitmentPublished({ recruitmentId, requestBody }),
    )
  }

  // 지원서 질문 옵션 삭제
  function useDeleteRecruitmentQuestionOption(recruitmentId: string) {
    return useCustomMutation(({ questionId, optionId }: { questionId: string; optionId: string }) =>
      deleteRecruitmentQuestionOption({ recruitmentId, questionId, optionId }),
    )
  }

  // 내 서류 평가 저장/제출
  function usePatchDocumentEvaluationMyAnswer(recruitmentId: string, applicantId: string) {
    return useCustomMutation(
      (answers: { action: 'DRAFT_SAVE' | 'SUBMIT'; score: string; comments: string }) =>
        patchDocumentEvaluationMyAnswer(recruitmentId, applicantId, answers),
    )
  }

  // 서류 합격 상태 변경
  function usePatchDocumentSelectionStatus(recruitmentId: string, applicantId: string) {
    return useCustomMutation((status: { decision: 'PASS' | 'FAIL' | 'WAIT' }) =>
      patchDocumentSelectionStatus(recruitmentId, applicantId, status),
    )
  }

  // 최종 합격 상태 변경
  function usePatchFinalSelectionStatus(recruitmentId: string) {
    return useCustomMutation(
      ({
        applicationId,
        requestBody,
      }: {
        applicationId: string
        requestBody: PatchFinalSelectionStatusRequestDTO
      }) => patchFinalSelectionStatus(recruitmentId, applicationId, requestBody),
    )
  }

  // 내 면접 평가 제출/재제출
  function usePatchInterviewEvaluationMyAnswer(recruitmentId: string, assignmentId: string) {
    return useCustomMutation((requestBody: PatchInterviewEvaluationMyAnswerRequestDTO) =>
      patchInterviewEvaluationMyAnswer(recruitmentId, assignmentId, requestBody),
    )
  }

  // 사전 면접 질문 등록
  function usePostInterviewQuestion() {
    return useCustomMutation(
      ({
        recruitmentId,
        requestBody,
      }: {
        recruitmentId: string
        requestBody: PostInterviewQuestionRequestDTO
      }) => postInterviewQuestion(recruitmentId, requestBody),
    )
  }

  // 즉석 질문 등록
  function usePostInterviewLiveQuestion() {
    return useCustomMutation(
      ({
        recruitmentId,
        assignmentId,
        requestBody,
      }: {
        recruitmentId: string
        assignmentId: string
        requestBody: PostInterviewLiveQuestionRequestDTO
      }) => postInterviewLiveQuestion(recruitmentId, assignmentId, requestBody),
    )
  }

  // 사전 면접 질문 수정
  function usePatchInterviewQuestion() {
    return useCustomMutation(
      ({
        recruitmentId,
        questionId,
        requestBody,
      }: {
        recruitmentId: string
        questionId: string
        requestBody: PatchInterviewQuestionRequestDTO
      }) => patchInterviewQuestion(recruitmentId, questionId, requestBody),
    )
  }

  // 즉석 질문 수정
  function usePatchInterviewLiveQuestion() {
    return useCustomMutation(
      ({
        recruitmentId,
        assignmentId,
        liveQuestionId,
        requestBody,
      }: {
        recruitmentId: string
        assignmentId: string
        liveQuestionId: string
        requestBody: PatchInterviewLiveQuestionRequestDTO
      }) => patchInterviewLiveQuestion(recruitmentId, assignmentId, liveQuestionId, requestBody),
    )
  }

  // 사전 면접 질문 순서 변경
  function usePatchInterviewQuestionOrder() {
    return useCustomMutation(
      ({
        recruitmentId,
        requestBody,
      }: {
        recruitmentId: string
        requestBody: PatchInterviewQuestionOrderRequestDTO
      }) => patchInterviewQuestionOrder(recruitmentId, requestBody),
    )
  }

  // 사전 면접 질문 삭제
  function useDeleteInterviewQuestion() {
    return useCustomMutation(
      ({ recruitmentId, questionId }: { recruitmentId: string; questionId: string }) =>
        deleteInterviewQuestion(recruitmentId, questionId),
    )
  }

  // 즉석 질문 삭제
  function useDeleteInterviewLiveQuestion() {
    return useCustomMutation(
      ({
        recruitmentId,
        assignmentId,
        liveQuestionId,
      }: {
        recruitmentId: string
        assignmentId: string
        liveQuestionId: string
      }) => deleteInterviewLiveQuestion(recruitmentId, assignmentId, liveQuestionId),
    )
  }

  // 면접 슬롯 배정
  function usePostInterviewAssignApplicants() {
    return useCustomMutation(
      ({
        recruitmentId,
        slotId,
        applicationId,
      }: {
        recruitmentId: string
        slotId: string
        applicationId: string
      }) => postInterviewAssignApplicants(recruitmentId, slotId, applicationId),
    )
  }

  // 면접 슬롯 배정 취소
  function useDeleteInterviewAssignApplicants() {
    return useCustomMutation(
      ({ recruitmentId, assignmentId }: { recruitmentId: string; assignmentId: string }) =>
        deleteInterviewAssignApplicants(recruitmentId, assignmentId),
    )
  }

  return {
    usePostRecruitmentCreate,
    usePatchRecruitmentDraft,
    usePatchRecruitmentApplicationFormDraft,
    useDeleteRecruitment,
    useDeleteRecruitmentQuestion,
    usePostRecruitmentPublish,
    usePatchRecruitmentPublished,
    useDeleteRecruitmentQuestionOption,
    usePatchDocumentEvaluationMyAnswer,
    usePatchDocumentSelectionStatus,
    usePatchFinalSelectionStatus,
    usePatchInterviewEvaluationMyAnswer,
    usePostInterviewQuestion,
    usePostInterviewLiveQuestion,
    usePatchInterviewQuestion,
    usePatchInterviewLiveQuestion,
    usePatchInterviewQuestionOrder,
    useDeleteInterviewQuestion,
    useDeleteInterviewLiveQuestion,
    usePostInterviewAssignApplicants,
    useDeleteInterviewAssignApplicants,
  }
}
