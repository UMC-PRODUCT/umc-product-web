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
  checkbox?: {
    isAllChecked: boolean | 'indeterminate'
    onToggleAll: (checked: boolean | 'indeterminate') => void
  }
  children?: React.ReactNode
  buttonChildren?: React.ReactNode

  showFooter?: boolean
  rows?: Array<T>
  renderRow?: (row: T) => React.ReactNode
  getRowId?: (row: T) => TId
  activeRowId?: TId | null
  onRowClick?: (id: TId) => void
  count?: {
    totalAmounts: number
    label: string
  }
  page?: {
    currentPage: number
    totalPages: number
    onChangePage?: (page: number) => void
  }
  label?: string
}

const Table = <T, TId extends string | number = string | number>({
  headerLabels,
  children,
  checkbox,
  buttonChildren,
  page,
  showFooter = true,
  count,
  rows,
  label,
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
                {checkbox && (
                  <S.Th>
                    <Checkbox
                      onCheckedChange={checkbox.onToggleAll}
                      checked={checkbox.isAllChecked}
                    />
                  </S.Th>
                )}
                {headerLabels.map((headerLabel) => (
                  <S.Th key={headerLabel}>{headerLabel}</S.Th>
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
                        css={{ cursor: onRowClick ? 'pointer' : 'default' }}
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
            {label && (
              <span css={{ color: `${theme.colors.gray[400]}`, ...typography.C5.Rg }}>{label}</span>
            )}
            {count && (
              <span css={{ color: theme.colors.gray[300], ...typography.C4.Rg }}>
                총 {count.totalAmounts}개 {count.label}
              </span>
            )}
            {page && page.totalPages > 1 && page.onChangePage && (
              <Navigation
                currentPage={page.currentPage}
                totalPages={page.totalPages}
                onChangePage={page.onChangePage}
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
