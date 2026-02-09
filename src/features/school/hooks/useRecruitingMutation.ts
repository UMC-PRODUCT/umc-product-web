import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteRecruitment,
  deleteRecruitmentQuestion,
  deleteRecruitmentQuestionOption,
  patchDocumentEvaluationMyAnswer,
  patchDocumentSelectionStatus,
  patchRecruitmentApplicationFormDraft,
  patchRecruitmentDraft,
  patchRecruitmentPublished,
  postRecruitmentCreate,
  postRecruitmentPublish,
} from '../domain/api'
import type {
  PatchRecruitmentApplicationFormDraftRequestDTO,
  PatchRecruitmentDraftRequestDTO,
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
  }
}
