import { useState } from 'react'

import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import PassCancleCautionModal from '../../modals/PassCancleCautionModal/PassCancleCautionModal'
import PassInfoModal from '../../modals/PassInfoModal/PassInfoModal'
import { SetPassPartModal } from '../../modals/SetPassPartModal/SetPassPartModal'
import SetPassSuccessModal from '../../modals/SetPassSuccessModal/SetPassSuccessModal'
import FilterBar from '../FilterBar/FilterBar'
import * as S from './FinalEvaluation.style'
import * as RowS from './FinalEvaluationRow.style'

const FinalEvaluation = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [activeRowId, setActiveRowId] = useState<number | null>(null)
  const [sort, setSort] = useState<Option<string>>({
    label: '점수 높은 순',
    id: 1,
  })

  const [modalOpen, setModalOpen] = useState<{
    open: boolean
    modalName: 'setPassPart' | 'setPassSuccess' | 'setFail' | 'inform' | null
  }>({
    open: false,
    modalName: null,
  })
  const handleSortChange = (option: Option<unknown>) => {
    setSort(option as Option<string>)
  }

  // 임시 데이터
  const applicants = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: '닉네임/성이름',
    parts: ['SpringBoot', 'Node.js'],
    docScore: '92.0',
    interviewScore: '94.0',
    finalScore: '93.0',
    result: i === 0 ? 'SpringBoot' : 'N/A',
    isPassed: i === 0,
  }))
  const selectedCount = selectedIds.size
  const allSelected = applicants.length > 0 && selectedCount === applicants.length
  const headerChecked = allSelected ? true : selectedCount > 0 ? 'indeterminate' : false

  const handleToggleAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedIds(new Set(applicants.map((item) => item.id)))
      return
    }
    setSelectedIds(new Set())
  }

  const handleToggleRow = (id: number) => (checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked === true) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }
  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>최종 평가</Shared.TabTitle>
        <Shared.TabSubtitle>서류와 면접 점수를 종합하여 최종 평가를 진행합니다.</Shared.TabSubtitle>
      </Shared.TabHeader>
      <S.Container>
        {/* 1. 상단 필터/컨트롤 바 */}
        <FilterBar
          leftChild={
            <>
              <Dropdown
                options={[
                  {
                    label: '전체 파트',
                    id: 0,
                  },
                  { label: 'SpringBoot', id: 1 },
                  { label: 'Node.js', id: 2 },
                ]}
                placeholder="전체 파트"
                css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
              />
              <S.SelectionInfo onClick={() => {}}>전체 92명 중 1명 선발</S.SelectionInfo>
            </>
          }
          rightChild={
            <>
              <S.SelectBox
                value={sort}
                options={[
                  {
                    label: '점수 높은 순',
                    id: 1,
                  },
                  {
                    label: '점수 낮은 순',
                    id: 2,
                  },
                  { label: '평가 완료 시각 순', id: 3 },
                ]}
                onChange={handleSortChange}
              />
              <S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>
            </>
          }
        />

        {/* 2. 테이블 */}
        <Section variant="solid" maxHeight={504} gap={0} padding="12px 16px">
          <Table
            headerLabels={[
              '번호',
              '닉네임/이름',
              '지원 파트',
              '서류 점수',
              '면접 점수',
              '최종 환산 점수',
              '선발 결과',
              '작업',
            ]}
            checkbox={{
              isAllChecked: headerChecked,
              onToggleAll: handleToggleAll,
            }}
            showFooter={false}
            rows={applicants}
            getRowId={(row) => row.id}
            activeRowId={activeRowId}
            onRowClick={(id) => setActiveRowId(id)}
            renderRow={(item) => (
              <>
                <TableStyles.Td>
                  <Checkbox
                    checked={selectedIds.has(item.id)}
                    onCheckedChange={handleToggleRow(item.id)}
                    css={{ borderColor: RowS.colors.checkboxBorder }}
                  />
                </TableStyles.Td>
                <TableStyles.Td>{item.id}</TableStyles.Td>
                <TableStyles.Td>
                  <S.UserInfo>{item.name}</S.UserInfo>
                </TableStyles.Td>
                <TableStyles.Td>
                  <S.TagGroup>
                    {item.parts.map((p) => (
                      <Button
                        key={`${item.id}-${p}`}
                        variant="outline"
                        tone="gray"
                        label={p}
                        typo="B4.Md"
                        css={RowS.tagButtonStyle}
                      />
                    ))}
                  </S.TagGroup>
                </TableStyles.Td>
                <TableStyles.Td>{item.docScore}</TableStyles.Td>
                <TableStyles.Td>{item.interviewScore}</TableStyles.Td>
                <TableStyles.Td css={{ color: theme.colors.lime, ...theme.typography.B3.Sb }}>
                  {item.finalScore}
                </TableStyles.Td>
                <TableStyles.Td css={RowS.resultTextStyle}>
                  {item.result === 'N/A' ? (
                    item.result
                  ) : (
                    <Button
                      variant="outline"
                      tone="gray"
                      label={item.result}
                      typo="B4.Md"
                      css={RowS.resultButtonStyle}
                    />
                  )}
                </TableStyles.Td>
                <TableStyles.Td>
                  {item.isPassed ? (
                    <S.ActionButton
                      variant="solid"
                      tone="necessary"
                      label="합격 취소"
                      typo="B4.Sb"
                      onClick={() => setModalOpen({ open: true, modalName: 'setFail' })}
                    />
                  ) : (
                    <S.ActionButton
                      variant="solid"
                      tone="lime"
                      label="합격 처리"
                      typo="B4.Sb"
                      onClick={() =>
                        item.parts.length > 1
                          ? setModalOpen({ open: true, modalName: 'setPassPart' })
                          : setModalOpen({ open: true, modalName: 'setPassSuccess' })
                      }
                    />
                  )}
                </TableStyles.Td>
              </>
            )}
          />
        </Section>
        {/* 3. 하단 선택 관리 바 */}
        <S.BottomBar variant="solid" padding="14px 18px">
          <div className="left">
            선택된 지원자 <S.CountBadge>{selectedCount}명</S.CountBadge>
          </div>
          <div className="right" css={{ gap: '14px', display: 'flex' }}>
            <Button
              label="선택 해제"
              tone={selectedCount > 0 ? 'gray' : 'darkGray'}
              variant="solid"
              typo="B4.Sb"
              css={{ width: '80px', height: '30px' }}
              onClick={() => setSelectedIds(new Set())}
            />
            <Button
              label={`선택된 ${selectedCount}명 합격 처리`}
              tone={selectedCount > 0 ? 'lime' : 'darkGray'}
              variant="solid"
              typo="B4.Sb"
              css={{ width: '144px', height: '30px' }}
              onClick={() => selectedCount > 0 && setModalOpen({ open: true, modalName: 'inform' })}
            />
          </div>
        </S.BottomBar>
      </S.Container>
      {modalOpen.open && modalOpen.modalName === 'setPassPart' && (
        <SetPassPartModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'setPassSuccess' && (
        <SetPassSuccessModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'setFail' && (
        <PassCancleCautionModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'inform' && (
        <PassInfoModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
    </>
  )
}

export default FinalEvaluation
