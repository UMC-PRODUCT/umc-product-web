import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType, SelectionsSortType } from '@/shared/types/umc'

type RecruitmentsStatusParams = { status: string }

type DocumentEvaluationApplicantsParams = {
  part?: PartType | 'ALL'
  keyword?: string
  page?: string
  size?: string
}

type DocumentSelectedApplicantsParams = {
  part?: PartType | 'ALL'
  page?: string
  size?: string
  sort?: SelectionsSortType
}

type FinalSelectionApplicationsParams = {
  part: PartType | 'ALL'
  sort: SelectionsSortType
  page: string
  size: string
}

type InterviewAssignmentsParams = {
  date?: string
  part?: PartType | 'ALL'
}

const schoolKeyFactory = createQueryKeys('school', {
  links: (schoolId: string) => [{ schoolId }],
  recruitments: {
    queryKey: null,
    contextQueries: {
      list: (params: RecruitmentsStatusParams) => [params],
      draft: (recruitmentId: string) => [{ recruitmentId }],
      applicationForm: (recruitmentId: string) => [{ recruitmentId }],
      applicationFormDraft: (recruitmentId: string) => [{ recruitmentId }],
      dashboardSummary: (recruitmentId: string) => [{ recruitmentId }],
    },
  },
  documents: {
    queryKey: null,
    contextQueries: {
      selections: {
        queryKey: null,
        contextQueries: {
          applicants: (recruitmentId: string, params: DocumentSelectedApplicantsParams) => [
            { recruitmentId, ...params },
          ],
        },
      },
      evaluation: {
        queryKey: null,
        contextQueries: {
          applicationDetail: (recruitmentId: string, applicantId: string) => [
            { recruitmentId, applicantId },
          ],
          answers: (recruitmentId: string, applicantId: string) => [{ recruitmentId, applicantId }],
          myAnswer: (recruitmentId: string, applicantId: string) => [
            { recruitmentId, applicantId },
          ],
          applicants: (recruitmentId: string, params: DocumentEvaluationApplicantsParams) => [
            { recruitmentId, ...params },
          ],
        },
      },
    },
  },
  finalSelections: {
    queryKey: null,
    contextQueries: {
      applications: (recruitmentId: string, params: FinalSelectionApplicationsParams) => [
        { recruitmentId, ...params },
      ],
    },
  },
  interviews: {
    queryKey: null,
    contextQueries: {
      questions: (recruitmentId: string, part: PartType | 'COMMON') => [{ recruitmentId, part }],
      liveQuestions: (recruitmentId: string, assignmentId: string) => [
        { recruitmentId, assignmentId },
      ],
      evaluationSummary: (recruitmentId: string, assignmentId: string) => [
        { recruitmentId, assignmentId },
      ],
      evaluationView: (recruitmentId: string, assignmentId: string) => [
        { recruitmentId, assignmentId },
      ],
      assignments: (recruitmentId: string, params: InterviewAssignmentsParams) => [
        { recruitmentId, ...params },
      ],
      options: (recruitmentId: string) => [{ recruitmentId }],
      myAnswer: (recruitmentId: string, assignmentId: string) => [{ recruitmentId, assignmentId }],
      availableParts: (recruitmentId: string) => [{ recruitmentId }],
      slotApplicants: (recruitmentId: string, slotId: string) => [{ recruitmentId, slotId }],
      slots: (recruitmentId: string, date: string, part: PartType | 'ALL') => [
        { recruitmentId, date, part },
      ],
      schedulingSummary: (recruitmentId: string) => [{ recruitmentId }],
      slotAssignments: (recruitmentId: string, slotId: string) => [{ recruitmentId, slotId }],
    },
  },
})

export const schoolKeys = {
  getSchoolLink: (schoolId: string) => schoolKeyFactory.links(schoolId).queryKey,
  getRecruitments: (params: RecruitmentsStatusParams) =>
    schoolKeyFactory.recruitments._ctx.list(params).queryKey,
  getRecruitmentDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.draft(recruitmentId).queryKey,
  getRecruitmentApplicationForm: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationForm(recruitmentId).queryKey,
  getRecruitmentApplicationFormDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationFormDraft(recruitmentId).queryKey,
  getRecruitmentDashboardSummary: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.dashboardSummary(recruitmentId).queryKey,

  getDocumentSelectedApplicants: (
    recruitmentId: string,
    params: DocumentSelectedApplicantsParams,
  ) => schoolKeyFactory.documents._ctx.selections._ctx.applicants(recruitmentId, params).queryKey,
  getDocumentEvaluationApplicationDetail: (recruitmentId: string, applicantId: string) =>
    schoolKeyFactory.documents._ctx.evaluation._ctx.applicationDetail(recruitmentId, applicantId)
      .queryKey,
  getDocumentEvaluationAnswers: (recruitmentId: string, applicantId: string) =>
    schoolKeyFactory.documents._ctx.evaluation._ctx.answers(recruitmentId, applicantId).queryKey,
  getDocumentEvaluationMyAnswer: (recruitmentId: string, applicantId: string) =>
    schoolKeyFactory.documents._ctx.evaluation._ctx.myAnswer(recruitmentId, applicantId).queryKey,
  getDocumentEvaluationApplicants: (
    recruitmentId: string,
    params: DocumentEvaluationApplicantsParams,
  ) => schoolKeyFactory.documents._ctx.evaluation._ctx.applicants(recruitmentId, params).queryKey,

  getFinalSelectionApplications: (
    recruitmentId: string,
    params: FinalSelectionApplicationsParams,
  ) => schoolKeyFactory.finalSelections._ctx.applications(recruitmentId, params).queryKey,

  getInterviewQuestions: (recruitmentId: string, part: PartType | 'COMMON') =>
    schoolKeyFactory.interviews._ctx.questions(recruitmentId, part).queryKey,
  getInterviewLiveQuestions: (recruitmentId: string, assignmentId: string) =>
    schoolKeyFactory.interviews._ctx.liveQuestions(recruitmentId, assignmentId).queryKey,
  getInterviewEvaluationSummary: (recruitmentId: string, assignmentId: string) =>
    schoolKeyFactory.interviews._ctx.evaluationSummary(recruitmentId, assignmentId).queryKey,
  getInterviewEvaluationView: (recruitmentId: string, assignmentId: string) =>
    schoolKeyFactory.interviews._ctx.evaluationView(recruitmentId, assignmentId).queryKey,
  getInterviewAssignments: (recruitmentId: string, params: InterviewAssignmentsParams) =>
    schoolKeyFactory.interviews._ctx.assignments(recruitmentId, params).queryKey,
  getInterviewEvaluationOptions: (recruitmentId: string) =>
    schoolKeyFactory.interviews._ctx.options(recruitmentId).queryKey,
  getInterviewEvaluationMyAnswer: (recruitmentId: string, assignmentId: string) =>
    schoolKeyFactory.interviews._ctx.myAnswer(recruitmentId, assignmentId).queryKey,
  getAvailableInterviewParts: (recruitmentId: string) =>
    schoolKeyFactory.interviews._ctx.availableParts(recruitmentId).queryKey,
  getInterviewSlotApplicants: (recruitmentId: string, slotId: string) =>
    schoolKeyFactory.interviews._ctx.slotApplicants(recruitmentId, slotId).queryKey,
  getInterviewSlots: (recruitmentId: string, date: string, part: PartType | 'ALL') =>
    schoolKeyFactory.interviews._ctx.slots(recruitmentId, date, part).queryKey,
  getInterviewSchedulingSummary: (recruitmentId: string) =>
    schoolKeyFactory.interviews._ctx.schedulingSummary(recruitmentId).queryKey,
  getInterviewSlotAssignments: (recruitmentId: string, slotId: string) =>
    schoolKeyFactory.interviews._ctx.slotAssignments(recruitmentId, slotId).queryKey,
}
