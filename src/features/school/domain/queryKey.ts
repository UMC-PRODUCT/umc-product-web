import { createQueryKeys } from '@lukemorales/query-key-factory'

import {
  getRecruitments,
  getSavedApplicationQuestions,
  getTempSavedApplicationQuestions,
  getTempSavedRecruitment,
} from './api'
import type { GetRecruitmentsRequestDTO } from './apiTypes'

export const recruiteKeys = createQueryKeys('recruitment', {
  recruitments: (status: GetRecruitmentsRequestDTO) => ({
    queryKey: [status],
    queryFn: () => getRecruitments(status),
  }),
  getTempSavedRecruitments: (recruitingId: string) => ({
    queryKey: ['tempSaved', recruitingId],
    queryFn: () => getTempSavedRecruitment(recruitingId),
  }),
  getApplicationForm: (recruitingId: string) => ({
    queryKey: ['applicationForm', recruitingId],
    queryFn: () => getSavedApplicationQuestions(recruitingId),
  }),
  getTempSavedApplication: (recruitingId: string) => ({
    queryKey: ['tempSaved', recruitingId],
    queryFn: () => getTempSavedApplicationQuestions(recruitingId),
  }),
})
