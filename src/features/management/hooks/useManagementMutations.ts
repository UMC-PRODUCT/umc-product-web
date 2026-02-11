import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  patchSchool,
  patchSchoolAssign,
  patchSchoolUnAssign,
  postChapter,
  postSchool,
} from '../domain/api'

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
  function usePatchSchool() {
    return useCustomMutation(
      ({
        schoolId,
        body,
      }: {
        schoolId: string
        body: {
          schoolName?: string
          remark?: string
          logoImageId?: string
          links?: Array<{
            title: string
            type: 'KAKAO' | 'INSTAGRAM' | 'YOUTUBE'
            url: string
          }>
        }
      }) => patchSchool(schoolId, body),
    )
  }
  return {
    usePostSchool,
    usePostChapter,
    usePatchAssignSchools,
    usePatchUnassignSchools,
    usePatchSchool,
  }
}
