export type EvaluationDocumentType =
  | '서류 평가 전'
  | '서류 평가 예정'
  | '서류 평가 중'
  | '서류 평가 완료'

export type EvaluationFinalType =
  | '면접 평가 전'
  | '면접 평가 예정'
  | '면접 평가 중'
  | '면접 평가 완료'

export type Workbook = {
  id: string
  title: string
  weekNo: string
  description: string
  workbookUrl: string
  startDate: string
  endDate: string
  missionType: string
  releasedAt: string
  isReleased: boolean
}
