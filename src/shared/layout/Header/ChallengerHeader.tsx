import Header from '@/shared/layout/Header/Header'

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

const nav = {
  label: '자주 묻는 질문',
  link: '/#faq',
}

const ChallengerHeader = () => {
  return <Header leftChildren={left} nav={nav} />
}

export default ChallengerHeader
