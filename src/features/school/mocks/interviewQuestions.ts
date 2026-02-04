export const INTERVIEW_QUESTIONS: Record<
  string,
  Array<{ id: string; question: string; isEditable?: boolean; nickname?: string; name?: string }>
> = {
  common: [
    {
      id: '1',
      question: '팀 프로젝트에서 의견 충돌이 있을 때 어떻게 해결하시나요?',
    },
    {
      id: '2',
      question: '협업 중 역할 갈등을 겪었던 경험이 있나요?',
    },
  ],
  firstChoice: [
    {
      id: '3',
      question: 'useState와 useRef의 차이점에 대해 설명해주세요.',
    },
    {
      id: '4',
      question: '왜 리액트를 선택했어요?',
    },
  ],
  secondChoice: [
    {
      id: '5',
      question: '객체에 관해 설명해보세요.',
    },
    {
      id: '6',
      question: '왜 스프링 부트를 선택했어요?',
    },
  ],
  additional: [
    {
      id: '7',
      question: '최근에 읽은 책이나 기사 중 인상 깊었던 내용을 공유해주세요.',
      isEditable: true,
      nickname: '코튼',
      name: '김연진',
    },
    {
      id: '8',
      question: '스트레스를 어떻게 관리하시나요?',
      isEditable: false,
      nickname: '카리나',
      name: '유지민',
    },
    {
      id: '9',
      question: '리더십 경험에 대해 이야기해주세요.',
      isEditable: true,
      nickname: '코튼',
      name: '김연진',
    },
    {
      id: '10',
      question: '실패를 극복한 경험이 있나요?',
      isEditable: false,
      nickname: '루나',
      name: '최지우',
    },
  ],
}
