import type { PartEvaluationStatus } from '@features/school/domain'

export const EVALUATION_PART_STATUS_MOCKS: Array<PartEvaluationStatus> = [
  {
    part: 'PLAN',
    document: '서류 평가 예정',
    interview: '면접 평가 전',
  },
  {
    part: 'DESIGN',
    document: '서류 평가 중',
    interview: '면접 평가 전',
  },
  {
    part: 'WEB',
    document: '서류 평가 완료',
    interview: '면접 평가 예정',
  },
  {
    part: 'ANDROID',
    document: '서류 평가 완료',
    interview: '면접 평가 예정',
  },
  {
    part: 'IOS',
    document: '서류 평가 완료',
    interview: '면접 평가 중',
  },
  {
    part: 'SPRINGBOOT',
    document: '서류 평가 완료',
    interview: '면접 평가 중',
  },
  {
    part: 'NODEJS',
    document: '서류 평가 완료',
    interview: '면접 평가 완료',
  },
]
