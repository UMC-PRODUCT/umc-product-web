import type { GetApplicationAnswerResponseDTO } from '@/features/apply/domain/model'

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
