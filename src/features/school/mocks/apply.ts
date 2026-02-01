import type { PartApplyStatus, PartEvaluationStatus } from '@features/school/domain'

export const APPLY_PART_STATUS_MOCKS: Array<PartApplyStatus> = [
  {
    part: 'PLAN',
    applyNum: 42,
  },
  {
    part: 'DESIGN',
    applyNum: 37,
  },
  {
    part: 'WEB',
    applyNum: 45,
  },
  {
    part: 'ANDROID',
    applyNum: 33,
  },
  {
    part: 'IOS',
    applyNum: 29,
  },
  {
    part: 'SPRINGBOOT',
    applyNum: 31,
  },
  {
    part: 'NODEJS',
    applyNum: 27,
  },
  {
    part: '총 지원자',
    applyNum: 244,
  },
]

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
