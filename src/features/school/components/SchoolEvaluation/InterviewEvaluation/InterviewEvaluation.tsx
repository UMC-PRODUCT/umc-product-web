import { useState } from 'react'

import * as Shared from '@/shared/styles/shared'

import Scheduling from './Scheduling/Scheduling'
import * as S from './InterviewEvaluation.style'

const TabInfo = {
  scheduling: {
    title: '면접 스케줄링',
    subtitle: '시간대별 가능 인원을 확인하고 면접 일정을 배치합니다.',
  },
  questions: {
    title: '면접 질문지 생성',
    subtitle: '공통 또는 파트별 면접 질문지를 생성합니다.',
  },
  evaluations: {
    title: '실시간 면접 평가',
    subtitle: '지원자들의 면접을 실시간으로 평가합니다.',
  },
}
const InterviewEvaluation = () => {
  const [interviewTab, setInterviewTab] = useState<'scheduling' | 'questions' | 'evaluations'>(
    'scheduling',
  )
  return (
    <>
      <S.Buttons>
        <S.Button
          $isActive={interviewTab === 'scheduling'}
          onClick={() => setInterviewTab('scheduling')}
        >
          스케줄링
        </S.Button>
        <S.Button
          $isActive={interviewTab === 'questions'}
          onClick={() => setInterviewTab('questions')}
        >
          질문지
        </S.Button>
        <S.Button
          $isActive={interviewTab === 'evaluations'}
          onClick={() => setInterviewTab('evaluations')}
        >
          평가
        </S.Button>
      </S.Buttons>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>{TabInfo[interviewTab].title}</Shared.TabTitle>
        <Shared.TabSubtitle>{TabInfo[interviewTab].subtitle}</Shared.TabSubtitle>
      </Shared.TabHeader>
      {interviewTab === 'scheduling' && <Scheduling />}
      {interviewTab === 'questions' && <div>면접 질문지 생성 화면</div>}
      {interviewTab === 'evaluations' && <div>실시간 면접 평가 화면</div>}
    </>
  )
}

export default InterviewEvaluation
