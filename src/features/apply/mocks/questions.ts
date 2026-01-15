import { PART } from '@/shared/constants/umc'

import type { QuestionList } from '../domain/model'

export const MOCKFORMSDATA_WITH_ANSWER: QuestionList = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: `동아리에 지원해주셔서 감사합니다.`,
  lastSavedTime: '2024년 6월 1일 14:30',
  pages: [
    {
      page: 1,
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'SHORT_TEXT',
          question: '학과명을 입력해 주세요.',
          necessary: true,
          answer: '컴퓨터공학과',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'RADIO',
          question: '2026년 3월 기준, 본인의 학적 상태를 선택해 주세요.',
          necessary: true,
          options: ['재학', '휴학', '졸업유예'],
          answer: '재학',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'PART',
          question: '희망하는 파트를 1지망, 2지망 순으로 선택해 주세요.',
          necessary: true,
          options: [
            { id: 1, options: PART },
            { id: 2, options: PART },
          ],
          answer: [
            { id: 1, answer: 'Plan' },
            { id: 2, answer: 'Design' },
          ],
        },
      ],
    },
    {
      page: 2,
      questions: [
        {
          id: 4,
          questionNumber: 4,
          type: 'LONG_TEXT',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer: '웹 서비스 기획과 구현 경험을 쌓고 싶어 지원했습니다.',
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'SCHEDULE',
          question: '면접 가능한 시간을 선택해 주세요.',
          necessary: true,
          timeRange: ['16:00', '22:00'],
          dates: ['1/4', '1/5', '1/6', '1/7'],
          disabled: {
            '1/4': ['16:00', '16:30', '17:00'],
            '1/5': ['18:00', '18:30'],
          },
          answer: {
            '1/4': ['18:00', '18:30'],
            '1/6': ['19:00'],
            '1/7': ['20:00', '20:30'],
          },
        },
        {
          id: 6,
          questionNumber: 6,
          type: 'PORTFOLIO',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: { files: [], links: ['https://github.com/example/portfolio'] },
        },
      ],
    },

    {
      page: 3,
      questions: [],
    },
  ],

  partQuestionBank: {
    Web: [
      {
        questions: [
          {
            id: 1001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '웹 파트 질문',
            necessary: true,
            answer: 'React로 간단한 커뮤니티 페이지를 제작했습니다.',
          },
          {
            id: 1002,
            questionNumber: 2,
            type: 'RADIO',
            question: '웹 개발 경험 수준을 선택해 주세요.',
            necessary: true,
            options: ['입문', '초급', '중급', '고급'],
            answer: '중급',
          },
          {
            id: 1003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '최근에 만들었던 웹 프로젝트를 간단히 소개해 주세요.',
            necessary: false,
            answer: 'Vite+React로 동아리 소개 페이지를 만들었습니다.',
          },
        ],
      },
    ],
    SpringBoot: [
      {
        questions: [
          {
            id: 2001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '서버 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 2002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'SpringBoot 사용 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '개인 프로젝트', '팀 프로젝트', '실무 경험'],
            answer: '',
          },
          {
            id: 2003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'API 설계에서 중요하다고 생각하는 점을 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    Design: [
      {
        questions: [
          {
            id: 3001,
            questionNumber: 1,
            type: 'PORTFOLIO',
            question: '디자인 포폴',
            necessary: false,
            answer: { files: [], links: ['https://www.behance.net/example'] },
          },
          {
            id: 3002,
            questionNumber: 2,
            type: 'RADIO',
            question: '사용 가능한 디자인 툴을 선택해 주세요.',
            necessary: true,
            options: ['Figma', 'Photoshop', 'Illustrator', '기타'],
            answer: 'Figma',
          },
          {
            id: 3003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '최근에 관심 있는 디자인 트렌드를 적어주세요.',
            necessary: false,
            answer: '심플한 타이포그래피와 그리드 기반 레이아웃입니다.',
          },
        ],
      },
    ],
    Plan: [
      {
        questions: [
          {
            id: 4001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '기획 파트 질문',
            necessary: true,
            answer: '사용자 인터뷰를 바탕으로 기능 우선순위를 정했습니다.',
          },
          {
            id: 4002,
            questionNumber: 2,
            type: 'RADIO',
            question: '기획 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '아이디어 단계', '서비스 기획', '실제 출시 경험'],
            answer: '서비스 기획',
          },
          {
            id: 4003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '문제를 정의하고 해결했던 경험을 적어주세요.',
            necessary: false,
            answer: '문제 정의 후 MVP로 검증했습니다.',
          },
        ],
      },
    ],
    'Node.js': [
      {
        questions: [
          {
            id: 5001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'Node.js 파트 질문',
            necessary: true,
            answer: 'Express로 인증/게시판 API를 만들었습니다.',
          },
          {
            id: 5002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Node.js 개발 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '개인 프로젝트', '팀 프로젝트', '실무 경험'],
            answer: '개인 프로젝트',
          },
          {
            id: 5003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'API 성능 개선 경험이 있다면 적어주세요.',
            necessary: false,
            answer: '캐싱으로 응답 시간을 줄였습니다.',
          },
        ],
      },
    ],
    iOS: [
      {
        questions: [
          {
            id: 6001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'iOS 파트 질문',
            necessary: true,
            answer: 'SwiftUI로 투두 앱을 개발했습니다.',
          },
          {
            id: 6002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Swift 사용 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '기초 학습', '개인 프로젝트', '팀 프로젝트'],
            answer: '개인 프로젝트',
          },
          {
            id: 6003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'iOS에서 가장 흥미로웠던 기술을 적어주세요.',
            necessary: false,
            answer: 'Combine 기반 비동기 처리입니다.',
          },
        ],
      },
    ],
    Android: [
      {
        questions: [
          {
            id: 7001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'Android 파트 질문',
            necessary: true,
            answer: 'Kotlin으로 간단한 기록 앱을 만들었습니다.',
          },
          {
            id: 7002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Android 개발 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '기초 학습', '개인 프로젝트', '팀 프로젝트'],
            answer: '기초 학습',
          },
          {
            id: 7003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'Android에서 가장 어려웠던 점을 적어주세요.',
            necessary: false,
            answer: '권한 처리와 생명주기 관리입니다.',
          },
        ],
      },
    ],
  },
}

export const MOCKFORMSDATA_WITH_NO_ANSWER: QuestionList = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: `동아리에 지원해주셔서 감사합니다.
지원서 작성 시 아래 안내 사항을 꼭 확인해 주세요.
  1. 모든 질문에 성실히 답변해 주세요.
  2. 면접 일정은 추후 개별 연락 드립니다.
  3. 포트폴리오가 없더라도 지원 가능합니다.`,
  lastSavedTime: '2024년 6월 1일 14:30',
  pages: [
    {
      page: 1,
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'SHORT_TEXT',
          question: '학과명을 입력해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'RADIO',
          question: '2026년 3월 기준, 본인의 학적 상태를 선택해 주세요.',
          necessary: true,
          options: ['재학', '휴학', '졸업유예'],
          answer: '',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'PART',
          question: '희망하는 파트를 1지망, 2지망 순으로 선택해 주세요.',
          necessary: true,
          options: [
            { id: 1, options: PART },
            { id: 2, options: PART },
          ],
          answer: [],
        },
      ],
    },
    {
      page: 2,
      questions: [
        {
          id: 4,
          questionNumber: 4,
          type: 'LONG_TEXT',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'SCHEDULE',
          question: '면접 가능한 시간을 선택해 주세요.',
          necessary: true,
          timeRange: ['16:00', '22:00'],
          dates: ['1/4', '1/5', '1/6', '1/7'],
          disabled: {
            '1/4': ['16:00', '16:30', '17:00'],
            '1/5': ['18:00', '18:30'],
          },
          answer: {},
        },
        {
          id: 6,
          questionNumber: 6,
          type: 'PORTFOLIO',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: { files: [], links: [] },
        },
      ],
    },

    {
      page: 3,
      questions: [],
    },
  ],

  partQuestionBank: {
    Web: [
      {
        questions: [
          {
            id: 1001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '웹 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 1002,
            questionNumber: 2,
            type: 'RADIO',
            question: '웹 개발 경험 수준을 선택해 주세요.',
            necessary: true,
            options: ['입문', '초급', '중급', '고급'],
            answer: '',
          },
          {
            id: 1003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '최근에 만들었던 웹 프로젝트를 간단히 소개해 주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    SpringBoot: [
      {
        questions: [
          {
            id: 2001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '서버 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 2002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'SpringBoot 사용 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '개인 프로젝트', '팀 프로젝트', '실무 경험'],
            answer: '',
          },
          {
            id: 2003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'API 설계에서 중요하다고 생각하는 점을 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    Design: [
      {
        questions: [
          {
            id: 3001,
            questionNumber: 1,
            type: 'PORTFOLIO',
            question: '디자인 포폴',
            necessary: false,
            answer: { files: [], links: [] },
          },
          {
            id: 3002,
            questionNumber: 2,
            type: 'RADIO',
            question: '사용 가능한 디자인 툴을 선택해 주세요.',
            necessary: true,
            options: ['Figma', 'Photoshop', 'Illustrator', '기타'],
            answer: '',
          },
          {
            id: 3003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '최근에 관심 있는 디자인 트렌드를 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    Plan: [
      {
        questions: [
          {
            id: 4001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: '기획 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 4002,
            questionNumber: 2,
            type: 'RADIO',
            question: '기획 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '아이디어 단계', '서비스 기획', '실제 출시 경험'],
            answer: '',
          },
          {
            id: 4003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: '문제를 정의하고 해결했던 경험을 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    'Node.js': [
      {
        questions: [
          {
            id: 5001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'Node.js 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 5002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Node.js 개발 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '개인 프로젝트', '팀 프로젝트', '실무 경험'],
            answer: '',
          },
          {
            id: 5003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'API 성능 개선 경험이 있다면 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    iOS: [
      {
        questions: [
          {
            id: 6001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'iOS 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 6002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Swift 사용 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '기초 학습', '개인 프로젝트', '팀 프로젝트'],
            answer: '',
          },
          {
            id: 6003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'iOS에서 가장 흥미로웠던 기술을 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
    Android: [
      {
        questions: [
          {
            id: 7001,
            questionNumber: 1,
            type: 'LONG_TEXT',
            question: 'Android 파트 질문',
            necessary: true,
            answer: '',
          },
          {
            id: 7002,
            questionNumber: 2,
            type: 'RADIO',
            question: 'Android 개발 경험을 선택해 주세요.',
            necessary: true,
            options: ['없음', '기초 학습', '개인 프로젝트', '팀 프로젝트'],
            answer: '',
          },
          {
            id: 7003,
            questionNumber: 3,
            type: 'LONG_TEXT',
            question: 'Android에서 가장 어려웠던 점을 적어주세요.',
            necessary: false,
            answer: '',
          },
        ],
      },
    ],
  },
}
