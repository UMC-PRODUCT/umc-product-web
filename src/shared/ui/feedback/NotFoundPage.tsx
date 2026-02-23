import { css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'

import errorIcon from '@shared/assets/icons/error.svg'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

interface NotFoundPageProps {
  title?: string
  message?: string
  showHomeLink?: boolean
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  width: '100%',
  gap: '80px',
  backgroundColor: theme.colors.black,
  [media.down(theme.breakPoints.desktop)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
})

const errorCodeStyle = css({
  fontSize: '44px',
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
  whiteSpace: 'pre-line',
  textAlign: 'start',
  [media.down(theme.breakPoints.desktop)]: {
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center',
  },
})

const linkStyle = css({
  ...theme.typography.B2.Md,
  backgroundColor: theme.colors.gray[300],
  color: theme.colors.black,
  textDecoration: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'opacity 0.2s',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
})

const innerContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [media.down(theme.breakPoints.desktop)]: {
    alignItems: 'center',
    gap: '16px',
  },
})

const iconStyle = css({
  width: 'clamp(180px, 32vw, 425px)',
  height: 'auto',
  flexShrink: 0,
})

const NotFoundPage = ({
  title = '페이지를 찾을 수 없습니다',
  message = `죄송합니다. 페이지를 찾을 수 없습니다.\n존재하지 않는 주소를 입력하셨거나,\n요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.`,
  showHomeLink = true,
}: NotFoundPageProps) => {
  const navigate = useNavigate()
  return (
    <div css={containerStyle}>
      <img css={iconStyle} src={errorIcon} alt="에러 아이콘" />
      <div css={innerContainerStyle}>
        <p css={errorCodeStyle}>404</p>
        <h1 css={titleStyle}>{title}</h1>
        <p css={messageStyle}>{message}</p>
        {showHomeLink && (
          <button
            type="button"
            css={linkStyle}
            onClick={() =>
              window.history.length > 1 ? window.history.back() : navigate({ to: '/' })
            }
          >
            이전으로 이동
          </button>
        )}
      </div>
    </div>
  )
}

export default NotFoundPage
