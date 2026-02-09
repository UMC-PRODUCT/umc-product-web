import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteOption,
  deleteRecruitment,
  deleteSingleQuestion,
  patchDocsApplicationStatus,
  patchMyDocumentEvaluationAnswer,
  patchPublishedRecruitment,
  patchTempSavedRecruitQuestions,
  patchTempSaveRecruitment,
  postFirstRecruitment,
  postRecruitmentPublish,
} from '../domain/api'
import type {
  PatchTempSavedRecruitQuestionsRequestDTO,
  PatchTempSaveRecruitmentRequestDTO,
  PostRecruitmentRequestPublishDTO,
  RecruitmentEditable,
} from '../domain/model'

export function useRecruitingMutation() {
  function usePostFirstRecruitment() {
    return useCustomMutation(postFirstRecruitment)
  }
  function usePatchTempSaveRecruitment(recruitingId: string) {
    return useCustomMutation((data: PatchTempSaveRecruitmentRequestDTO) =>
      patchTempSaveRecruitment(recruitingId, data),
    )
  }
  function usePatchTempSavedRecruitQuestions(recruitingId: string) {
    return useCustomMutation((data: PatchTempSavedRecruitQuestionsRequestDTO) =>
      patchTempSavedRecruitQuestions(recruitingId, data),
    )
  }
  function useDeleteRecruitment(recruitingId: string) {
    return useCustomMutation(() => deleteRecruitment(recruitingId))
  }

  function useDeleteSingleQuestion(recruitingId: string) {
    return useCustomMutation((questionId: string) =>
      deleteSingleQuestion({ recruitmentId: recruitingId, questionId }),
    )
  }
  function usePostPublishRecruitment(recrutingId: string) {
    return useCustomMutation((requestBody: PostRecruitmentRequestPublishDTO) =>
      postRecruitmentPublish(recrutingId, requestBody),
    )
  }

  function usePatchPublishedRecruitment(recruitmentId: string) {
    return useCustomMutation((requestBody: RecruitmentEditable) =>
      patchPublishedRecruitment({ recruitmentId, requestBody }),
    )
  }

  function useDeleteQuestionOption(recruitmentId: string) {
    return useCustomMutation(({ questionId, optionId }: { questionId: string; optionId: string }) =>
      deleteOption({ recruitmentId, questionId, optionId }),
    )
  }

  function usePatchDocsEvaluationAnswerMe(recruitmentId: string, applicantId: string) {
    return useCustomMutation(
      (answers: { action: 'DRAFT_SAVE' | 'SUBMIT'; score: string; comments: string }) =>
        patchMyDocumentEvaluationAnswer(recruitmentId, applicantId, answers),
    )
  }

  function usePatchDocsApplicationStatus(recruitmentId: string, applicantId: string) {
    return useCustomMutation((status: { decision: 'PASS' | 'FAIL' | 'WAIT' }) =>
      patchDocsApplicationStatus(recruitmentId, applicantId, status),
    )
  }
  return {
    usePostFirstRecruitment,
    usePatchTempSaveRecruitment,
    usePatchTempSavedRecruitQuestions,
    useDeleteRecruitment,
    useDeleteSingleQuestion,
    usePostPublishRecruitment,
    usePatchPublishedRecruitment,
    useDeleteQuestionOption,
    usePatchDocsEvaluationAnswerMe,
    usePatchDocsApplicationStatus,
  }
}
