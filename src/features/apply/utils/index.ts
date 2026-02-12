export type { ResumeQuestion } from '@/features/apply/utils/form/answerUtils'
export { isOptionAnswerValue, isQuestionAnswerEmpty } from '@/features/apply/utils/form/answerUtils'
export {
  buildDefaultValuesFromQuestions,
  type ResumeFormValues,
} from '@/features/apply/utils/form/buildDefaultValuesFromQuestions'
export {
  findPartQuestion,
  getSelectedPartsForSubmission,
  getSelectedPartsFromAnswer,
} from '@/features/apply/utils/form/partSelection'
export {
  findFirstErrorPageIndex,
  getAllQuestionFieldIds,
  getAllQuestionsFromPages,
  getPageRequiredFieldIds,
} from '@/features/apply/utils/form/questionSelectors'
export { resolvePagesWithSlots } from '@/features/apply/utils/form/resolvePagesWithSlots'
export {
  getSubmissionFormValues,
  getSubmissionItems,
} from '@/features/apply/utils/form/submissionItems'
