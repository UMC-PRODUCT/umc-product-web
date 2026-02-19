// API
export type { CommonPagingResponseDTO, CommonResponseDTO } from './api'
export type { PostRefreshTokenResponseDTO } from './auth'

// Apply / Question
export type {
  DocumentStatusType,
  FileUploadAnswer,
  FileUploadStatus,
  FinalStatusType,
  QuestionAnswerValue,
  QuestionType,
  TimeTableSlots,
  UploadedFile,
} from './apply'

// Form / Recruiting
export type {
  DateRange,
  FormOption,
  FormPage,
  FormQuestion,
  Option,
  OptionAnswerValue,
  QuestionMode,
  RecruitingForms,
  RecruitingInterviewTimeTable,
  RecruitingItem,
  RecruitingItemOption,
  RecruitingItemQuestionType,
  RecruitingSchedule,
  RecruitingStatus,
  RecruitmentApplicationForm,
  ResumeFormSectionProps,
} from './form'

// Recruiting shared
export type {
  ApplicationFormPayload,
  ApplicationFormQuestion,
  InterviewTimeTableWithDisabled,
  Phase,
  QuestionOption,
  QuestionSummary,
  RecruitingDraft,
  RequiredSchedule,
  RequiredScheduleWithDisabled,
  ScheduleSlot,
} from './recruiting'

// Management shared
export type { EvaluationDocumentType, EvaluationFinalType, Workbook } from './management'

// Link
export type { ExternalLink } from './link'

// School shared
export type {
  DocumentEvaluationAnswer,
  DocumentEvaluationQuestion,
  GetDocumentEvaluationApplicationResponseDTO,
} from './school'

// Calendar
export type { CalendarEvent, CalendarEvents } from './calendar'

// Common UI
export type {
  BadgeTone,
  BadgeVariant,
  ButtonTone,
  ButtonVariant,
  SvgIconComponent,
} from './component'

// Part
export type { PartListType, PartSmallType, PartType } from './part'

// Style
export type { ButtonStyleType } from './style'
export type { TypoGroup, TypoToken } from './typo'

// Domain common
export type {
  AccountLevelType,
  AccountStateType,
  EvaluationStatusType,
  OrganizationType,
  PostFileType,
  RecruitmentStatusType,
  ResumeType,
  RoleType,
  SchoolStateType,
  SelectionsSortType,
  TermsType,
} from './umc'
