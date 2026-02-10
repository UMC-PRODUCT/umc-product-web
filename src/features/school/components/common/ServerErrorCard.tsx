import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
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
  const detailText =
    isServerMaintenance && !message
      ? '서버 점검중입니다. 잠시후에 다시 시도해주세요.'
      : errorMessage

  return (
    <Section variant="solid" maxHeight={504} gap={0} padding="24px 16px">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap={10}
        css={{
          border: `1px solid ${theme.colors.gray[600]}`,
          borderRadius: 12,
          padding: '20px 16px',
          backgroundColor: theme.colors.gray[700],
          width: '100%',
        }}
      >
        <div css={{ ...theme.typography.B4.Sb, color: theme.colors.gray[300] }}>{title}</div>
        <div css={{ ...theme.typography.B5.Md, color: theme.colors.gray[400] }}>{helperText}</div>
        <ErrorMessage typo="B4.Md" errorMessage={detailText} />
        {onRetry && (
          <Button
            label="다시 시도"
            tone="gray"
            variant="outline"
            typo="B4.Md"
            onClick={onRetry}
            css={{ height: '36px', width: '100px' }}
          />
        )}
      </Flex>
    </Section>
  )
}

export default ServerErrorCard
