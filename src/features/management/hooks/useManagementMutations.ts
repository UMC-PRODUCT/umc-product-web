import { useCustomMutation } from '@/shared/hooks/customQuery'

import { patchSchoolAssign, patchSchoolUnAssign, postChapter, postSchool } from '../domain/api'

export function useManagementMutations() {
  function usePostSchool() {
    return useCustomMutation(postSchool)
  }
  function usePostChapter() {
    return useCustomMutation(postChapter)
  }
  function usePatchAssignSchools() {
    return useCustomMutation(({ chapterId, schoolId }: { chapterId: string; schoolId: string }) =>
      patchSchoolAssign(schoolId, { chapterId }),
    )
  }
  function usePatchUnassignSchools() {
    return useCustomMutation(({ gisuId, schoolId }: { gisuId: string; schoolId: string }) =>
      patchSchoolUnAssign(schoolId, { gisuId }),
    )
  }
  return { usePostSchool, usePostChapter, usePatchAssignSchools, usePatchUnassignSchools }
}
