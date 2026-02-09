import { createQueryKeys } from '@lukemorales/query-key-factory'

import {
  getActiveRecruitmentId,
  getMyApplicationStatus,
  getRecruitmentApplicationAnswer,
  getRecruitmentApplicationForm,
  getRecruitmentNotice,
  getRecruitmentParts,
  getRecruitmentSchedules,
} from './api'

export const applyKeys = createQueryKeys('apply', {
  /** GET /recruitments/active-id */
  getActiveRecruitmentId: () => ({
    queryKey: ['activeRecruitmentId'],
    queryFn: () => getActiveRecruitmentId(),
  }),
  /** GET /recruitments/{recruitmentId}/application-form */
  getRecruitmentApplicationForm: (recruitmentId: string) => ({
    queryKey: ['recruitmentApplicationForm', { recruitmentId }],
    queryFn: () => getRecruitmentApplicationForm(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{formResponseId} */
  getRecruitmentApplicationAnswer: (recruitmentId: string, formId: string) => ({
    queryKey: ['recruitmentApplicationAnswer', { recruitmentId, formId }],
    queryFn: () => getRecruitmentApplicationAnswer(recruitmentId, formId),
  }),
  /** GET /recruitments/{recruitmentId}/parts */
  getRecruitmentParts: (recruitmentId: string) => ({
    queryKey: ['recruitmentParts', { recruitmentId }],
    queryFn: () => getRecruitmentParts(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/schedules */
  getRecruitmentSchedules: (recruitmentId: string) => ({
    queryKey: ['recruitmentSchedules', { recruitmentId }],
    queryFn: () => getRecruitmentSchedules(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/notice */
  getRecruitmentNotice: (recruitmentId: string) => ({
    queryKey: ['recruitmentNotice', { recruitmentId }],
    queryFn: () => getRecruitmentNotice(recruitmentId),
  }),
  /** GET /recruitments/me/{recruitmentId}/applications */
  getMyApplicationStatus: (recruitmentId: string) => ({
    queryKey: ['myApplicationStatus', { recruitmentId }],
    queryFn: () => getMyApplicationStatus(recruitmentId),
  }),
})
