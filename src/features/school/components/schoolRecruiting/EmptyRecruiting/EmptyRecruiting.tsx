import { theme } from '@/shared/styles/theme'

const EmptyRecruiting = ({ tab }: { tab: '진행 중' | '종료된 모집' | '예정된 모집' }) => {
  const label =
    tab === '진행 중'
      ? '진행 중인 모집이 없습니다.'
      : tab === '종료된 모집'
        ? '종료된 모집이 없습니다.'
        : '예정된 모집이 없습니다.'
  return (
    <span
      css={{
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        color: theme.colors.gray[400],
        ...theme.typography.B4.Rg,
      }}
    >
      {label}
    </span>
  )
}
export default EmptyRecruiting
