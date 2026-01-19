export const DEFAULT_DESCRIPTION =
  'UMC 운영팀이 정책·계정·데이터를 한 곳에서 관리할 수 있도록 만든 백오피스입니다.'
export const HOME_DESCRIPTION =
  'UMC 운영팀을 위한 백오피스 홈입니다. 운영 효율과 정책 반영 속도를 높입니다.'
export const DESCRIPTION_RULES: Array<{ prefix: string; description: string }> = [
  {
    prefix: '/auth/login',
    description: 'UMC Web 로그인 페이지입니다.',
  },
  {
    prefix: '/auth/register',
    description: 'UMC Web 회원가입 페이지입니다.',
  },
  {
    prefix: '/recruiting',
    description: 'UMC 모집 공고 및 일정 정보를 확인하는 페이지입니다.',
  },
  {
    prefix: '/apply',
    description: 'UMC 지원서 작성 및 제출을 위한 페이지입니다.',
  },
  {
    prefix: '/dashboard',
    description: 'UMC 지원 현황과 진행 상태를 확인하는 대시보드입니다.',
  },
  {
    prefix: '/management',
    description: '총괄 계정·시스템 관리 페이지입니다.',
  },
  {
    prefix: '/school',
    description: '학교별 UMC 운영 및 모집 관리를 위한 페이지입니다.',
  },
]
