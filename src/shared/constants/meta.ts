export const SITE_NAME = 'UMC | University Makeus Challenge'
export const DEFAULT_TITLE = SITE_NAME
export const DEFAULT_DESCRIPTION =
  'UMC 리쿠르팅 사이트입니다. 학교별 모집 공고 확인부터 지원서 제출까지 한 번에 진행할 수 있습니다.'
export const HOME_DESCRIPTION =
  'UMC 리쿠르팅 메인 페이지입니다. 최신 모집 일정과 지원 흐름을 빠르게 확인할 수 있습니다.'
export const DEFAULT_OG_IMAGE = '/assets/images/Preview.png'

export type SeoConfig = {
  title: string
  description: string
  robots: 'index,follow' | 'noindex,nofollow'
}

const PRIVATE_ROBOTS: SeoConfig['robots'] = 'noindex,nofollow'

const SEO_RULES: Array<{ prefix: string; config: Omit<SeoConfig, 'title'> & { title: string } }> = [
  {
    prefix: '/recruiting',
    config: {
      title: `모집 공고 | ${SITE_NAME}`,
      description: 'UMC 모집 공고 및 일정 정보를 확인하는 페이지입니다.',
      robots: 'index,follow',
    },
  },
  {
    prefix: '/auth/login',
    config: {
      title: `로그인 | ${SITE_NAME}`,
      description: 'UMC Web 로그인 페이지입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/auth/register',
    config: {
      title: `회원가입 | ${SITE_NAME}`,
      description: 'UMC Web 회원가입 페이지입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/apply',
    config: {
      title: `지원하기 | ${SITE_NAME}`,
      description: 'UMC 지원서 작성 및 제출을 위한 페이지입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/dashboard',
    config: {
      title: `대시보드 | ${SITE_NAME}`,
      description: 'UMC 지원 현황과 진행 상태를 확인하는 대시보드입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/management',
    config: {
      title: `운영 관리 | ${SITE_NAME}`,
      description: '총괄 계정·시스템 관리 페이지입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/school',
    config: {
      title: `학교 관리 | ${SITE_NAME}`,
      description: '학교별 UMC 운영 및 모집 관리를 위한 페이지입니다.',
      robots: PRIVATE_ROBOTS,
    },
  },
  {
    prefix: '/oauth/callback',
    config: {
      title: `로그인 처리 중 | ${SITE_NAME}`,
      description: DEFAULT_DESCRIPTION,
      robots: PRIVATE_ROBOTS,
    },
  },
]

export const resolveSeoConfig = (pathname: string): SeoConfig => {
  if (pathname === '/') {
    return {
      title: `홈 | ${SITE_NAME}`,
      description: HOME_DESCRIPTION,
      robots: 'index,follow',
    }
  }

  const matched = SEO_RULES.find((rule) => pathname.startsWith(rule.prefix))

  if (matched) {
    return matched.config
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    robots: PRIVATE_ROBOTS,
  }
}

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '')
const DEV_FALLBACK_SITE_URL = 'https://prod.umc.it.kr'

export const getSiteUrl = () => {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim()
  if (configuredSiteUrl) return trimTrailingSlash(configuredSiteUrl)
  if (typeof window !== 'undefined') return trimTrailingSlash(window.location.origin)
  if (import.meta.env.MODE === 'production') {
    throw new Error('VITE_SITE_URL must be configured in production environment')
  }
  return trimTrailingSlash(DEV_FALLBACK_SITE_URL)
}
