export const TIME_SLOTS = [
  { time: '16:00 - 16:30', count: 7, selected: true },
  { time: '16:30 - 17:00', count: 8, completed: true },
  { time: '17:00 - 17:30', count: 12 },
  { time: '17:30 - 18:00', count: 13 },
  { time: '18:00 - 18:30', count: 12 },
  { time: '18:30 - 19:00', count: 10 },
  { time: '19:00 - 19:30', count: 11 },
]

type Card = {
  id: string
  name: string
  nickname: string
  tags: Array<string>
  score: string
  time?: string
}

export const APPLICANTS: {
  assigned: Array<Card>
  default: Array<Card>
} = {
  assigned: [
    {
      id: 'usr-101',
      name: '김철수',
      nickname: '에이스',
      tags: ['SPRING', 'NODEJS'],
      score: '서류 94.5점',
      time: '2026.02.03 (화) 13:30 - 14:00',
    },
    {
      id: 'usr-102',
      name: '이영희',
      nickname: '영희보배',
      tags: ['DESIGN', 'WEB'],
      score: '서류 89.0점',
      time: '2026.02.03 (화) 13:30 - 14:00',
    },
    {
      id: 'usr-103',
      name: '최민수',
      nickname: '마운틴',
      tags: ['IOS'],
      score: '서류 85.0점',
      time: '2026.02.03 (화) 13:30 - 14:00',
    },
  ],
  default: [
    {
      id: 'usr-201',
      name: '한소룡',
      nickname: '드래곤',
      tags: ['ANDROID', 'NODEJS'],
      score: '서류 91.2점',
    },
    {
      id: 'usr-202',
      name: '박기획',
      nickname: '플래너',
      tags: ['PLAN'],
      score: '서류 88.0점',
    },
    {
      id: 'usr-203',
      name: '정코딩',
      nickname: '풀스택',
      tags: ['WEB', 'SPRING'],
      score: '서류 93.0점',
    },
    {
      id: 'usr-204',
      name: '윤디자인',
      nickname: '픽셀',
      tags: ['DESIGN'],
      score: '서류 82.5점',
    },
  ],
}
