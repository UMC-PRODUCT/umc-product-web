import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import { Tab } from '@/shared/ui/common/Tab'

import DocsEvaluation from '../components/SchoolEvaluation/DocsEvaluation'
import FinalEvaluation from '../components/SchoolEvaluation/FinalEvaluation/FinalEvaluation'
import InterviewEvaluation from '../components/SchoolEvaluation/InterviewEvaluation/InterviewEvaluation'
import { EVALUATION_TAB } from '../domain'

interface SchoolEvaluationProps {
  activeTab: (typeof EVALUATION_TAB)[number]['value']
  onTabChange: (next: (typeof EVALUATION_TAB)[number]['value']) => void
}

const SchoolEvaluation = ({ activeTab, onTabChange }: SchoolEvaluationProps) => {
  return (
    <Flex justifyContent="center">
      <PageLayout>
        <Tab
          tabs={EVALUATION_TAB}
          value={activeTab}
          onValueChange={onTabChange}
          contentCss={{ padding: '22px 18px' }}
        >
          {activeTab === 'docs' && <DocsEvaluation />}
          {activeTab === 'interview' && <InterviewEvaluation />}
          {activeTab === 'final' && <FinalEvaluation />}
        </Tab>
      </PageLayout>
    </Flex>
  )
}
export default SchoolEvaluation

const PageLayout = styled.div`
  flex-direction: column;
  gap: 28px;
  padding: 42px 20px;
  ${media.down(theme.breakPoints.desktop)} {
    padding: 20px 20px;
  }
  max-width: 1320px;
  width: 100%;
`
