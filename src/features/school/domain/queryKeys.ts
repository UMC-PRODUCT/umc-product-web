import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType } from '@/features/auth/domain'
import type { FinalSelectionsSortType } from '@/shared/types/umc'

import {
  getDashboardSummary,
  getDocumentEvaluationAnswerMe,
  getDocumentEvaluationAnswers,
  getDocumentEvaluationApplication,
  getDocumentSelectedApplicants,
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
  getAllDocumentSelectedApplicants: (
    recruitmentId: string,
    params: {
      part: PartType
      page: string
      size: string
      sort: FinalSelectionsSortType
    },
  ) => ({
    queryKey: ['documentSelectedApplicants', recruitmentId, params],
    queryFn: () => getDocumentSelectedApplicants(recruitmentId, params),
  }),
  getDocumentEvaluationApplication: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationApplication', recruitmentId, applicantId],
    queryFn: () => getDocumentEvaluationApplication(recruitmentId, applicantId),
  }),
  getDocumentEvaluationAnswers: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationAnswers', recruitmentId, applicantId],
    queryFn: () => getDocumentEvaluationAnswers(recruitmentId, applicantId),
  }),
  getDocumentEvaluationAnswerMe: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationAnswerMe', recruitmentId, applicantId],
    queryFn: () => getDocumentEvaluationAnswerMe(recruitmentId, applicantId),
  }),
})
