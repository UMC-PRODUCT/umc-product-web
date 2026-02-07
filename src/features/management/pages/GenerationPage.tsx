import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import GenerationCreate from '../components/generation/GenerationCreate/GenerationCreate'
import GenerationList from '../components/generation/GenerationList/GenerationList'

const GenerationPageContent = () => {
  return (
    <PageLayout title="기수 관리" subTitle="기수를 생성하거나 삭제할 수 있습니다.">
      <Section variant="outline">
        <GenerationCreate />
        <GenerationList />
      </Section>
    </PageLayout>
  )
}

const GenerationPage = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback label="모집 일정을 불러오는 중입니다." />}
      errorFallback={() => (
        <PageLayout>
          <Flex flexDirection="column" gap={112} css={{ color: theme.colors.gray[400] }}>
            현재 진행 중인 모집이 없습니다.
          </Flex>
        </PageLayout>
      )}
    >
      <GenerationPageContent />
    </AsyncBoundary>
  )
}
export default GenerationPage
