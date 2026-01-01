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

const right = [
  {
    label: '시스템 관리',
    onClick: () => {},
    icon: 'arrowUp' as const,
  },
  {
    label: '외부 링크',
    onClick: () => {},
    icon: 'arrow' as const,
  },
]

export default function SuperHeader() {
  return <Header leftChildren={left} rightChildren={right} />
}
