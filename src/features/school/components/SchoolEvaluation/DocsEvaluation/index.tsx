import { useState } from 'react'
import { css } from '@emotion/react'

import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import ApplicantList from './ApplicationList/ApplicantList'
import EvaluationStatus from './EvaluationStatus/EvalutationStatus'
import MyEvaluation from './MyEvaluation/MyEvaluation'
import * as S from './index.style'

const DocsEvaluation = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
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
            <Section
              variant="both"
              height={'100%'}
              maxHeight={'100%'}
              css={{ backgroundColor: `${theme.colors.gray[700]}` }}
            />
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

export default DocsEvaluation

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
`
