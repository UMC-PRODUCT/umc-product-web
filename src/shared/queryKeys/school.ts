import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { CommonPartType, PartFilterType } from '@/shared/types/part'
import type { SelectionsSortType } from '@/shared/types/umc'

import type { CommonSearchParams } from '../types/api'

// -----------------------------
// Params
// -----------------------------
type RecruitmentsStatusParams = { status: string }

type DocumentEvaluationApplicantsParams = CommonSearchParams & {
  part?: PartFilterType
  keyword?: string
}

type DocumentSelectedApplicantsParams = CommonSearchParams & {
  part?: PartFilterType
  sort?: SelectionsSortType
}

type FinalSelectionApplicationsParams = {
  part: PartFilterType
  sort: SelectionsSortType
  page: string
  size: string
}

type InterviewAssignmentsParams = {
  date?: string
  part?: PartFilterType
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
      questions: (recruitmentId: string, part: CommonPartType) => [{ recruitmentId, part }],
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
      slots: (recruitmentId: string, date: string, part: PartFilterType) => [
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
    /** 서류 평가 도메인 전체 prefix (`['school','documents','evaluation']`) */
    getBase: schoolKeyFactory.documents._ctx.evaluation.queryKey,
    /** 서류 합불(선발) 도메인 전체 prefix (`['school','documents','selections']`) */
    getSelectionsBase: schoolKeyFactory.documents._ctx.selections.queryKey,
    /** 모집 ID 기준으로 "서류 평가 지원자 목록" 쿼리인지 판별하는 헬퍼 */
    isApplicantsQueryForRecruitment: (queryKey: ReadonlyArray<unknown>, recruitmentId: string) => {
      const [root, domain, feature, key, params] = queryKey as [
        string?,
        string?,
        string?,
        string?,
        any?,
      ]
      return (
        root === 'school' &&
        domain === 'documents' &&
        feature === 'evaluation' &&
        key === 'applicants' &&
        String(params?.recruitmentId) === String(recruitmentId)
      )
    },
    /** 서류 합불 대상자 목록 조회 키 */
    getSelectedApplicants: (recruitmentId: string, params: DocumentSelectedApplicantsParams) =>
      schoolKeyFactory.documents._ctx.selections._ctx.applicants(recruitmentId, params).queryKey,
    /** 서류 평가 대상자 상세 조회 키 */
    getApplicationDetail: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.applicationDetail(recruitmentId, applicantId)
        .queryKey,
    /** 서류 평가 답변 조회 키 */
    getAnswers: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.answers(recruitmentId, applicantId).queryKey,
    /** 내 서류 평가(작성자 기준) 조회 키 */
    getMyAnswer: (recruitmentId: string, applicantId: string) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.myAnswer(recruitmentId, applicantId).queryKey,
    /** 서류 평가 지원자 목록 조회 키 */
    getApplicants: (recruitmentId: string, params: DocumentEvaluationApplicantsParams) =>
      schoolKeyFactory.documents._ctx.evaluation._ctx.applicants(recruitmentId, params).queryKey,
  },
  finalSelection: {
    /** 최종 선발 도메인 전체 prefix (`['school','finalSelections']`) */
    getBase: schoolKeyFactory.finalSelections.queryKey,
    /** 최종 선발 대상자 목록 조회 키 */
    getApplications: (recruitmentId: string, params: FinalSelectionApplicationsParams) =>
      schoolKeyFactory.finalSelections._ctx.applications(recruitmentId, params).queryKey,
  },
  interview: {
    /** 면접 질문 조회 키 */
    getQuestions: (recruitmentId: string, part: CommonPartType) =>
      schoolKeyFactory.interviews._ctx.questions(recruitmentId, part).queryKey,
    /** 실시간 면접 질문 조회 키 */
    getLiveQuestions: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.liveQuestions(recruitmentId, assignmentId).queryKey,
    /** 면접 평가 요약 조회 키 */
    getSummary: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.evaluationSummary(recruitmentId, assignmentId).queryKey,
    /** 면접 평가 상세 조회 키 */
    getView: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.evaluationView(recruitmentId, assignmentId).queryKey,
    /** 면접 배정 목록 조회 키 */
    getAssignments: (recruitmentId: string, params: InterviewAssignmentsParams) =>
      schoolKeyFactory.interviews._ctx.assignments(recruitmentId, params).queryKey,
    /** 면접 선택 옵션 조회 키 */
    getOptions: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.options(recruitmentId).queryKey,
    /** 내 면접 평가 조회 키 */
    getMyAnswer: (recruitmentId: string, assignmentId: string) =>
      schoolKeyFactory.interviews._ctx.myAnswer(recruitmentId, assignmentId).queryKey,
    /** 면접 가능 파트 조회 키 */
    getAvailableParts: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.availableParts(recruitmentId).queryKey,
    /** 면접 슬롯 지원자 조회 키 */
    getSlotApplicants: (recruitmentId: string, slotId: string) =>
      schoolKeyFactory.interviews._ctx.slotApplicants(recruitmentId, slotId).queryKey,
    /** 면접 슬롯 목록 조회 키 */
    getSlots: (recruitmentId: string, date: string, part: PartFilterType) =>
      schoolKeyFactory.interviews._ctx.slots(recruitmentId, date, part).queryKey,
    /** 면접 스케줄 요약 조회 키 */
    getSchedulingSummary: (recruitmentId: string) =>
      schoolKeyFactory.interviews._ctx.schedulingSummary(recruitmentId).queryKey,
    /** 면접 슬롯 배정 조회 키 */
    getSlotAssignments: (recruitmentId: string, slotId: string) =>
      schoolKeyFactory.interviews._ctx.slotAssignments(recruitmentId, slotId).queryKey,
  },
}

// -----------------------------
// Public query keys
// 평가 관련 키는 schoolKeys.evaluation.* 에서만 사용
// -----------------------------
export const schoolKeys = {
  /** school 도메인 전체 prefix (`['school']`) */
  base: ['school'] as const,
  // 신규 접근: 평가 키 전용 네임스페이스
  evaluation: schoolEvaluationKeys,

  // 학교/모집 공통
  /** 학교 외부 링크 조회 키 */
  getSchoolLink: (schoolId: string) => schoolKeyFactory.links(schoolId).queryKey,
  /** 모집 목록 조회 키 */
  getRecruitments: (params: RecruitmentsStatusParams) =>
    schoolKeyFactory.recruitments._ctx.list(params).queryKey,
  /** 추가 모집 생성용 베이스 데이터 조회 키 */
  getRecruitmentExtensionBases: schoolKeyFactory.recruitments._ctx.extensionBases.queryKey,
  /** 서류 평가 대상 모집 목록 조회 키 */
  getRecruitmentsDocumentEvaluation:
    schoolKeyFactory.recruitments._ctx.documentEvaluationList.queryKey,
  /** 모집 임시저장본 조회 키 */
  getRecruitmentDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.draft(recruitmentId).queryKey,
  /** 지원서 양식 조회 키 */
  getRecruitmentApplicationForm: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationForm(recruitmentId).queryKey,
  /** 지원서 양식 임시저장본 조회 키 */
  getRecruitmentApplicationFormDraft: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.applicationFormDraft(recruitmentId).queryKey,
  /** 모집 대시보드 요약 조회 키 */
  getRecruitmentDashboardSummary: (recruitmentId: string) =>
    schoolKeyFactory.recruitments._ctx.dashboardSummary(recruitmentId).queryKey,
}
