import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType } from '@/features/auth/domain'

import {
  getAllGisu,
  getAllSchools,
  getChapter,
  getCurriculums,
  getGisuChapterWithSchools,
  getSchoolDetails,
  getSchoolsPaging,
  getUnassignedSchools,
} from './api'

export const managementKeys = createQueryKeys('management', {
  /** GET /curriculums */
  getCurriculums: (part: PartType) => ({
    queryKey: ['curriculums', part],
    queryFn: () => getCurriculums({ part }),
  }),
  /** GET /schools/all */
  getAllSchools: () => ({
    queryKey: ['schools', 'all'],
    queryFn: () => getAllSchools(),
  }),
  /** GET /gisu/all */
  getAllGisu: () => ({
    queryKey: ['gisu', 'all'],
    queryFn: () => getAllGisu(),
  }),
  /** GET /chapters/with-schools */
  getGisuChapterWithSchools: (gisuId: string) => ({
    queryKey: ['gisuChapterWithSchools', gisuId],
    queryFn: () => getGisuChapterWithSchools({ gisuId }),
  }),
  /** GET /schools/unassigned */
  getUnassignedSchools: (gisuId: string) => ({
    queryKey: ['unassignedSchools', gisuId],
    queryFn: () => getUnassignedSchools({ gisuId }),
  }),
  /** GET /schools (paging) */
  getSchoolsPaging: (params: {
    page?: string
    size?: string
    sort?: 'asc' | 'desc'
    chapterId?: string
    keyword?: string
  }) => ({
    queryKey: ['schoolsPaging', params],
    queryFn: () => getSchoolsPaging(params),
  }),
  /** GET /schools/{schoolId} */
  getSchoolDetails: (schoolId: string) => ({
    queryKey: ['schoolDetail', schoolId],
    queryFn: () => getSchoolDetails({ schoolId }),
  }),
  /** GET /chapters */
  getChapters: () => ({
    queryKey: ['chapters', 'all'],
    queryFn: () => getChapter(),
  }),
})
