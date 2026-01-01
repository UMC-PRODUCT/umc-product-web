import Header from '@/components/common/Header/Header'

const left = [
  {
    label: '데이터 관리',
    link: '/management/data',
  },
  {
    label: '학교 관리',
    link: '/management/school',
  },
  {
    label: '계정 관리',
    link: '/management/account',
  },
  {
    label: '공지 관리',
    link: '/management/notice',
  },
  {
    label: '정책 관리',
    link: '/management/policy',
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

export default function SuperHeader() {
  return <Header leftChildren={left} social={social} />
}
