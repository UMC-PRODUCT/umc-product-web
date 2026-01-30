import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  patchSaveDraftApplication,
  postClearDraftApplication,
  postFirstDraftApplication,
  postSubmitApplication,
} from '../domain/api'
import type { PatchApplicationAnswerRequestDTO } from '../domain/model'

export function useApplyMutation() {
  function useFirstCreateDraft() {
    return useCustomMutation((recruitmentId: string) => postFirstDraftApplication(recruitmentId))
  }
  function useSubmitApplication() {
    return useCustomMutation(
      ({ recruitmentId, formResponseId }: { recruitmentId: string; formResponseId: string }) =>
        postSubmitApplication(recruitmentId, formResponseId),
    )
  }
  function useResetDraftApplication() {
    return useCustomMutation((recruitmentId: string) => postClearDraftApplication(recruitmentId))
  }

  function usePatchApplication() {
    return useCustomMutation(
      ({ recruitmentId, formResponseId, items }: PatchApplicationAnswerRequestDTO) =>
        patchSaveDraftApplication({ recruitmentId, formResponseId, items }),
    )
  }

  return {
    useFirstCreateDraft,
    useSubmitApplication,
    useResetDraftApplication,
    usePatchApplication,
  }
}
