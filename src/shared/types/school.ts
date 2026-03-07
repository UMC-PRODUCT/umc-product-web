export type SchoolSummary = {
  schoolId: string
  schoolName: string
}

export type SchoolListResponseDTO = {
  schools: Array<SchoolSummary>
}

export type ApplicantMember = {
  memberId: string
  name: string
  nickname: string
}

export type DocumentEvaluationQuestionType =
  | 'PREFERRED_PART'
  | 'SCHEDULE'
  | 'LONG_TEXT'
  | 'SHORT_TEXT'
  | 'RADIO'
  | 'CHECKBOX'
  | 'PORTFOLIO'
  | 'DROPDOWN'

export type DocumentEvaluationQuestionOption = {
  optionId: string
  content: string
  isOther: boolean
}

export type DocumentEvaluationAnswer = {
  answeredAsType: string
  displayText: string | null
  rawValue: Record<string, unknown>
}

export type DocumentEvaluationQuestion = {
  questionId: string
  orderNo: string
  type: DocumentEvaluationQuestionType
  questionText: string
  required: boolean
  options: Array<DocumentEvaluationQuestionOption>
  answer: DocumentEvaluationAnswer | null
}

export type DocumentEvaluationQuestionGroup = {
  part: string
  questions: Array<DocumentEvaluationQuestion>
}

export type DocumentEvaluationFormPage = {
  pageNo: string
  questions: Array<DocumentEvaluationQuestion>
  partQuestions: Array<DocumentEvaluationQuestionGroup>
}

export type GetDocumentEvaluationApplicationResponseDTO = {
  applicationId: string
  status: string
  applicant: ApplicantMember
  formPages: Array<DocumentEvaluationFormPage>
}
