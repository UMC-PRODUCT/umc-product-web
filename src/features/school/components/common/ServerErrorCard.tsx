import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

type ServerErrorCardProps = {
  errorStatus?: number
  errorMessage: string
  onRetry?: () => void
  message?: string
  description?: string
}

const ServerErrorCard = ({
  errorStatus,
  errorMessage,
  onRetry,
  message,
  description,
}: ServerErrorCardProps) => {
  const isServerMaintenance = errorStatus === 500
  const title = message ?? (isServerMaintenance ? '서버 점검 안내' : '데이터 로딩 실패')
  const helperText =
    description ??
    (isServerMaintenance
      ? '현재 서버 점검으로 인해 요청을 처리할 수 없습니다.'
      : '네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.')
  const detailText = isServerMaintenance
    ? '서버 점검중입니다. 잠시후에 다시 시도해주세요.'
    : errorMessage

  return (
    <Section maxHeight={504} gap={10} padding="24px 16px">
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
          boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
        }}
      >
        !
      </Flex>
      <Flex
        flexDirection="column"
        gap={6}
        css={{
          maxWidth: 440,
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
          {helperText}
        </span>
        <span
          css={{
            color: theme.colors.gray[400],
            fontSize: '12px',
            wordBreak: 'keep-all',
          }}
        >
          {detailText}
        </span>
      </Flex>
      <Button
        label="다시 시도"
        tone="lime"
        variant="solid"
        typo="B4.Md"
        onClick={onRetry}
        disabled={!onRetry}
        css={{ minWidth: 140, width: 280, height: 40 }}
      />
    </Section>
  )
}

export default ServerErrorCard
