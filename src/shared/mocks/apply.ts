import type { PartData } from '@/features/recruiting/components/partCurriculum/PartCurriculum'

export const RAW_EVENTS = [
  { id: 1, title: '서류 모집', startDate: '2026-01-02', endDate: '2026-01-06' },
  { id: 4, title: '면접 진행', startDate: '2026-01-12', endDate: '2026-01-16' },
  {
    id: 5,
    title: '최종 평가',
    startDate: '2026-01-18',
    endDate: '2026-01-20',
  },
  {
    id: 6,
    title: '최종 합격자 발표',
    startDate: '2026-01-22',
    endDate: '2026-01-22',
  },
]

export type CalendarEvents = Array<CalendarEvent>

export type CalendarEvent = {
  id: number
  title: string
  startDate: string // 'YYYY-MM-DD' 형식
  endDate: string // 'YYYY-MM-DD' 형식
}

export type EventSegment = {
  id: number
  title: string
  originalStart: Date
  originalEnd: Date
  segmentStart: Date
  segmentEnd: Date
  span: number // 일정이 차지하는 일수
  isStart: boolean // 실제 일정 시작일인가?
}

export const MOCK_DATA: Array<PartData> = [
  {
    id: 'Plan',
    label: 'Plan',
    requiredSkill: 'Figma 기초',
    curriculum: [
      { week: 0, content: 'PM 직무의 이해' },
      { week: 1, content: '프로젝트 아이디어 도출' },
      { week: 2, content: '프로젝트 아이디어 도출' },
      { week: 3, content: '프로젝트 아이디어 도출' },
      { week: 4, content: '프로젝트 아이디어 도출' },
      { week: 5, content: '프로젝트 아이디어 도출' },
      { week: 6, content: '프로젝트 아이디어 도출' },
      { week: 7, content: '프로젝트 아이디어 도출' },
      { week: 8, content: '프로젝트 아이디어 도출' },
      { week: 9, content: '프로젝트 아이디어 도출' },
      { week: 10, content: '프로젝트 아이디어 도출' },
      { week: 11, content: '프로젝트 아이디어 도출' },
      { week: 12, content: '프로젝트 아이디어 도출' },
    ],
  },
  {
    id: 'Design',
    label: 'Design',
    requiredSkill: 'Figma 기초',
    curriculum: [
      { week: 1, content: '디자인 직무의 이해' },
      { week: 2, content: '디자인 직무의 이해' },
      { week: 3, content: '디자인 직무의 이해' },
      { week: 4, content: '디자인 직무의 이해' },
      { week: 5, content: '디자인 직무의 이해' },
      { week: 6, content: '디자인 직무의 이해' },
      { week: 7, content: '디자인 직무의 이해' },
      { week: 8, content: '디자인 직무의 이해' },
      { week: 9, content: '디자인 직무의 이해' },
      { week: 10, content: '디자인 직무의 이해' },
    ],
  },
]
