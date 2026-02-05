import { createQueryKeys } from '@lukemorales/query-key-factory'

import {
  getDashboardSummary,
  getRecruitments,
  getSavedApplicationQuestions,
  getTempSavedApplicationQuestions,
  getTempSavedRecruitment,
} from './api'
import type { GetRecruitmentsRequestDTO } from './model'

export const schoolKeys = createQueryKeys('recruitment', {
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
  getRecruitmentDashboard: (recruitingId: string) => ({
    queryKey: ['dashboard', recruitingId],
    queryFn: () => getDashboardSummary(recruitingId),
  }),
})
