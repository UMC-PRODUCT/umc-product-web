import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteInterviewQuestion,
  deleteRecruitment,
  deleteRecruitmentQuestion,
  deleteRecruitmentQuestionOption,
  patchDocumentEvaluationMyAnswer,
  patchDocumentSelectionStatus,
  patchInterviewQuestion,
  patchInterviewQuestionOrder,
  patchRecruitmentApplicationFormDraft,
  patchRecruitmentDraft,
  patchRecruitmentPublished,
  postInterviewQuestion,
  postRecruitmentCreate,
  postRecruitmentPublish,
} from '../domain/api'
import type {
  PatchInterviewQuestionOrderRequestDTO,
  PatchInterviewQuestionRequestDTO,
  PatchRecruitmentApplicationFormDraftRequestDTO,
  PatchRecruitmentDraftRequestDTO,
  PostInterviewQuestionRequestDTO,
  PostRecruitmentPublishRequestDTO,
  RecruitmentEditable,
} from '../domain/model'

export function useRecruitingMutation() {
  function usePostRecruitmentCreate() {
    return useCustomMutation(postRecruitmentCreate)
  }
  function usePatchRecruitmentDraft(recruitingId: string) {
    return useCustomMutation((data: PatchRecruitmentDraftRequestDTO) =>
      patchRecruitmentDraft(recruitingId, data),
    )
  }
  function usePatchRecruitmentApplicationFormDraft(recruitingId: string) {
    return useCustomMutation((data: PatchRecruitmentApplicationFormDraftRequestDTO) =>
      patchRecruitmentApplicationFormDraft(recruitingId, data),
    )
  }
  function useDeleteRecruitment(recruitingId: string) {
    return useCustomMutation(() => deleteRecruitment(recruitingId))
  }

  function useDeleteRecruitmentQuestion(recruitingId: string) {
    return useCustomMutation((questionId: string) =>
      deleteRecruitmentQuestion({ recruitmentId: recruitingId, questionId }),
    )
  }
  function usePostRecruitmentPublish(recrutingId: string) {
    return useCustomMutation((requestBody: PostRecruitmentPublishRequestDTO) =>
      postRecruitmentPublish(recrutingId, requestBody),
    )
  }

  function usePatchRecruitmentPublished(recruitmentId: string) {
    return useCustomMutation((requestBody: RecruitmentEditable) =>
      patchRecruitmentPublished({ recruitmentId, requestBody }),
    )
  }

  function useDeleteRecruitmentQuestionOption(recruitmentId: string) {
    return useCustomMutation(({ questionId, optionId }: { questionId: string; optionId: string }) =>
      deleteRecruitmentQuestionOption({ recruitmentId, questionId, optionId }),
    )
  }

  function usePatchDocumentEvaluationMyAnswer(recruitmentId: string, applicantId: string) {
    return useCustomMutation(
      (answers: { action: 'DRAFT_SAVE' | 'SUBMIT'; score: string; comments: string }) =>
        patchDocumentEvaluationMyAnswer(recruitmentId, applicantId, answers),
    )
  }

  function usePatchDocumentSelectionStatus(recruitmentId: string, applicantId: string) {
    return useCustomMutation((status: { decision: 'PASS' | 'FAIL' | 'WAIT' }) =>
      patchDocumentSelectionStatus(recruitmentId, applicantId, status),
    )
  }

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

  function useDeleteInterviewQuestion() {
    return useCustomMutation(
      ({ recruitmentId, questionId }: { recruitmentId: string; questionId: string }) =>
        deleteInterviewQuestion(recruitmentId, questionId),
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
    usePostInterviewQuestion,
    usePatchInterviewQuestion,
    usePatchInterviewQuestionOrder,
    useDeleteInterviewQuestion,
  }
}
