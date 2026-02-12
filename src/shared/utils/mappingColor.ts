import type { EvaluationStatusType } from '../types/umc'

export function mappingRecruitingColor(status: string | null | undefined) {
  switch (status) {
    case '미정':
      return 'gray'
    case '평가 중':
      return 'white'
    case '서류 합격':
      return 'lime'
    case '최종 합격':
      return 'lime'
    case '불합격':
      return 'necessary'
    case '예정':
      return 'gray'
    default:
      return 'gray'
  }
}

export function mappingEvaluationColor(status: EvaluationStatusType) {
  switch (status) {
    case 'NOT_STARTED':
      return 'gray[400]'
    case 'IN_PROGRESS':
      return 'white'
    case 'COMPLETED':
      return 'lime'
    default:
      return 'gray[400]'
  }
}
