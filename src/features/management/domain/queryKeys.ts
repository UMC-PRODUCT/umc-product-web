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
  curriculums: (part: PartType) => ({
    queryKey: ['curriculums', part],
    queryFn: () => getCurriculums({ part }),
  }),
  allSchools: () => ({
    queryKey: ['school'],
    queryFn: () => getAllSchools(),
  }),
  allGisu: () => ({
    queryKey: ['gisu', 'all'],
    queryFn: () => getAllGisu(),
  }),
  gisuChapterWithSchools: (gisuId: string) => ({
    queryKey: [gisuId],
    queryFn: () => getGisuChapterWithSchools({ gisuId }),
  }),
  unassignedSchools: (gisuId: string) => ({
    queryKey: [gisuId],
    queryFn: () => getUnassignedSchools({ gisuId }),
  }),
  school: (params: {
    page?: string
    size?: string
    sort?: 'asc' | 'desc'
    chapterId?: string
    keyword?: string
  }) => ({
    queryKey: [params],
    queryFn: () => getSchoolsPaging(params),
  }),
  schoolDetail: (schoolId: string) => ({
    queryKey: [schoolId],
    queryFn: () => getSchoolDetails({ schoolId }),
  }),
  chapter: () => ({
    queryKey: ['all'],
    queryFn: () => getChapter(),
  }),
})
