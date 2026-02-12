import { createQueryKeys } from '@lukemorales/query-key-factory'

const applyKeyFactory = createQueryKeys('apply', {
  recruitments: {
    queryKey: null,
    contextQueries: {
      activeId: null,
      applicationForm: (recruitmentId: string) => [recruitmentId, 'applicationForm'],
      applicationAnswer: (recruitmentId: string, formId: string) => [
        recruitmentId,
        'applicationAnswer',
        formId,
      ],
      parts: (recruitmentId: string) => [recruitmentId, 'parts'],
      schedules: (recruitmentId: string) => [recruitmentId, 'schedules'],
      notice: (recruitmentId: string) => [recruitmentId, 'notice'],
      myApplicationStatus: (recruitmentId: string) => ['me', recruitmentId, 'applications'],
    },
  },
})

export const applyKeys = {
  getActiveRecruitmentId: applyKeyFactory.recruitments._ctx.activeId.queryKey,
  getRecruitmentApplicationForm: (recruitmentId: string) =>
    applyKeyFactory.recruitments._ctx.applicationForm(recruitmentId).queryKey,
  getRecruitmentApplicationAnswer: (recruitmentId: string, formId: string) =>
    applyKeyFactory.recruitments._ctx.applicationAnswer(recruitmentId, formId).queryKey,
  getRecruitmentParts: (recruitmentId: string) =>
    applyKeyFactory.recruitments._ctx.parts(recruitmentId).queryKey,
  getRecruitmentSchedules: (recruitmentId: string) =>
    applyKeyFactory.recruitments._ctx.schedules(recruitmentId).queryKey,
  getRecruitmentNotice: (recruitmentId: string) =>
    applyKeyFactory.recruitments._ctx.notice(recruitmentId).queryKey,
  getMyApplicationStatus: (recruitmentId: string) =>
    applyKeyFactory.recruitments._ctx.myApplicationStatus(recruitmentId).queryKey,
}
