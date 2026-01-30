import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteRecruitment,
  deleteSingleQuestion,
  patchTempSavedRecruitQuestions,
  patchTempSaveRecruitment,
  postFirstRecruitment,
  postRecruitmentPublish,
} from '../domain/api'
import type {
  PatchTempSavedRecruitQuestionsRequestDTO,
  PatchTempSaveRecruitmentRequestDTO,
  PostRecruitmentRequestPublishDTO,
} from '../domain/apiTypes'

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
  return {
    usePostFirstRecruitment,
    usePatchTempSaveRecruitment,
    usePatchTempSavedRecruitQuestions,
    useDeleteRecruitment,
    useDeleteSingleQuestion,
    usePostPublishRecruitment,
  }
}
