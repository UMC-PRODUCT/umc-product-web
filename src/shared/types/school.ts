type ApplicantMember = {
  memberId: string
  name: string
  nickname: string
}

type DocumentEvaluationQuestionOption = {
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
  type:
    | 'PREFERRED_PART'
    | 'SCHEDULE'
    | 'LONG_TEXT'
    | 'SHORT_TEXT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'PORTFOLIO'
    | 'DROPDOWN'
  questionText: string
  required: boolean
  options: Array<DocumentEvaluationQuestionOption>
  answer: DocumentEvaluationAnswer | null
}

type DocumentEvaluationFormPage = {
  pageNo: string
  questions: Array<DocumentEvaluationQuestion>
  partQuestions: Array<{
    part: string
    questions: Array<DocumentEvaluationQuestion>
  }>
}

export type GetDocumentEvaluationApplicationResponseDTO = {
  applicationId: string
  status: string
  applicant: ApplicantMember
  formPages: Array<DocumentEvaluationFormPage>
}
