import { useCallback, useMemo, useState } from 'react'
import * as S from '../School.style'
import type { Option } from '@/hooks/useSelectorInteractions'
import { AFFILIATED_MOCK, UNI_DELETE_MOCK } from '@/mocks/mocks'
import ManagementTable from '@/routes/(app)/management/-components/ManagementTable'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import Flex from '@/components/common/Flex/Flex'
import { TextField } from '@/components/common/LabelTextField/TextField'
import Search from '@/assets/icons/search.svg?react'
import useModalStore from '@/store/useModalStore'
import { DeleteSchoolTableHeaderLabel } from '@/constants/tableHeaders'
import Checkbox from '@/components/common/Checkbox/Checkbox'
import Badge from '@/components/common/Badge/Badge'
import Button from '@/components/common/Button/Button'

export default function DeleteSchool() {
  const [searchTerm, setSearchTerm] = useState('')
  const [affiliated, setAffiliated] = useState<Option | undefined>()
  const [affiliatedOpen, setAffiliatedOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const initialPage = useMemo(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page')
    const parsed = Number(pageParam)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  }, [])
  const [page, setPage] = useState(initialPage)
  const { openModal } = useModalStore()

  const findSchoolName = (targetId?: number) => {
    const selectedId =
      targetId ??
      (selectedIds.size ? Math.min(...Array.from(selectedIds)) : undefined)

    if (selectedId === undefined) return '학교 이름'

    const matched = UNI_DELETE_MOCK.find((school) => school.id === selectedId)
    return matched?.name ?? '학교 이름'
  }

  const openDeleteConfirm = useCallback(
    (targetId?: number) => {
      const count = targetId ? 1 : selectedIds.size
      if (count === 0) return

      openModal({
        modalType: 'DeleteConfirm',
        modalProps: {
          name: findSchoolName(targetId),
          type: 'school',
          count,
          onClick: () => {
            // TODO: 선택된 학교 삭제 API 연동
            console.log('delete target', targetId ?? Array.from(selectedIds))
          },
        },
      })
    },
    [findSchoolName, openModal, selectedIds],
  )

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(nextPage))
    window.history.replaceState(null, '', url.toString())
  }

  const Buttons = () => {
    return (
      <>
        <Button
          label="선택 취소"
          tone="gray"
          onClick={() => setSelectedIds(new Set())}
        />
        <Button
          label="선택한 학교 삭제"
          tone="necessary"
          onClick={() => openDeleteConfirm()}
        />
      </>
    )
  }

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 삭제</S.TabTitle>
        <S.TabSubtitle>
          삭제할 학교를 선택하세요. 삭제 시 복구가 불가능합니다.
        </S.TabSubtitle>
        <S.FilterWrapper>
          <Flex maxWidth="320px">
            <TextField
              type="text"
              autoComplete="off"
              placeholder="학교명으로 검색"
              Icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Flex>
          <Flex maxWidth="240px">
            <Dropdown
              options={AFFILIATED_MOCK}
              placeholder="전체 지부"
              value={affiliated}
              onClick={(option) => setAffiliated(option)}
              open={affiliatedOpen}
              setOpen={setAffiliatedOpen}
            />
          </Flex>
        </S.FilterWrapper>
        <ManagementTable
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          headerLabels={DeleteSchoolTableHeaderLabel}
          rows={UNI_DELETE_MOCK}
          type="school"
          currentPage={page}
          totalPages={5}
          onChangePage={handlePageChange}
          buttonChildren={<Buttons />}
        >
          {UNI_DELETE_MOCK.map((item) => (
            <tr key={item.id}>
              <S.Td>
                <Checkbox
                  toggleCheck={() => {
                    setSelectedIds((prev: Set<number>) => {
                      const next = new Set(prev)
                      if (next.has(item.id)) {
                        next.delete(item.id)
                      } else {
                        next.add(item.id)
                      }
                      return next
                    })
                  }}
                  value={selectedIds.has(item.id)}
                ></Checkbox>
              </S.Td>
              <S.Td>{item.name}</S.Td>
              <S.Td>{item.branch}</S.Td>
              <S.Td>{item.date}</S.Td>
              <S.Td>
                <Badge
                  content={item.status}
                  tone={item.status === '활성' ? 'lime' : 'gray'}
                  variant="outline"
                  typo="B4.Md"
                />
              </S.Td>
              <S.Td>
                <Button
                  key={item.id}
                  label={'삭제'}
                  tone={'necessary'}
                  onClick={() => openDeleteConfirm(item.id)}
                  typo="C2.Md"
                />
              </S.Td>
            </tr>
          ))}
        </ManagementTable>
      </S.TabHeader>
    </>
  )
}
