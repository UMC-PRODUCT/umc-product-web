import type { ReactNode } from 'react'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

type ErrorPageProps = {
  title?: string
  description?: ReactNode
  hint?: string
  onRetry?: () => void
  retryLabel?: string
}

const ErrorPage = ({
  title = '오류가 발생했습니다',
  description = '잠시 후 다시 시도해 주세요.',
  hint,
  onRetry,
  retryLabel = '다시 시도',
}: ErrorPageProps) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    gap={14}
    css={{
      padding: '70px 24px',
      minHeight: '260px',
      textAlign: 'center',
    }}
  >
    <Flex
      alignItems="center"
      justifyContent="center"
      width={64}
      height={64}
      css={{
        borderRadius: '50%',
        background: theme.colors.gray[600],
        color: theme.colors.gray[300],
        fontSize: '28px',
      }}
    >
      !
    </Flex>
    <Flex
      flexDirection="column"
      gap={6}
      css={{
        maxWidth: 420,
      }}
    >
      <span
        css={{
          fontSize: '24px',
          fontWeight: 600,
          color: theme.colors.gray[300],
        }}
      >
        {title}
      </span>
      <span
        css={{
          color: theme.colors.gray[300],
          fontSize: '16px',
        }}
      >
        {description}
      </span>
      {hint && (
        <span
          css={{
            color: theme.colors.gray[400],
            fontSize: '12px',
          }}
        >
          {hint}
        </span>
      )}
    </Flex>
    <Button
      label={retryLabel}
      tone="lime"
      variant="solid"
      onClick={onRetry}
      disabled={!onRetry}
      css={{ minWidth: 140, width: 300, height: 40 }}
    />
  </Flex>
)

export default ErrorPage
