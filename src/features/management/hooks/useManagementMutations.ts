import { useQueryClient } from '@tanstack/react-query'

import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteBranch,
  deleteGisu,
  patchSchool,
  patchSchoolAssign,
  patchSchoolUnAssign,
  postChapter,
  postGisu,
  postSchool,
} from '../domain/api'

export function useManagementMutations() {
  const queryClient = useQueryClient()
  function usePostSchool() {
    return useCustomMutation(postSchool, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'getGisuChapterWithSchools'],
        })
      },
    })
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
  function useDeleteGeneration() {
    return useCustomMutation((gisuId: string) => deleteGisu(gisuId), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['gisu'],
        })
      },
    })
  }
  function useDeleteBranch() {
    return useCustomMutation((chapterId: string) => deleteBranch(chapterId), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'getChapters'],
        })
      },
    })
  }

  function usePostGisu() {
    return useCustomMutation(postGisu)
  }
  return {
    usePostSchool,
    usePostChapter,
    usePatchAssignSchools,
    usePatchUnassignSchools,
    usePatchSchool,
    useDeleteBranch,
    useDeleteGeneration,
    usePostGisu,
  }
}
