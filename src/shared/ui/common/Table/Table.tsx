import { theme } from '@/shared/styles/theme'
import { typography } from '@/shared/styles/theme/typography'
import type { ButtonStyleType } from '@/shared/types/style'
import { Checkbox } from '@/shared/ui/common/Checkbox/Checkbox'
import Flex from '@/shared/ui/common/Flex/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'

import * as S from './Table.style'

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

type TableProps<T, TId extends string | number = string | number> = {
  headerLabels: Array<string>
  isAllChecked: boolean | 'indeterminate'
  onToggleAll: (checked: boolean | 'indeterminate') => void
  children?: React.ReactNode
  type: 'school' | 'account'
  buttonChildren?: React.ReactNode
  currentPage?: number
  totalPages?: number
  onChangePage?: (page: number) => void
  enablePagination?: boolean
  showFooter?: boolean
  totalAmounts: number
  rows?: Array<T>
  renderRow?: (row: T) => React.ReactNode
  getRowId?: (row: T) => TId
  activeRowId?: TId | null
  onRowClick?: (id: TId) => void
}

const Table = <T, TId extends string | number = string | number>({
  headerLabels,
  children,
  isAllChecked,
  onToggleAll,
  type,
  buttonChildren,
  currentPage,
  totalPages,
  onChangePage,
  enablePagination = true,
  showFooter = true,
  totalAmounts,
  rows,
  renderRow,
  getRowId,
  activeRowId,
  onRowClick,
}: TableProps<T, TId>) => {
  const shouldRenderRows = rows && renderRow && getRowId
  return (
    <>
      <Flex
        flexDirection="column"
        css={{
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.Th>
                  <Checkbox onCheckedChange={onToggleAll} checked={isAllChecked} />
                </S.Th>
                {headerLabels.map((label) => (
                  <S.Th key={label}>{label}</S.Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shouldRenderRows
                ? rows.map((row) => {
                    const id = getRowId(row)
                    return (
                      <tr
                        key={String(id)}
                        data-active={activeRowId === id}
                        onClick={() => onRowClick?.(id)}
                      >
                        {renderRow(row)}
                      </tr>
                    )
                  })
                : children}
            </tbody>
          </S.Table>
        </S.TableWrapper>
        {showFooter && (
          <S.Footer>
            <span css={{ color: theme.colors.gray[300], ...typography.C4.Rg }}>
              총 {totalAmounts}개 {type === 'account' ? '계정' : '학교'}
            </span>
            {enablePagination && totalPages && totalPages > 1 && onChangePage && (
              <Navigation
                currentPage={currentPage ?? 1}
                totalPages={totalPages}
                onChangePage={onChangePage}
              />
            )}
          </S.Footer>
        )}
      </Flex>
      {buttonChildren && <S.BottomButtonGroup>{buttonChildren}</S.BottomButtonGroup>}
    </>
  )
}

export default Table
