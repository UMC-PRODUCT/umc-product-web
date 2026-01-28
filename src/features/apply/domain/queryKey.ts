import { createQueryKeys } from '@lukemorales/query-key-factory'

import {
  getActiveRecruitmentId,
  getApplicationAnswer,
  getApplicationForm,
  getMyApplicationStatus,
  getRecruitmentNotice,
  getRecruitmentSchedules,
  getSpecificPartRecruiting,
} from './api'

export const userRecruitement = createQueryKeys('user', {
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
})
