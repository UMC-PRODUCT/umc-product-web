import type { RecruitingTab } from '@/features/school/domain'
import { theme } from '@/shared/styles/theme'

const EmptyRecruiting = ({ tab }: { tab: RecruitingTab }) => {
  const label =
    tab === 'ONGOING'
      ? '진행 중인 모집이 없습니다.'
      : tab === 'CLOSED'
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
