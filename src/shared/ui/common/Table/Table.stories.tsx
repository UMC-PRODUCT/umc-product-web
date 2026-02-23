import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import type { ManagementRow } from './Table'
import Table from './Table'
import * as S from './Table.style'

const rows: Array<ManagementRow> = [
  { id: 1, name: '김서연', branch: 'WEB', date: '2026-02-10', status: '대기' },
  { id: 2, name: '이민호', branch: 'DESIGN', date: '2026-02-11', status: '합격' },
  { id: 3, name: '박지우', branch: 'PLAN', date: '2026-02-11', status: '불합격' },
]

const meta = {
  title: 'Common/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table<ManagementRow>>

export default meta
type Story = StoryObj

export const Management: Story = {
  render: () => {
    const [activeRowId, setActiveRowId] = useState<number | null>(2)
    const [checkedIds, setCheckedIds] = useState<Array<number>>([2])
    const [page, setPage] = useState(1)

    const isAllChecked = useMemo(() => {
      if (checkedIds.length === 0) return false
      if (checkedIds.length === rows.length) return true
      return 'indeterminate' as const
    }, [checkedIds.length])

    return (
      <div style={{ width: '100%' }}>
        <Table<ManagementRow, number>
          headerLabels={['이름', '파트', '지원일', '상태']}
          rows={rows}
          getRowId={(row) => row.id}
          activeRowId={activeRowId}
          onRowClick={setActiveRowId}
          renderRow={(row) => (
            <>
              <S.Td>
                <input
                  type="checkbox"
                  aria-label={`${row.name} 선택`}
                  checked={checkedIds.includes(row.id)}
                  onChange={() =>
                    setCheckedIds((prev) =>
                      prev.includes(row.id)
                        ? prev.filter((id) => id !== row.id)
                        : [...prev, row.id],
                    )
                  }
                />
              </S.Td>
              <S.Td>{row.name}</S.Td>
              <S.Td>{row.branch}</S.Td>
              <S.Td>{row.date}</S.Td>
              <S.Td>{row.status}</S.Td>
            </>
          )}
          checkbox={{
            isAllChecked,
            onToggleAll: (checked) => {
              if (checked) setCheckedIds(rows.map((row) => row.id))
              else setCheckedIds([])
            },
          }}
          count={{ totalAmounts: rows.length, label: '명' }}
          page={{ currentPage: page, totalPages: 4, onChangePage: setPage }}
          label="지원자 목록"
          buttonChildren={
            <>
              <Button label="삭제" tone="gray" variant="outline" css={{ width: 100, padding: 8 }} />
              <Button label="상세 보기" tone="lime" css={{ width: 120, padding: 8 }} />
            </>
          }
        />
      </div>
    )
  },
}
