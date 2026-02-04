import type {
  FinalStatusType,
  GetApplicationAnswerResponseDTO,
} from '@/features/apply/domain/model'
import type { PartType } from '@/features/auth/domain'

export const answers: GetApplicationAnswerResponseDTO = {
  recruitmentId: '34',
  formId: '34',
  formResponseId: '10',
  status: 'DRAFT',
  lastSavedAt: '2026-02-03T06:13:28.617546Z',
  submittedAt: null,
  answers: [
    {
      questionId: '925',
      value: {
        selectedOptionId: '185',
      },
      answeredAsType: 'RADIO',
    },
    {
      questionId: '926',
      value: {
        otherText: 'ㅎㅎ',
        selectedOptionIds: ['189', '188', '190'],
      },
      answeredAsType: 'CHECKBOX',
    },
    {
      questionId: '923',
      value: {
        text: '텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?텍스트가매우매우길어진다면?',
      },
      answeredAsType: 'LONG_TEXT',
    },
    {
      questionId: '895',
      value: {
        preferredParts: ['NODEJS'],
      },
      answeredAsType: 'PREFERRED_PART',
    },
    {
      questionId: '897',
      value: {
        text: 'ㅁㄴㅇㄹ',
      },
      answeredAsType: 'LONG_TEXT',
    },
    {
      questionId: '903',
      value: {
        text: 'ㅁㄴㅇㄹ',
      },
      answeredAsType: 'SHORT_TEXT',
    },
    {
      questionId: '927',
      value: {
        files: [
          {
            fileId: 'file_01GZ8X0Z5Y6AKZ8WFX7V9ZZZQ0',
          },
        ],
        links: [
          {
            url: 'https://localhost:3000/portfolio',
          },
        ],
      },
      answeredAsType: 'PORTFOLIO',
    },
    {
      questionId: '896',
      value: {
        selected: [
          {
            date: '2026-02-06',
            times: [
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
            ],
          },
          {
            date: '2026-02-07',
            times: [
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
            ],
          },
          {
            date: '2026-02-08',
            times: [
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
            ],
          },
          {
            date: '2026-02-09',
            times: [
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
            ],
          },
          {
            date: '2026-02-10',
            times: [
              '14:00',
              '14:30',
              '15:00',
              '15:30',
              '16:00',
              '16:30',
              '17:00',
              '17:30',
              '18:00',
            ],
          },
        ],
      },
      answeredAsType: 'SCHEDULE',
    },
    {
      questionId: '924',
      value: {
        text: 'ㄹㄹㄹㄹㄹ',
      },
      answeredAsType: 'LONG_TEXT',
    },
  ],
}

type RealTimeEvaluationType = {
  time: string
  applicants: Array<{
    id: string
    name: string
    nickname: string
    tags: Array<PartType>
    status: FinalStatusType
    score: number
    time: string
  }>
}
export const REALTIME_EVALUATION_MOCK: Array<RealTimeEvaluationType> = [
  {
    time: '16:00 - 17:00',
    applicants: [
      {
        id: '1',
        name: '홍길동',
        nickname: '코드마스터',
        tags: ['SPRINGBOOT', 'NODEJS'],
        status: 'PASSED',
        score: 92.0,
        time: '16:00',
      },
      {
        id: '2',
        name: '김철수',
        nickname: '프론트장인',
        tags: ['WEB', 'SPRINGBOOT'],
        status: 'EVALUATING',
        score: 85.5,
        time: '16:30',
      },
    ],
  },
  {
    time: '17:00 - 18:00',
    applicants: [
      {
        id: '3',
        name: '이영희',
        nickname: '기획천재',
        tags: ['PLAN', 'DESIGN'],
        status: 'PENDING',
        score: 88.0,
        time: '17:00',
      },
      {
        id: '4',
        name: '박보검',
        nickname: '앱돌이',
        tags: ['ANDROID', 'IOS'],
        status: 'PENDING',
        score: 90.0,
        time: '17:30',
      },
    ],
  },
  {
    time: '18:00 - 19:00',
    applicants: [
      {
        id: '5',
        name: '최자바',
        nickname: '백엔드왕',
        tags: ['SPRINGBOOT'],
        status: 'SCHEDULED',
        score: 79.0,
        time: '18:00',
      },
      {
        id: '6',
        name: '조노드',
        nickname: '서버술사',
        tags: ['NODEJS', 'WEB'],
        status: 'FAILED',
        score: 65.0,
        time: '18:30',
      },
    ],
  },
]
