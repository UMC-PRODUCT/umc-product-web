import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  patchRecruitmentApplicationAnswers,
  postRecruitmentApplicationDraft,
  postRecruitmentApplicationDraftReset,
  postRecruitmentApplicationSubmit,
} from '../domain/api'
import type { PatchRecruitmentApplicationAnswersRequestDTO } from '../domain/model'

export function useApplyMutation() {
  function useFirstCreateDraft() {
    return useCustomMutation((recruitmentId: string) =>
      postRecruitmentApplicationDraft(recruitmentId),
    )
  }
  function useSubmitApplication() {
    return useCustomMutation(
      ({ recruitmentId, formResponseId }: { recruitmentId: string; formResponseId: string }) =>
        postRecruitmentApplicationSubmit(recruitmentId, formResponseId),
    )
  }
  function useResetDraftApplication() {
    return useCustomMutation((recruitmentId: string) =>
      postRecruitmentApplicationDraftReset(recruitmentId),
    )
  }

  function usePatchApplication() {
    return useCustomMutation(
      ({ recruitmentId, formResponseId, items }: PatchRecruitmentApplicationAnswersRequestDTO) =>
        patchRecruitmentApplicationAnswers({ recruitmentId, formResponseId, items }),
    )
  }

  return {
    useFirstCreateDraft,
    useSubmitApplication,
    useResetDraftApplication,
    usePatchApplication,
  }
}
