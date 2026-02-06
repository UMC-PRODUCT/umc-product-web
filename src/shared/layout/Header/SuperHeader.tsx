import Header from '@/shared/layout/Header/Header'

const left = [
  {
    label: '학교 관리',
    link: '/management/school',
  },
  {
    label: '계정 관리',
    link: '/management/account',
  },
  {
    label: '지원자 관리',
    link: '/management/candidate',
  },
  {
    label: '시스템 관리',
    link: '/management/system',
  },
]

const SuperHeader = () => {
  return <Header leftChildren={left} />
}

export default SuperHeader
