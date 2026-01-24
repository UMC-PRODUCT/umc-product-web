import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getRecruitments } from './api'
import type { GetRecruitmentsRequestDTO } from './types'

export const recruiteKeys = createQueryKeys('terms', {
  recruitments: (status: GetRecruitmentsRequestDTO) => ({
    queryKey: ['recruitments', status],
    queryFn: () => getRecruitments(status),
  }),
})
