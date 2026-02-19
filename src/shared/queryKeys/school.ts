import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType, SelectionsSortType } from '@/shared/types/umc'

import type { CommonSearchParams } from '../types/api'

// -----------------------------
// Params
// -----------------------------
type RecruitmentsStatusParams = { status: string }

type DocumentEvaluationApplicantsParams = CommonSearchParams & {
  part?: PartType | 'ALL'
  keyword?: string
}

type DocumentSelectedApplicantsParams = CommonSearchParams & {
  part?: PartType | 'ALL'
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

// -----------------------------
// Raw key factory (source of truth)
// -----------------------------
const schoolKeyFactory = createQueryKeys('school', {
  links: (schoolId: string) => [{ schoolId }],
  recruitments: {
    queryKey: null,
    contextQueries: {
      list: (params: RecruitmentsStatusParams) => [params],
      extensionBases: null,
      documentEvaluationList: null,
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

// -----------------------------
// Evaluation namespace
// 평가 도메인 전용 키를 명시적으로 분리
// -----------------------------
const schoolEvaluationKeys = {
  document: {
    getSelectedApplicants: (recruitmentId: string, params: DocumentSelectedApplicantsParams) =>
      schoolKeyFactory.documents._ctx.selections._ctx.applicants(recruitmentId, params).queryKey,
    getApplicationDetail: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.applicationDetail(recruitmentId, applicantId)
        .queryKey,
    getAnswers: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.answers(recruitmentId, applicantId).queryKey,
    getMyAnswer: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.myAnswer(recruitmentId, applicantId).queryKey,
    getApplicants: (recruitmentId: string, params: DocumentEvaluationApplicantsParams) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.applicants(recruitmentId, params).queryKey,
  },
  finalSelection: {
    getApplications: (recruitmentId: string, params: FinalSelectionApplicationsParams) =>
      schoolKeyFactory.finalSelections._ctx.applications(recruitmentId, params).queryKey,
  },
  interview: {
    getQuestions: (recruitmentId: string, part: PartType | 'COMMON') =>
      schoolKeyFactory.interviews._ctx.questions(recruitmentId, part).queryKey,
    getLiveQuestions: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.liveQuestions(recruitmentId, assignmentId).queryKey,
    getSummary: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.evaluationSummary(recruitmentId, assignmentId).queryKey,
    getView: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.evaluationView(recruitmentId, assignmentId).queryKey,
    getAssignments: (recruitmentId: string, params: InterviewAssignmentsParams) =>
      schoolKeyFactory.interviews._ctx.assignments(recruitmentId, params).queryKey,
    getOptions: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.options(recruitmentId).queryKey,
    getMyAnswer: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.myAnswer(recruitmentId, assignmentId).queryKey,
    getAvailableParts: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.availableParts(recruitmentId).queryKey,
    getSlotApplicants: (recruitmentId: string, slotId: string) =>
      schoolKeyFactory.interviews._ctx.slotApplicants(recruitmentId, slotId).queryKey,
    getSlots: (recruitmentId: string, date: string, part: PartType | 'ALL') =>
      schoolKeyFactory.interviews._ctx.slots(recruitmentId, date, part).queryKey,
    getSchedulingSummary: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.schedulingSummary(recruitmentId).queryKey,
    getSlotAssignments: (recruitmentId: string, slotId: string) =>
      schoolKeyFactory.interviews._ctx.slotAssignments(recruitmentId, slotId).queryKey,
  },
}

// -----------------------------
// Public query keys
// 평가 관련 키는 schoolKeys.evaluation.* 에서만 사용
// -----------------------------
export const schoolKeys = {
  // 신규 접근: 평가 키 전용 네임스페이스
  evaluation: schoolEvaluationKeys,

  // 학교/모집 공통
  getSchoolLink: (schoolId: string) => schoolKeyFactory.links(schoolId).queryKey,
  getRecruitments: (params: RecruitmentsStatusParams) =>
    schoolKeyFactory.recruitments._ctx.list(params).queryKey,
  getRecruitmentExtensionBases: schoolKeyFactory.recruitments._ctx.extensionBases.queryKey,
  getRecruitmentsDocumentEvaluation:
    schoolKeyFactory.recruitments._ctx.documentEvaluationList.queryKey,
  getRecruitmentDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.draft(recruitmentId).queryKey,
  getRecruitmentApplicationForm: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationForm(recruitmentId).queryKey,
  getRecruitmentApplicationFormDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationFormDraft(recruitmentId).queryKey,
  getRecruitmentDashboardSummary: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.dashboardSummary(recruitmentId).queryKey,
}
