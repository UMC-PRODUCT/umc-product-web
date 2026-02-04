import { useState } from 'react'
import { css } from '@emotion/react'

// import { useGetApplicationAnswer } from '@/features/apply/hooks/useGetApplicationQuery'
import { useGetApplicationFormData } from '@/features/school/hooks/useGetRecruitingData'
import { answers } from '@/features/school/mocks/application'
import { media } from '@/shared/styles/media'
import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import EvaluationStatus from '../EvaluationStatus/EvaluationStatus'
import MyEvaluation from '../MyEvaluation/MyEvaluation'
import ApplicantList from './ApplicationList/ApplicantList'
import ApplicationView from './ApplicationView/ApplicationView'
import * as S from './index.style'

const DocsEvaluationContent = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  // const { data } = useGetApplicationAnswer()
  const { data: questionData } = useGetApplicationFormData('34')
  const data = answers

  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>지원서 평가</Shared.TabTitle>
        <Shared.TabSubtitle>지원자들의 지원 서류를 평가합니다.</Shared.TabSubtitle>
      </Shared.TabHeader>
      <S.Wrapper>
        <ApplicantList selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
        <Section
          variant="solid"
          padding={'12px'}
          height={'100%'}
          maxHeight={'100%'}
          css={{ overflowY: 'hidden', boxSizing: 'border-box' }}
        >
          <div css={RightSection}>
            <ApplicationView data={data} questions={questionData.result} />
            <div
              css={{
                display: 'grid',
                gap: '14px',
                height: '100%',
                maxHeight: '100%',
                minHeight: 0,
                gridTemplateRows: '1fr 1fr',
              }}
            >
              <EvaluationStatus selectedUserId={selectedUserId} />
              <MyEvaluation selectedUserId={selectedUserId} />
            </div>
          </div>
        </Section>
      </S.Wrapper>
    </>
  )
}

const RightSection = css`
  display: grid;
  gap: 14px;
  grid-template-columns: 1.3fr 1fr;
  width: 100%;
  height: 100%;
  max-height: 100%;
  min-height: 0;
  > * {
    min-height: 0;
  }
  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: 1fr;
  }
`

const DocsEvaluation = () => {
  return (
    <AsyncBoundary fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}>
      <DocsEvaluationContent />
    </AsyncBoundary>
  )
}

export default DocsEvaluation
