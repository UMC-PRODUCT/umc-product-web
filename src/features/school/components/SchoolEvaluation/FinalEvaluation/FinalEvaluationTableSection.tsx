import type { FinalSelectionApplication } from '@/features/school/domain/model'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import ServerErrorCard from '../../common/ServerErrorCard'
import * as S from './FinalEvaluation.style'
import * as RowS from './FinalEvaluationRow.style'

type Props = {
  applicants: Array<FinalSelectionApplication>
  activeRowId: string | null
  selectedIds: Set<string>
  selectedCount: number
  canEdit: boolean
  isPassing: boolean
  isInitialLoading: boolean
  isInitialError: boolean
  isEmpty: boolean
  errorStatus?: number
  errorMessage: string
  alreadyPassedCount: number
  headerChecked: boolean | 'indeterminate'
  onRetry: () => void
  onSetActiveRow: (id: string) => void
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: string) => (checked: boolean | 'indeterminate') => void
  onOpenCancelStatus: (applicationId: string, status: 'PASS' | 'FAIL') => void
  onPassApplicants: (applicationIds: Array<string>, openSuccessModal?: boolean) => Promise<void>
  onFailApplicants: (applicationIds: Array<string>) => Promise<void>
  onClearSelection: () => void
  onOpenInformModal: () => void
}

const loadingFallback = (
  <Section variant="solid" maxHeight={504} gap={0} padding="12px 16px">
    <SuspenseFallback label="최종 선발 대상자를 불러오는 중입니다." />
  </Section>
)

const FinalEvaluationTableSection = ({
  applicants,
  activeRowId,
  selectedIds,
  selectedCount,
  canEdit,
  isPassing,
  isInitialLoading,
  isInitialError,
  isEmpty,
  errorStatus,
  errorMessage,
  alreadyPassedCount,
  headerChecked,
  onRetry,
  onSetActiveRow,
  onToggleAll,
  onToggleRow,
  onOpenCancelStatus,
  onPassApplicants,
  onFailApplicants,
  onClearSelection,
  onOpenInformModal,
}: Props) => {
  return (
    <S.Container>
      <AsyncBoundary fallback={loadingFallback}>
        {isInitialLoading ? (
          loadingFallback
        ) : isInitialError ? (
          <ServerErrorCard
            errorStatus={errorStatus}
            errorMessage={errorMessage}
            onRetry={onRetry}
          />
        ) : isEmpty ? (
          <ServerErrorCard
            errorMessage="최종 선발 대상자가 없습니다."
            message="선발 대상 없음"
            description="조건에 맞는 최종 선발 대상자가 없습니다."
          />
        ) : (
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
                onToggleAll,
              }}
              showFooter={false}
              rows={applicants}
              getRowId={(row) => row.applicationId}
              activeRowId={activeRowId}
              onRowClick={onSetActiveRow}
              renderRow={(item) => (
                <>
                  <TableStyles.Td>
                    <Checkbox
                      checked={selectedIds.has(item.applicationId)}
                      onCheckedChange={onToggleRow(item.applicationId)}
                      css={{ borderColor: RowS.colors.checkboxBorder }}
                    />
                  </TableStyles.Td>
                  <TableStyles.Td>{item.applicationId}</TableStyles.Td>
                  <TableStyles.Td>
                    <S.UserInfo>{`${item.applicant.nickname}/${item.applicant.name}`}</S.UserInfo>
                  </TableStyles.Td>
                  <TableStyles.Td>
                    <S.TagGroup>
                      {item.appliedParts.map((p) => (
                        <Button
                          key={`${item.applicationId}-${p.part.key}`}
                          variant="outline"
                          tone="gray"
                          label={p.part.label}
                          typo="B4.Md"
                          css={RowS.tagButtonStyle}
                        />
                      ))}
                    </S.TagGroup>
                  </TableStyles.Td>
                  <TableStyles.Td>{item.documentScore}</TableStyles.Td>
                  <TableStyles.Td>{item.interviewScore}</TableStyles.Td>
                  <TableStyles.Td css={{ color: theme.colors.lime, ...theme.typography.B3.Sb }}>
                    {item.finalScore}
                  </TableStyles.Td>
                  <TableStyles.Td css={RowS.resultTextStyle}>
                    {item.selection.status === 'WAIT' || !item.selection.selectedPart ? (
                      'N/A'
                    ) : (
                      <Button
                        variant="outline"
                        tone="gray"
                        label={item.selection.selectedPart.label}
                        typo="B4.Md"
                        css={RowS.resultButtonStyle}
                      />
                    )}
                  </TableStyles.Td>
                  <TableStyles.Td>
                    <Flex gap={8}>
                      <S.ActionButton
                        variant="outline"
                        tone={item.selection.status === 'PASS' ? 'lime' : 'gray'}
                        label="합격"
                        typo="B4.Sb"
                        disabled={!canEdit || isPassing}
                        onClick={() => {
                          if (item.selection.status === 'PASS') {
                            onOpenCancelStatus(item.applicationId, 'PASS')
                            return
                          }
                          void onPassApplicants([item.applicationId])
                        }}
                      />
                      <S.ActionButton
                        variant="outline"
                        tone={item.selection.status === 'FAIL' ? 'necessary' : 'gray'}
                        label="불합격"
                        typo="B4.Sb"
                        disabled={!canEdit || isPassing}
                        onClick={() => {
                          if (item.selection.status === 'FAIL') {
                            onOpenCancelStatus(item.applicationId, 'FAIL')
                            return
                          }
                          void onFailApplicants([item.applicationId])
                        }}
                      />
                    </Flex>
                  </TableStyles.Td>
                </>
              )}
            />
          </Section>
        )}
      </AsyncBoundary>

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
            disabled={!canEdit}
            onClick={onClearSelection}
          />
          <Button
            label={`선택된 ${selectedCount}명 합격 처리`}
            tone={selectedCount > 0 ? 'lime' : 'darkGray'}
            variant="solid"
            typo="B4.Sb"
            css={{ width: '144px', height: '30px' }}
            disabled={!canEdit || isPassing}
            onClick={() => {
              if (selectedCount === 0) return
              const ids = [...selectedIds]
              if (alreadyPassedCount > 0) {
                onOpenInformModal()
                return
              }
              void onPassApplicants(ids)
            }}
          />
        </div>
      </S.BottomBar>
    </S.Container>
  )
}

export default FinalEvaluationTableSection
