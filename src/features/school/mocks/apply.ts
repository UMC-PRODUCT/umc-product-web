import type { PartApplyStatus, PartEvaluationStatus } from '@features/school/domain'

import type { PartCompletion } from '@/shared/types/form'

export const APPLY_PART_STATUS_MOCKS: Array<PartApplyStatus> = [
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

export const EVALUATION_PART_STATUS_MOCKS: Array<PartEvaluationStatus> = [
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

export const RECRUITING_LIST_MOCKS: Array<{
  id: number
  title: string
  startDate: string
  endDate: string
  applicants: number
  state: PartCompletion
}> = [
  {
    id: 1,
    title: 'UMC 14기 모집',
    startDate: '2024.06.01',
    endDate: '2024.06.30',
    applicants: 120,
    state: '진행 중',
  },
  {
    id: 2,
    title: 'UMC 13기 모집',
    startDate: '2023.12.01',
    endDate: '2023.12.31',
    applicants: 98,
    state: '모집 종료',
  },
  {
    id: 3,
    title: 'UMC 12기 모집',
    startDate: '2023.06.01',
    endDate: '2023.06.30',
    applicants: 142,
    state: '모집 종료',
  },
  {
    id: 4,
    title: 'UMC 15기 모집',
    startDate: '2024.12.01',
    endDate: '2024.12.20',
    applicants: 0,
    state: '모집 예정',
  },
  {
    id: 5,
    title: 'UMC 15기 모집',
    startDate: '2024.12.01',
    endDate: '2024.12.20',
    applicants: 0,
    state: '모집 예정',
  },
]
