import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getRecruitmentApplicationForm } from '@/features/apply/domain/api'
import type { PartType } from '@/features/auth/domain'
import type { SelectionsSortType } from '@/shared/types/umc'

import {
  getDocumentEvaluationAnswers,
  getDocumentEvaluationApplicants,
  getDocumentEvaluationApplicationDetail,
  getDocumentEvaluationMyAnswer,
  getDocumentSelectedApplicants,
  getRecruitmentApplicationFormDraft,
  getRecruitmentDashboardSummary,
  getRecruitmentDraft,
  getRecruitments,
} from './api'
import type { GetRecruitmentsRequestDTO } from './model'

export const schoolKeys = createQueryKeys('school', {
  /** GET /recruitments */
  getRecruitments: (status: GetRecruitmentsRequestDTO) => ({
    queryKey: ['recruitments', status],
    queryFn: () => getRecruitments(status),
  }),
  /** GET /recruitments/{recruitingId} */
  getRecruitmentDraft: (recruitingId: string) => ({
    queryKey: ['recruitmentDraft', { recruitingId }],
    queryFn: () => getRecruitmentDraft(recruitingId),
  }),
  /** GET /recruitments/{recruitingId}/application-form */
  getRecruitmentApplicationForm: (recruitingId: string) => ({
    queryKey: ['recruitmentApplicationForm', { recruitingId }],
    queryFn: () => getRecruitmentApplicationForm(recruitingId),
  }),
  /** GET /recruitments/{recruitingId}/application-form/draft */
  getRecruitmentApplicationFormDraft: (recruitingId: string) => ({
    queryKey: ['recruitmentApplicationFormDraft', { recruitingId }],
    queryFn: () => getRecruitmentApplicationFormDraft(recruitingId),
  }),
  /** GET /recruitments/{recruitingId}/dashboard */
  getRecruitmentDashboardSummary: (recruitingId: string) => ({
    queryKey: ['recruitmentDashboardSummary', { recruitingId }],
    queryFn: () => getRecruitmentDashboardSummary(recruitingId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/document-selections */
  getDocumentSelectedApplicants: (
    recruitmentId: string,
    params: {
      part: PartType | 'ALL'
      page: string
      size: string
      sort: SelectionsSortType
    },
  ) => ({
    queryKey: ['documentSelectedApplicants', { recruitmentId, ...params }],
    queryFn: () => getDocumentSelectedApplicants(recruitmentId, params),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluation */
  getDocumentEvaluationApplicationDetail: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationApplicationDetail', { recruitmentId, applicantId }],
    queryFn: () => getDocumentEvaluationApplicationDetail(recruitmentId, applicantId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations */
  getDocumentEvaluationAnswers: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationAnswers', { recruitmentId, applicantId }],
    queryFn: () => getDocumentEvaluationAnswers(recruitmentId, applicantId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations/me */
  getDocumentEvaluationMyAnswer: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documentEvaluationMyAnswer', { recruitmentId, applicantId }],
    queryFn: () => getDocumentEvaluationMyAnswer(recruitmentId, applicantId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/document-evaluations */
  getDocumentEvaluationApplicants: (
    recruitmentId: string,
    params: {
      part: PartType | 'ALL'
      keyword: string
      page: string
      size: string
    },
  ) => ({
    queryKey: ['documentEvaluationApplicants', { recruitmentId, ...params }],
    queryFn: () => getDocumentEvaluationApplicants(recruitmentId, params),
  }),
})
