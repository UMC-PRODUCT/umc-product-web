import type { PartType } from '@/features/auth/domain'

export type CandidateType = {
  id: number
  nickname: string
  name: string
  school: string
  part: Array<PartType>
  finalResult: {
    status: '합격' | '불합격' | '대기'
    part: PartType
  }
}

export const CANDIDATE: Array<CandidateType> = [
  {
    id: 1,
    nickname: 'happycoder',
    name: '김철수',
    school: '서울대학교',
    part: ['WEB', 'SPRINGBOOT'],
    finalResult: {
      status: '합격',
      part: 'WEB',
    },
  },
  {
    id: 2,
    nickname: 'smartdev',
    name: '이영희',
    school: '연세대학교',
    part: ['IOS', 'ANDROID'],
    finalResult: {
      status: '합격',
      part: 'IOS',
    },
  },
  {
    id: 3,
    nickname: 'designqueen',
    name: '박민지',
    school: '이화여자대학교',
    part: ['DESIGN'],
    finalResult: {
      status: '합격',
      part: 'DESIGN',
    },
  },
  {
    id: 4,
    nickname: 'nodehunter',
    name: '최준혁',
    school: '한양대학교',
    part: ['NODEJS', 'SPRINGBOOT'],
    finalResult: {
      status: '불합격',
      part: 'NODEJS',
    },
  },
  {
    id: 5,
    nickname: 'planner101',
    name: '정수빈',
    school: '고려대학교',
    part: ['PLAN'],
    finalResult: {
      status: '대기',
      part: 'PLAN',
    },
  },
  {
    id: 6,
    nickname: 'androidpro',
    name: '오세훈',
    school: '성균관대학교',
    part: ['ANDROID'],
    finalResult: {
      status: '합격',
      part: 'ANDROID',
    },
  },
  {
    id: 7,
    nickname: 'webmaster',
    name: '한지우',
    school: '중앙대학교',
    part: ['WEB'],
    finalResult: {
      status: '불합격',
      part: 'WEB',
    },
  },
  {
    id: 8,
    nickname: 'iosdream',
    name: '윤서연',
    school: '한성대학교',
    part: ['IOS', 'DESIGN'],
    finalResult: {
      status: '합격',
      part: 'IOS',
    },
  },
]
