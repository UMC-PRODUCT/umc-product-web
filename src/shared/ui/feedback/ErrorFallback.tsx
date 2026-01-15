import { css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

interface ErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: '40px 20px',
  textAlign: 'center',
  gap: '24px',
})

const titleStyle = css({
  ...theme.typography.H2.Sb,
  color: theme.colors.white,
})

const messageStyle = css({
  ...theme.typography.B3.Rg,
  color: theme.colors.gray[400],
  maxWidth: '400px',
})

const detailStyle = css({
  ...theme.typography.B4.Rg,
  color: theme.colors.gray[500],
  backgroundColor: theme.colors.gray[800],
  padding: '12px 16px',
  borderRadius: '8px',
  maxWidth: '500px',
  overflow: 'auto',
  wordBreak: 'break-word',
})

const buttonStyle = css({
  ...theme.typography.B2.Md,
  backgroundColor: theme.colors.lime,
  color: theme.colors.black,
  border: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.9,
  },
})

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>문제가 발생했습니다</h1>
      <p css={messageStyle}>
        페이지를 불러오는 중 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      {error?.message && <p css={detailStyle}>{error.message}</p>}
      {resetErrorBoundary && (
        <button type="button" css={buttonStyle} onClick={resetErrorBoundary}>
          다시 시도
        </button>
      )}
    </div>
  )
}

export default ErrorFallback
