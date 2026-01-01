import Header from '@/components/common/Header/Header'

const left = [
  {
    label: '모집 안내',
    link: '/recruiting',
  },
  {
    label: '지원하기',
    link: '/apply',
  },
  {
    label: '마이 대시보드',
    link: '/dashboard',
  },
]

const social = [
  {
    label: 'UMC 문의 카카오톡 채널',
    link: 'https://pf.kakao.com/_xgxbxbC',
    icon: 'kakao' as const,
  },
  {
    label: 'UMC Instagram',
    link: 'https://www.instagram.com/umcchannel',
    icon: 'instagram' as const,
  },
  {
    label: 'UMC 중앙대 Instagram',
    link: 'https://www.instagram.com/umc_cdu',
    icon: 'instagram' as const,
  },
  {
    label: 'UMC YouTube',
    link: 'https://www.youtube.com/@umcchannel',
    icon: 'youtube' as const,
  },
]

export default function ChallengerHeader() {
  return <Header leftChildren={left} social={social} />
}
