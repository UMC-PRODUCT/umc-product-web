import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType } from '@/features/auth/domain'
import {
  getDocumentAllApplicants,
  getDocumentEvaluationApplication,
} from '@/features/school/domain'

import {
  getActiveRecruitmentId,
  getApplicationAnswer,
  getApplicationForm,
  getMyApplicationStatus,
  getRecruitmentNotice,
  getRecruitmentSchedules,
  getSpecificPartRecruiting,
} from './api'

export const applyKeys = createQueryKeys('user', {
  getActiveRecruitmentId: () => ({
    queryKey: ['recruitment', 'active'],
    queryFn: () => getActiveRecruitmentId(),
  }),
  getApplicationForm: (recruitmentId: string) => ({
    queryKey: ['recruitment', 'applicationForm', recruitmentId],
    queryFn: () => getApplicationForm(recruitmentId),
  }),
  getApplicationAnswer: (recruitmentId: string, formId: string) => ({
    queryKey: ['recruitment', 'applicationAnswer', recruitmentId, formId],
    queryFn: () => getApplicationAnswer(recruitmentId, formId),
  }),
  getSpecificPartRecruiting: (recruitmentId: string) => ({
    queryKey: ['recruitment', 'part', recruitmentId],
    queryFn: () => getSpecificPartRecruiting(recruitmentId),
  }),
  getRecruitmentSchedules: (recruitmentId: string) => ({
    queryKey: ['recruitment', 'schedules', recruitmentId],
    queryFn: () => getRecruitmentSchedules(recruitmentId),
  }),
  getRecruitmentNotice: (recruitmentId: string) => ({
    queryKey: ['recruitment', 'notice', recruitmentId],
    queryFn: () => getRecruitmentNotice(recruitmentId),
  }),
  getMyApplicationStatus: (recruitmentId: string) => ({
    queryKey: ['recruitment', 'myApplicationStatus', recruitmentId],
    queryFn: () => getMyApplicationStatus(recruitmentId),
  }),
  getDocsEvaluationApplicants: (
    recruitmentId: string,
    params: {
      part: PartType | 'ALL'
      keyword: string
      page: string
      size: string
    },
  ) => ({
    queryKey: ['recruitment', 'docsEvaluationApplicants', recruitmentId, params],
    queryFn: () => getDocumentAllApplicants(recruitmentId, params),
  }),
  getDocumentEvaluationApplication: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['recruitment', 'documentEvaluationApplication', recruitmentId, applicantId],
    queryFn: () => getDocumentEvaluationApplication(recruitmentId, applicantId),
  }),
})
