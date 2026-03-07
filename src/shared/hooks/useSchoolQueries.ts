import { getAllSchools } from '@/shared/api/school/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'

/** 전체 학교 목록을 조회하는 공용 쿼리 훅 */
export function useGetAllSchools() {
  return useCustomQuery(managementKeys.getAllSchools, getAllSchools)
}
