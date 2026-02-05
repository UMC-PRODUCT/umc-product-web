import Header from '@/shared/layout/Header/Header'

const left = [
  {
    label: '대시보드',
    link: '/school/dashboard',
  },
  {
    label: '모집 관리',
    link: '/school/recruiting',
  },
  {
    label: '평가 관리',
    link: '/school/evaluation',
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

const SchoolHeader = () => {
  return <Header leftChildren={left} social={social} />
}

export default SchoolHeader
