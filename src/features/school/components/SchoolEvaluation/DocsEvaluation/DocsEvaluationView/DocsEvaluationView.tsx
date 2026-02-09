import { useState } from 'react'
import { css } from '@emotion/react'
import { useNavigate, useParams } from '@tanstack/react-router'

import * as Shared from '@shared/styles/shared'

import { useGetDocumentEvaluationApplication } from '@/features/apply/hooks/useGetApplicationQuery'
// import { answers } from '@/features/school/mocks/application'
import ArrowUp from '@/shared/assets/icons/arrow_up.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import { DocsPassModal } from '../../../modals/DocsPassModal/DocsPassModal'
import EvaluationStatus from '../../EvaluationStatus/EvaluationStatus'
import MyEvaluation from '../../MyEvaluation/MyEvaluation'
import ApplicantList from '../ApplicationList/ApplicantList'
import ApplicationView from '../ApplicationView/ApplicationView'
import * as S from './DocsEvaluationView.style'

const DocsEvaluationContent = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [summary, setSummary] = useState<{ totalCount: string; evaluatedCount: string } | null>(
    null,
  )
  const { recruitmentId } = useParams({ from: '/(app)/school/evaluation/$recruitmentId/' })
  const { data: answerData, isLoading: isApplicationLoading } = useGetDocumentEvaluationApplication(
    recruitmentId,
    selectedUserId,
  )

  const navigate = useNavigate()
  return (
    <>
      <Shared.TabHeader flexDirection="row" justifyContent="space-between" alignItems="center">
        <Shared.TabHeader alignItems="flex-start">
          <Shared.TabTitle>지원서 평가</Shared.TabTitle>
        </Shared.TabHeader>
        <Flex width={'fit-content'} gap={16}>
          {summary && summary.totalCount === summary.evaluatedCount && (
            <S.Button onClick={() => setModal(true)}>
              <span>서류 합격 처리</span>
              <ArrowUp width={22} height={22} color={theme.colors.white} />
            </S.Button>
          )}
          <Button
            typo="B4.Md"
            tone="lime"
            variant="outline"
            label="← 뒤로가기"
            css={{ width: '95px', height: '37px', padding: '5px 14px' }}
            onClick={() =>
              navigate({
                to: '/school/evaluation',
              })
            }
          />
        </Flex>
      </Shared.TabHeader>
      <S.Wrapper>
        <ApplicantList
          recruitmentId={recruitmentId}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          onSummaryChange={setSummary}
        />
        <Section
          variant="solid"
          padding={'12px'}
          height={'100%'}
          maxHeight={'100%'}
          css={{ overflowY: 'hidden', boxSizing: 'border-box' }}
        >
          <div css={RightSection}>
            <ApplicationView
              data={answerData?.result}
              isLoading={Boolean(selectedUserId) && isApplicationLoading}
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
              <EvaluationStatus selectedUserId={selectedUserId} recruitingId={recruitmentId} />
              <MyEvaluation selectedUserId={selectedUserId} recruitingId={recruitmentId} />
            </div>
          </div>
        </Section>
      </S.Wrapper>
      {modal && <DocsPassModal onClose={() => setModal(false)} recruitingId={recruitmentId} />}
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
