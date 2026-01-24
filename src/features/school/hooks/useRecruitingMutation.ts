import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  patchTempSavedRecruitQuestions,
  patchTempSaveRecruitment,
  postFirstRecruitment,
} from '../domain/api'
import type {
  PatchTempSavedRecruitQuestionsRequestDTO,
  PatchTempSaveRecruitmentRequestDTO,
} from '../domain/types'

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
  return {
    usePostFirstRecruitment,
    usePatchTempSaveRecruitment,
    usePatchTempSavedRecruitQuestions,
  }
}
