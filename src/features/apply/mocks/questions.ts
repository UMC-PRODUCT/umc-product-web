import type { QuestionList, QuestionUnion } from '@/features/apply/types/question'
import { PART } from '@/shared/constants/umc'
import type { PartType } from '@/shared/types/umc'

type StaticPage = {
  page: number
  type: 'static'
  questions: Array<QuestionUnion>
}

type SlotPage = {
  page: number
  type: 'slot'
  slotId: 'PART_PAGES'
  necessary: boolean
  insert: {
    sourceQuestionId: number // 파트 선택 질문 id(=3)
    order: Array<1 | 2> // [1,2]면 1지망 먼저, [2,1]도 가능
    startPage: number // “몇 페이지부터” 끼울지 (빌더가 정한 값)
  }
}

type FormDefinition = {
  id: number
  title: string
  description: string
  pages: Array<StaticPage | SlotPage>
  partQuestionBank: Record<PartType, Array<{ type: 'static'; questions: Array<QuestionUnion> }>>
}

export const MOCKFORMSDATA_C_WITH_SLOT: FormDefinition = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: `동아리에 지원해주셔서 감사합니다.`,
  pages: [
    {
      page: 1,
      type: 'static',
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'text',
          question: '학과명을 입력해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'choice',
          question: '2026년 3월 기준, 본인의 학적 상태를 선택해 주세요.',
          necessary: true,
          options: ['재학', '휴학', '졸업유예'],
          answer: '',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'part',
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
      type: 'static',
      questions: [
        {
          id: 4,
          questionNumber: 4,
          type: 'longText',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'timeTable',
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
          type: 'fileUpload',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: { files: [], links: [] },
        },
      ],
    },

    {
      page: 3,
      type: 'slot',
      slotId: 'PART_PAGES',
      necessary: true,
      insert: {
        sourceQuestionId: 3,
        order: [1, 2],
        startPage: 3,
      },
    },
  ],

  partQuestionBank: {
    Web: [
      {
        type: 'static',
        questions: [
          {
            id: 1001,
            questionNumber: 1,
            type: 'longText',
            question: '웹 파트 질문',
            necessary: true,
            answer: '',
          },
        ],
      },
    ],
    SpringBoot: [
      {
        type: 'static',
        questions: [
          {
            id: 2001,
            questionNumber: 1,
            type: 'longText',
            question: '서버 파트 질문',
            necessary: true,
            answer: '',
          },
        ],
      },
    ],
    Design: [
      {
        type: 'static',
        questions: [
          {
            id: 3001,
            questionNumber: 1,
            type: 'fileUpload',
            question: '디자인 포폴',
            necessary: false,
            answer: { files: [], links: [] },
          },
        ],
      },
    ],
    Plan: [],
    'Node.js': [],
    iOS: [],
    Android: [],
  },
}

export const MOCKFORMSDATA_WITH_ANSWER: QuestionList = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: `동아리에 지원해주셔서 감사합니다.
지원서 작성 시 아래 안내 사항을 꼭 확인해 주세요.
  1. 모든 질문에 성실히 답변해 주세요.
  2. 면접 일정은 추후 개별 연락 드립니다.
  3. 포트폴리오가 없더라도 지원 가능합니다.`,
  pages: [
    {
      page: 1,
      type: 'static',
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'text',
          question: '학과명을 입력해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'choice',
          question: '2026년 3월 기준, 본인의 학적 상태를 선택해 주세요.',
          necessary: true,
          options: ['재학', '휴학', '졸업유예'],
          answer: '',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'part',
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
      type: 'static',
      questions: [
        {
          id: 4,
          questionNumber: 4,
          type: 'longText',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'timeTable',
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
          type: 'fileUpload',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: { files: [], links: [] },
        },
      ],
    },

    {
      page: 3,
      type: 'slot',
      slotId: 'PART_PAGES',
      insert: {
        sourceQuestionId: 3,
        order: [1, 2],
        startPage: 3,
      },
    },
  ],

  partQuestionBank: {
    Web: [
      {
        type: 'static',
        questions: [
          {
            id: 1001,
            questionNumber: 1,
            type: 'longText',
            question: '웹 파트 질문',
            necessary: true,
            answer: '',
          },
        ],
      },
    ],
    SpringBoot: [
      {
        type: 'static',
        questions: [
          {
            id: 2001,
            questionNumber: 1,
            type: 'longText',
            question: '서버 파트 질문',
            necessary: true,
            answer: '',
          },
        ],
      },
    ],
    Design: [
      {
        type: 'static',
        questions: [
          {
            id: 3001,
            questionNumber: 1,
            type: 'fileUpload',
            question: '디자인 포폴',
            necessary: false,
            answer: { files: [], links: [] },
          },
        ],
      },
    ],
    Plan: [],
    'Node.js': [],
    iOS: [],
    Android: [],
  },
}
