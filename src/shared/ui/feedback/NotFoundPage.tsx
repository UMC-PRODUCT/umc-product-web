import { css } from '@emotion/react'
import { Link } from '@tanstack/react-router'

import { theme } from '@/shared/styles/theme'

interface NotFoundPageProps {
  title?: string
  message?: string
  showHomeLink?: boolean
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '40px 20px',
  textAlign: 'center',
  gap: '24px',
  backgroundColor: theme.colors.black,
})

const errorCodeStyle = css({
  fontSize: '120px',
  fontWeight: 700,
  color: theme.colors.lime,
  lineHeight: 1,
  margin: 0,
})

const titleStyle = css({
  ...theme.typography.H2.Sb,
  color: theme.colors.white,
  margin: 0,
})

const messageStyle = css({
  ...theme.typography.B3.Rg,
  color: theme.colors.gray[400],
  maxWidth: '400px',
})

const linkStyle = css({
  ...theme.typography.B2.Md,
  backgroundColor: theme.colors.lime,
  color: theme.colors.black,
  textDecoration: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.9,
  },
})

const NotFoundPage = ({
  title = '페이지를 찾을 수 없습니다',
  message = '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
  showHomeLink = true,
}: NotFoundPageProps) => {
  return (
    <div css={containerStyle}>
      <p css={errorCodeStyle}>404</p>
      <h1 css={titleStyle}>{title}</h1>
      <p css={messageStyle}>{message}</p>
      {showHomeLink && (
        <Link to="/" css={linkStyle}>
          홈으로 돌아가기
        </Link>
      )}
    </div>
  )
}

export default NotFoundPage
