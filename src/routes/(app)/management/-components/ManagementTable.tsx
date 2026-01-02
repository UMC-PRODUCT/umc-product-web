import { useMemo } from 'react'
import * as S from './ManagementTable.style'
import Navigation from './Navigation'
import type { ButtonStyleType } from '@/types/style'
import { typography } from '@/styles/theme/typography'
import { theme } from '@/styles/theme'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Flex from '@/components/common/Flex/Flex'

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
  rows: Array<ManagementRow>
  selectedIds: Set<number>
  setSelectedIds: (
    ids: Set<number> | ((prev: Set<number>) => Set<number>),
  ) => void
  children: React.ReactNode
  type: 'school' | 'account'
  buttonChildren?: React.ReactNode
  currentPage?: number
  totalPages?: number
  onChangePage?: (page: number) => void
}

export default function ManagementTable({
  rows,
  headerLabels,
  children,
  selectedIds,
  setSelectedIds,
  type,
  buttonChildren,
  currentPage,
  totalPages,
  onChangePage,
}: ManagementTableProps) {
  const isAllChecked = useMemo(
    () => rows.length > 0 && selectedIds.size === rows.length,
    [rows.length, selectedIds],
  )

  const toggleAll = () => {
    if (isAllChecked) {
      setSelectedIds(new Set())
      return
    }
    setSelectedIds(new Set(rows.map((item) => item.id)))
  }

  return (
    <>
      <Flex
        direction="column"
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
                  <Checkbox
                    toggleCheck={toggleAll}
                    value={isAllChecked}
                  ></Checkbox>
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
            총 {rows.length}개 {type === 'account' ? '계정' : '학교'}
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
