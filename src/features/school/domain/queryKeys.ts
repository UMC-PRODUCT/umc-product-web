import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getRecruitmentApplicationForm } from '@/features/apply/domain/api'
import type { PartType } from '@/features/auth/domain'
import type { SelectionsSortType } from '@/shared/types/umc'

import {
  getAvailableInterviewParts,
  getDocumentEvaluationAnswers,
  getDocumentEvaluationApplicants,
  getDocumentEvaluationApplicationDetail,
  getDocumentEvaluationMyAnswer,
  getDocumentSelectedApplicants,
  getInterviewQuestions,
  getInterviewSchedulingSlotApplicants,
  getInterviewSchedulingSummary,
  getInterviewSlotAssignments,
  getInterviewSlots,
  getRecruitmentApplicationFormDraft,
  getRecruitmentDashboardSummary,
  getRecruitmentDraft,
  getRecruitments,
} from './api'
import type { GetRecruitmentsRequestDTO } from './model'

export const schoolKeys = createQueryKeys('school', {
  /** GET /recruitments */
  getRecruitments: (status: GetRecruitmentsRequestDTO) => ({
    queryKey: ['recruitments', 'list', status],
    queryFn: () => getRecruitments(status),
  }),
  /** GET /recruitments/{recruitmentId} */
  getRecruitmentDraft: (recruitmentId: string) => ({
    queryKey: ['recruitments', 'draft', { recruitmentId }],
    queryFn: () => getRecruitmentDraft(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/application-form */
  getRecruitmentApplicationForm: (recruitmentId: string) => ({
    queryKey: ['recruitments', 'applicationForm', { recruitmentId }],
    queryFn: () => getRecruitmentApplicationForm(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/application-form/draft */
  getRecruitmentApplicationFormDraft: (recruitmentId: string) => ({
    queryKey: ['recruitments', 'applicationFormDraft', { recruitmentId }],
    queryFn: () => getRecruitmentApplicationFormDraft(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/dashboard */
  getRecruitmentDashboardSummary: (recruitmentId: string) => ({
    queryKey: ['recruitments', 'dashboardSummary', { recruitmentId }],
    queryFn: () => getRecruitmentDashboardSummary(recruitmentId),
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
    queryKey: ['documents', 'selections', 'applicants', { recruitmentId, ...params }],
    queryFn: () => getDocumentSelectedApplicants(recruitmentId, params),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluation */
  getDocumentEvaluationApplicationDetail: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documents', 'evaluation', 'applicationDetail', { recruitmentId, applicantId }],
    queryFn: () => getDocumentEvaluationApplicationDetail(recruitmentId, applicantId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations */
  getDocumentEvaluationAnswers: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documents', 'evaluation', 'answers', { recruitmentId, applicantId }],
    queryFn: () => getDocumentEvaluationAnswers(recruitmentId, applicantId),
  }),
  /** GET /recruitments/{recruitmentId}/applications/{applicationId}/document-evaluations/me */
  getDocumentEvaluationMyAnswer: (recruitmentId: string, applicantId: string) => ({
    queryKey: ['documents', 'evaluation', 'myAnswer', { recruitmentId, applicantId }],
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
    queryKey: ['documents', 'evaluation', 'applicants', { recruitmentId, ...params }],
    queryFn: () => getDocumentEvaluationApplicants(recruitmentId, params),
  }),

  /** GET /recruitments/{recruitmentId}/interview-sheets/questions - 면접 질문지(사전 질문) 조회 */
  getInterviewQuestions: (recruitmentId: string, part: PartType | 'COMMON') => ({
    queryKey: ['interviews', 'questions', { recruitmentId, part }],
    queryFn: () => getInterviewQuestions(recruitmentId, part),
  }),

  /** GET /recruitments/{recruitmentId}/interview-sheets/parts - 면접 질문지 작성 가능 파트 조회 */
  getAvailableInterviewParts: (recruitmentId: string) => ({
    queryKey: ['interviews', 'availableParts', { recruitmentId }],
    queryFn: () => getAvailableInterviewParts(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/interview-sheets/slot-applicants - 특정 슬롯에 배정 가능한 지원자 / 이미 배정된 지원자 조회 */
  getInterviewSlotApplicants: (recruitmentId: string, slotId: string) => ({
    queryKey: ['interviews', 'slotApplicants', { recruitmentId, slotId }],
    queryFn: () => getInterviewSchedulingSlotApplicants(recruitmentId, slotId),
  }),
  /** GET /recruitments/{recruitmentId}/interviews/scheduling/slots - 면접 슬롯 목록 조회 */
  getInterviewSlots: (recruitmentId: string, date?: string, part?: PartType | 'ALL') => ({
    queryKey: ['interviews', 'slots', { recruitmentId, date, part }],
    queryFn: () => getInterviewSlots(recruitmentId, date, part),
  }),

  /** GET /recruitments/{recruitmentId}/interviews/scheduling/summary - 면접 스케줄링 요약 조회 */
  getInterviewSchedulingSummary: (recruitmentId: string) => ({
    queryKey: ['interviews', 'schedulingSummary', { recruitmentId }],
    queryFn: () => getInterviewSchedulingSummary(recruitmentId),
  }),
  /** GET /recruitments/{recruitmentId}/interviews/scheduling/assignments - 특정 면접 슬롯에 배정된 지원자 조회 */
  getInterviewSlotAssignments: (recruitmentId: string, slotId: string) => ({
    queryKey: ['interviews', 'slotAssignments', { recruitmentId, slotId }],
    queryFn: () => getInterviewSlotAssignments(recruitmentId, slotId),
  }),
})
