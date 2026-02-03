import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import type { RecruitingProps } from '../hooks/useRecruitingContentLogic'
import RecruitingContent from './RecruitingContent'

const Recruiting = (props: RecruitingProps) => (
  <AsyncBoundary fallback={<SuspenseFallback label="모집 데이터를 불러오는 중입니다." />}>
    <RecruitingContent {...props} />
  </AsyncBoundary>
)

export default Recruiting
export type { RecruitingProps }
