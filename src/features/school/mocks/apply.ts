import type { EvaluationDocumentType, EvaluationFinalType, PartType } from '@/shared/types/umc'

export const APPLY_PART_STATUS_MOCKS: Array<{ part: PartType | '총 지원자'; applyNum: number }> = [
  {
    part: 'Plan',
    applyNum: 42,
  },
  {
    part: 'Design',
    applyNum: 37,
  },
  {
    part: 'Web',
    applyNum: 45,
  },
  {
    part: 'Android',
    applyNum: 33,
  },
  {
    part: 'iOS',
    applyNum: 29,
  },
  {
    part: 'SpringBoot',
    applyNum: 31,
  },
  {
    part: 'Node.js',
    applyNum: 27,
  },
  {
    part: '총 지원자',
    applyNum: 244,
  },
]

export const EVALUATION_PART_STATUS_MOCKS: Array<{
  part: PartType
  document: EvaluationDocumentType
  interview: EvaluationFinalType
}> = [
  {
    part: 'Plan',
    document: '서류 평가 예정',
    interview: '면접 평가 전',
  },
  {
    part: 'Design',
    document: '서류 평가 중',
    interview: '면접 평가 전',
  },
  {
    part: 'Web',
    document: '서류 평가 완료',
    interview: '면접 평가 예정',
  },
  {
    part: 'Android',
    document: '서류 평가 완료',
    interview: '면접 평가 예정',
  },
  {
    part: 'iOS',
    document: '서류 평가 완료',
    interview: '면접 평가 중',
  },
  {
    part: 'SpringBoot',
    document: '서류 평가 완료',
    interview: '면접 평가 중',
  },
  {
    part: 'Node.js',
    document: '서류 평가 완료',
    interview: '면접 평가 완료',
  },
]
