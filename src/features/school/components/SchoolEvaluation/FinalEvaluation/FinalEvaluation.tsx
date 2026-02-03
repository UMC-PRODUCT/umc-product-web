import { useState } from 'react'

import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import * as S from './FinalEvaluation.style'

const FinalEvaluation = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [sort, setSort] = useState<Option<string>>({
    label: '점수 높은 순',
    id: 1,
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
        <Shared.TabTitle>최종 선발</Shared.TabTitle>
        <Shared.TabSubtitle>서류와 면접 점수를 종합하여 최종 선발을 진행합니다.</Shared.TabSubtitle>
      </Shared.TabHeader>
      <S.Container>
        {/* 1. 상단 필터/컨트롤 바 */}
        <S.FilterBar variant="solid" padding={'12px 16px'}>
          <div className="left">
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
          </div>
          <div className="right">
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
          </div>
        </S.FilterBar>

        {/* 2. 메인 테이블 */}
        <S.TableContainer variant="solid" padding={'12px 16px'}>
          <S.Table>
            <S.TableRowHeader>
              <tr>
                <th>
                  <Checkbox
                    checked={headerChecked}
                    onCheckedChange={handleToggleAll}
                    css={{
                      backgroundColor: theme.colors.gray[600],
                      borderColor: theme.colors.gray[400],
                    }}
                  />
                </th>
                <th>번호</th>
                <th>닉네임/이름</th>
                <th>지원 파트</th>
                <th>서류 점수</th>
                <th>면접 점수</th>
                <th>최종 환산 점수</th>
                <th>선발 결과</th>
                <th>작업</th>
              </tr>
            </S.TableRowHeader>
            <tbody>
              {applicants.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Checkbox
                      checked={selectedIds.has(item.id)}
                      onCheckedChange={handleToggleRow(item.id)}
                      css={{ borderColor: theme.colors.gray[400] }}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>
                    <S.UserInfo>{item.name}</S.UserInfo>
                  </td>
                  <td>
                    <S.TagGroup>
                      {item.parts.map((p) => (
                        <Button
                          key={`${item.id}-${p}`}
                          variant="outline"
                          tone="gray"
                          label={p}
                          typo="B4.Md"
                          css={{
                            width: 'fit-content',
                            padding: '3.5px 9px',
                            height: '28px',
                            maxHeight: '28px',
                            color: `${theme.colors.gray[300]}`,
                          }}
                        />
                      ))}
                    </S.TagGroup>
                  </td>
                  <td>{item.docScore}</td>
                  <td>{item.interviewScore}</td>
                  <td className="highlight">{item.finalScore}</td>
                  <td css={{ color: `${theme.colors.gray[500]}` }}>
                    {item.result === 'N/A' ? (
                      item.result
                    ) : (
                      <Button
                        variant="outline"
                        tone="gray"
                        label={item.result}
                        typo="B4.Md"
                        css={{
                          width: '90px',
                          padding: '3.5px 9px',
                          height: '28px',
                          maxHeight: '28px',
                          color: `${theme.colors.gray[300]}`,
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {item.isPassed ? (
                      <S.ActionButton
                        variant="solid"
                        tone="necessary"
                        label="합격 취소"
                        typo="B4.Sb"
                      />
                    ) : (
                      <S.ActionButton variant="solid" tone="lime" label="합격 처리" typo="B4.Sb" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableContainer>

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
            />
          </div>
        </S.BottomBar>
      </S.Container>
    </>
  )
}

export default FinalEvaluation
