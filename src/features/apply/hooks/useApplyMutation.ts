import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  postClearDraftApplication,
  postFirstDraftApplication,
  postSubmitApplication,
} from '../domain/api'

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
  return {
    useFirstCreateDraft,
    useSubmitApplication,
    useResetDraftApplication,
  }
}
