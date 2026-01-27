import type { CalendarEvents } from '@/shared/types/calendar'

import type { PartData } from '../domain'

export const RAW_EVENTS: CalendarEvents = [
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

export const RECRUITING_NOTICE = {
  title: 'UMC 11기 챌린저 모집',
  content: `안녕하세요, 회장단입니다.
  2026년 11기 신입 회원을 모집합니다. 열정과 책임감을 가지고 함께 성장할 분들을 찾고 있습니다.
  실제 서비스 개발 경험을 쌓고, 다양한 파트의 사람들과 협업하며 개발 역량을 키워나갈 수 있습니다.
  관심 있으신 분들의 많은 지원 부탁드립니다! `,
}

export const MOCK_PART_CURRICULUM: Array<PartData> = [
  {
    id: 'PLAN',
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
    id: 'DESIGN',
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
