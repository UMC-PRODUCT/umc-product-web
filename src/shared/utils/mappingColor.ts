import type { EvaluationDocumentType, EvaluationFinalType } from '../types/umc'

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

export function mappingEvaluationColor(status: EvaluationDocumentType | EvaluationFinalType) {
  switch (status) {
    case '서류 평가 전':
      return 'gray[400]'
    case '서류 평가 예정':
      return 'gray[400]'
    case '서류 평가 중':
      return 'white'
    case '서류 평가 완료':
      return 'lime'
    case '면접 평가 전':
      return 'gray[400]'
    case '면접 평가 예정':
      return 'gray[400]'
    case '면접 평가 중':
      return 'white'
    case '면접 평가 완료':
      return 'lime'
    default:
      return 'gray[400]'
  }
}
