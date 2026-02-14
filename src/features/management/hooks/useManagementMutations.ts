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

/**
 * 관리(총괄) 영역에서 사용하는 mutation 훅 모음을 제공함.
 * @returns 학교/지부/기수 관련 mutation 훅 객체
 */
export function useManagementMutations() {
  const queryClient = useQueryClient()

  /**
   * 학교 생성 mutation 훅.
   * @returns 학교 생성 mutation 결과
   */
  function usePostSchool() {
    return useCustomMutation(postSchool, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'getGisuChapterWithSchools'],
        })
      },
    })
  }

  /**
   * 지부(챕터) 생성 mutation 훅.
   * @returns 지부 생성 mutation 결과
   */
  function usePostChapter() {
    return useCustomMutation(postChapter)
  }

  /**
   * 학교 배정 mutation 훅.
   * @returns 학교 배정 mutation 결과
   */
  function usePatchAssignSchools() {
    return useCustomMutation(({ chapterId, schoolId }: { chapterId: string; schoolId: string }) =>
      patchSchoolAssign(schoolId, { chapterId }),
    )
  }

  /**
   * 학교 배정 해제 mutation 훅.
   * @returns 학교 배정 해제 mutation 결과
   */
  function usePatchUnassignSchools() {
    return useCustomMutation(({ gisuId, schoolId }: { gisuId: string; schoolId: string }) =>
      patchSchoolUnAssign(schoolId, { gisuId }),
    )
  }

  /**
   * 학교 수정 mutation 훅.
   * @returns 학교 수정 mutation 결과
   */
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
          }> | null
        }
      }) => patchSchool(schoolId, body),
    )
  }

  /**
   * 기수 삭제 mutation 훅.
   * @returns 기수 삭제 mutation 결과
   */
  function useDeleteGeneration() {
    return useCustomMutation((gisuId: string) => deleteGisu(gisuId), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['gisu'],
        })
      },
    })
  }

  /**
   * 지부 삭제 mutation 훅.
   * @returns 지부 삭제 mutation 결과
   */
  function useDeleteBranch() {
    return useCustomMutation((chapterId: string) => deleteBranch(chapterId), {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['management', 'getChapters'],
        })
      },
    })
  }

  /**
   * 기수 생성 mutation 훅.
   * @returns 기수 생성 mutation 결과
   */
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
