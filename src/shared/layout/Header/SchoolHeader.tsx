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

const SchoolHeader = () => {
  return <Header leftChildren={left} />
}

export default SchoolHeader
