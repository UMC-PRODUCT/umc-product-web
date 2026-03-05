import type { HTMLAttributes, ReactNode } from 'react'

import FeedbackState from '@/shared/ui/common/FeedbackState/FeedbackState'

type SuspenseFallbackProps = {
  label?: string
  gap?: number
  children?: ReactNode
} & HTMLAttributes<HTMLDivElement>

const SuspenseFallback = ({
  label = '로딩 중입니다',
  gap = 18,
  children,
  ...rest
}: SuspenseFallbackProps) => (
  <FeedbackState mode="loading" loadingLabel={label} gap={gap} {...rest}>
    {children}
  </FeedbackState>
)

export default SuspenseFallback
