import type { HTMLAttributes, ReactNode } from 'react'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'

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
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    height="100%"
    gap={gap}
    css={{
      padding: '60px 0',
      color: theme.colors.gray[400],
      textAlign: 'center',
    }}
    {...rest}
  >
    <Loading label={label} />
    {children}
  </Flex>
)

export default SuspenseFallback
