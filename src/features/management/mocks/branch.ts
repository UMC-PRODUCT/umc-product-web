export const MOCK_BRANCHES = [
  {
    id: 1,
    name: 'Ain 지부',
    schools: [
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
    ],
    totalNum: 9,
  },
  {
    id: 2,
    name: 'Ain 지부',
    schools: [
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
    ],
    totalNum: 9,
  },
  {
    id: 3,
    name: 'Ain 지부',
    schools: [
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
      '중앙대학교',
    ],
    totalNum: 9,
  },
  {
    id: 4,
    name: 'Ain 지부',
    schools: ['중앙대학교', '중앙대학교', '중앙대학교'],
    totalNum: 3,
  },
  {
    id: 5,
    name: 'Ain 지부',
    schools: ['중앙대학교', '중앙대학교', '중앙대학교', '중앙대학교', '중앙대학교'],
    totalNum: 5,
  },
]
export interface School {
  id: string
  name: string
}

export interface Branch {
  id: string
  name: string
  schools: Array<School>
}

export const MOCK_BRANCHES_MATCHING: Array<Branch> = Array.from({ length: 6 }, (_, i) => ({
  id: `branch-${i + 1}`,
  name: 'Ain 지부',
  schools: Array.from({ length: 8 }, (__, j) => ({
    id: `school-${i}-${j}`,
    name: '중앙대학교',
  })),
}))

export const MOCK_WAITING_SCHOOLS: Array<School> = Array.from({ length: 5 }, (_, i) => ({
  id: `waiting-${i}`,
  name: '중앙대학교',
}))
