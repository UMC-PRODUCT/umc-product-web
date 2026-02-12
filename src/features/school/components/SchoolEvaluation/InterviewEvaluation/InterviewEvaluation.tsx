import { useEffect, useState } from 'react'

import * as Shared from '@/shared/styles/shared'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import InterviewQuestions from './InterviewQuestions/InterviewQuestions'
import Scheduling from './Scheduling/Scheduling'
import * as S from './InterviewEvaluation.style'
import RealTimeEvaluation from './RealTimeEvaluation'

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
const STORAGE_KEY = 'schoolEvaluationInterviewTab'
type InterviewTab = 'scheduling' | 'questions' | 'evaluations'

const resolveInitialTab = (): InterviewTab => {
  const params = new URLSearchParams(window.location.search)
  const fromQuery = params.get('interviewTab')
  if (fromQuery === 'scheduling' || fromQuery === 'questions' || fromQuery === 'evaluations') {
    return fromQuery
  }
  const fromStorage = window.localStorage.getItem(STORAGE_KEY)
  if (
    fromStorage === 'scheduling' ||
    fromStorage === 'questions' ||
    fromStorage === 'evaluations'
  ) {
    return fromStorage
  }
  return 'scheduling'
}

const InterviewEvaluation = () => {
  const [interviewTab, setInterviewTab] = useState<InterviewTab>(resolveInitialTab)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, interviewTab)
    const url = new URL(window.location.href)
    url.searchParams.set('interviewTab', interviewTab)
    window.history.replaceState({}, '', url.toString())
  }, [interviewTab])
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
      {interviewTab === 'scheduling' && (
        <div css={{ minHeight: 600, width: '100%' }}>
          <AsyncBoundary fallback={<SuspenseFallback label="면접 스케줄링을 불러오는 중입니다." />}>
            <Scheduling />
          </AsyncBoundary>
        </div>
      )}
      {interviewTab === 'questions' && <InterviewQuestions />}
      {interviewTab === 'evaluations' && <RealTimeEvaluation />}
    </>
  )
}

export default InterviewEvaluation
