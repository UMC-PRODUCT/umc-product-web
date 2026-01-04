import { theme } from '@shared/styles/theme'
import { typography } from '@shared/styles/theme/typography'
import type { ButtonStyleType } from '@shared/types/style'
import { Checkbox } from '@shared/ui/common/Checkbox/Checkbox'
import Flex from '@shared/ui/common/Flex/Flex'

import * as S from './ManagementTable.style'
import Navigation from './Navigation'

export type ManagementRow = {
  id: number
  name: string
  branch: string
  date: string
  status: string
}

export type ManagementFooterButton = {
  label: string
  tone: ButtonStyleType
  onClick: () => void
  disabled?: boolean
}

type ManagementTableProps = {
  headerLabels: Array<string>
  isAllChecked: boolean
  onToggleAll: () => void
  children: React.ReactNode
  type: 'school' | 'account'
  buttonChildren?: React.ReactNode
  currentPage?: number
  totalPages?: number
  onChangePage?: (page: number) => void
  totalAmounts: number
}

export default function ManagementTable({
  headerLabels,
  children,
  isAllChecked,
  onToggleAll,
  type,
  buttonChildren,
  currentPage,
  totalPages,
  onChangePage,
  totalAmounts,
}: ManagementTableProps) {
  return (
    <>
      <Flex
        flexDirection="column"
        css={{
          border: `1px solid ${theme.colors.gray[600]}`,
          borderRadius: '12px',
          overflow: 'hidden',
          paddingBottom: '16px',
        }}
      >
        <S.TableWrapper>
          <S.Table>
            <thead
              css={{
                backgroundColor: theme.colors.gray[800],
              }}
            >
              <tr>
                <S.Th>
                  <Checkbox onCheckedChange={onToggleAll} checked={isAllChecked} />
                </S.Th>
                {headerLabels.map((label) => (
                  <S.Th key={label}>{label}</S.Th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </S.Table>
        </S.TableWrapper>
        <S.Footer>
          <span css={{ color: theme.colors.gray[300], ...typography.C4.Rg }}>
            총 {totalAmounts}개 {type === 'account' ? '계정' : '학교'}
          </span>
          {totalPages && totalPages > 1 && onChangePage && (
            <Navigation
              currentPage={currentPage ?? 1}
              totalPages={totalPages}
              onChangePage={onChangePage}
            />
          )}
        </S.Footer>
      </Flex>
      <S.BottomButtonGroup>{buttonChildren}</S.BottomButtonGroup>
    </>
  )
}
