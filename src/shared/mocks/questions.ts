import type { QuestionList } from '@/features/apply/type/question'

import { PART } from '../constants/umc'

export const MOCKFORMSDATA: QuestionList = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: '동아리에 지원해주셔서 감사합니다.',
  pages: [
    {
      page: 1,
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'text',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer: '',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'choice',
          question: '1순위로 희망하는 파트를 선택해 주세요.',
          necessary: true,
          options: PART,
          answer: '',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'multipleChoice',
          question: '가능한 언어를 모두 선택해 주세요.',
          necessary: false,
          options: ['React', 'TypeScript', 'Node.js', 'Python', 'Figma'],
          answer: [],
        },
        {
          id: 4,
          questionNumber: 4,
          type: 'timeTable',
          question: '면접 가능한 시간을 선택해 주세요.',
          necessary: true,
          timeRange: ['16:30', '22:00'],
          dates: ['1/4', '1/5', '1/6', '1/7'],
          disabled: {
            '1/4': ['16:00', '16:30', '17:00'],
            '1/5': ['18:00', '18:30'],
          },
          answer: {},
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'fileUpload',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: {
            files: [],
            links: [],
          },
        },
      ],
    },
    {
      page: 2,
      questions: [
        {
          id: 6,
          questionNumber: 6,
          type: 'multipleChoice',
          question: '사용 가능한 기술 스택을 모두 선택해 주세요.',
          necessary: false,
          options: ['React', 'TypeScript', 'Node.js', 'Spring', 'Figma', 'Next.js'],
          answer: [],
        },
        {
          id: 7,
          questionNumber: 7,
          type: 'timeTable',
          question: '면접 가능한 시간을 모두 선택해 주세요.',
          necessary: true,
          timeRange: ['10:00', '18:00'],
          dates: ['1/10', '1/11', '1/12'],
          disabled: {
            '1/10': ['10:00', '10:30'],
          },
          answer: {},
        },
        {
          id: 8,
          questionNumber: 8,
          type: 'fileUpload',
          question: '추가 포트폴리오(PDF)나 프로젝트 링크를 첨부해 주세요.',
          necessary: false,
          answer: {
            files: [],
            links: [],
          },
        },
      ],
    },
  ],
}
export const MOCKFORMSDATA_WITH_ANSWER: QuestionList = {
  id: 101,
  title: '2024 신입 부원 모집 설문',
  description: '동아리에 지원해주셔서 감사합니다.',
  pages: [
    {
      page: 1,
      questions: [
        {
          id: 1,
          questionNumber: 1,
          type: 'text',
          question: 'UMC에 지원하게 된 동기를 서술해 주세요.',
          necessary: true,
          answer:
            '평소 웹 개발에 관심이 많았고, 협업 프로젝트를 통해 실무 경험을 쌓고 싶어 지원하게 되었습니다.',
        },
        {
          id: 2,
          questionNumber: 2,
          type: 'choice',
          question: '1순위로 희망하는 파트를 선택해 주세요.',
          necessary: true,
          options: PART,
          answer: 'Web',
        },
        {
          id: 3,
          questionNumber: 3,
          type: 'multipleChoice',
          question: '가능한 언어를 모두 선택해 주세요.',
          necessary: false,
          options: ['React', 'TypeScript', 'Node.js', 'Python', 'Figma'],
          answer: ['React', 'TypeScript', 'Figma'],
        },
        {
          id: 4,
          questionNumber: 4,
          type: 'timeTable',
          question: '면접 가능한 시간을 선택해 주세요.',
          necessary: true,
          timeRange: ['16:30', '22:00'],
          dates: ['1/4', '1/5', '1/6', '1/7'],
          disabled: {
            '1/4': ['16:00', '16:30', '17:00'],
            '1/5': ['18:00', '18:30'],
          },
          answer: {
            '1/4': ['17:30', '18:00'],
            '1/6': ['19:00', '19:30', '20:00'],
          },
        },
        {
          id: 5,
          questionNumber: 5,
          type: 'fileUpload',
          question: '포트폴리오가 있다면 제출해 주세요.',
          necessary: false,
          answer: {
            files: [
              {
                id: 1736171400000,
                name: 'my_portfolio.pdf',
                size: 5484052,
                status: 'success',
                progress: 100,
              },
            ],
            links: ['https://github.com/example/my-project'],
          },
        },
      ],
    },
  ],
}
