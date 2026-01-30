import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType } from '@/features/auth/domain'

import { getCurriculums } from './api'

export const managementKeys = createQueryKeys('management', {
  curriculums: (part: PartType) => ({
    queryKey: ['curriculums', part],
    queryFn: () => getCurriculums({ part }),
  }),
})
