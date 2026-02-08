import { useCustomMutation } from '@/shared/hooks/customQuery'

import { postSchool } from '../domain/api'

export function useManagementMutations() {
  function usePostSchool() {
    return useCustomMutation(postSchool)
  }
  return { usePostSchool }
}
