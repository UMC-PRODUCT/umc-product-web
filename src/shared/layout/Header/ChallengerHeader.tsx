import Header from '@shared/layout/Header/Header'

const left = [
  {
    label: '대시보드',
    link: '/dashboard',
  },
  {
    label: '모집 안내',
    link: '/recruiting',
  },
  {
    label: '지원하기',
    link: '/apply',
  },
]
// TODO: 데이터 수정 필요
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

const nav = {
  label: '자주 묻는 질문',
  link: '/', // TODO: 링크 수정
}

const ChallengerHeader = () => {
  return <Header leftChildren={left} social={social} nav={nav} />
}

export default ChallengerHeader
