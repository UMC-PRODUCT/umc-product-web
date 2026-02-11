import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ServerErrorCard from '../components/common/ServerErrorCard'
import type { RecruitingProps } from '../hooks/useRecruitingContentLogic'
import { RecruitingContent } from './RecruitingContent'

export const Recruiting = (props: RecruitingProps) => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="모집 데이터를 불러오는 중입니다." />}
    errorFallback={(error, reset) => (
      <ServerErrorCard
        errorStatus={(error as { response?: { status?: number } } | null)?.response?.status}
        errorMessage={error.message || '데이터를 불러오지 못했어요.'}
        onRetry={reset}
      />
    )}
  >
    <RecruitingContent {...props} />
  </AsyncBoundary>
)

export type { RecruitingProps }
