import type { UniversitySimple } from '../domain/model'

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
  schools: Array<UniversitySimple>
}
