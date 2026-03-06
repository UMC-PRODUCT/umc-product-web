import { useFinalEvaluationFlow } from '@/features/school/hooks/evaluation/useFinalEvaluationFlow'
import * as Shared from '@/shared/styles/shared'
import { Flex } from '@/shared/ui/common/Flex'

import FilterBar from '../FilterBar/FilterBar'
import * as S from './FinalEvaluation.style'
import FinalEvaluationModals from './FinalEvaluationModals'
import FinalEvaluationTableSection from './FinalEvaluationTableSection'

const FinalEvaluation = ({ recruitmentId }: { recruitmentId: string }) => {
  const flow = useFinalEvaluationFlow(recruitmentId)

  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>최종 평가</Shared.TabTitle>
        <Shared.TabSubtitle>서류와 면접 점수를 종합하여 최종 평가를 진행합니다.</Shared.TabSubtitle>
      </Shared.TabHeader>

      <S.Container>
        <FilterBar
          leftChild={
            <Flex height={36} gap={8}>
              {flow.Dropdown}
              <S.SelectionInfo>
                {flow.isEmpty
                  ? '데이터가 없습니다.'
                  : `전체 ${flow.summary.totalCount}명 중 ${flow.summary.selectedCount}명 선발`}
              </S.SelectionInfo>
            </Flex>
          }
          rightChild={
            <>
              <S.SelectBox
                value={flow.selectedSortOption}
                options={flow.sortOptions}
                onChange={flow.handleSortChange}
              />
              <S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>
            </>
          }
        />

        <FinalEvaluationTableSection
          applicants={flow.applicants}
          activeRowId={flow.activeRowId}
          selectedIds={flow.selectedIds}
          selectedCount={flow.selectedCount}
          canEdit={flow.canEdit}
          isPassing={flow.isPassing}
          isInitialLoading={flow.isInitialLoading}
          isInitialError={flow.isInitialError}
          isEmpty={flow.isEmpty}
          errorStatus={flow.errorStatus}
          errorMessage={flow.errorMessage}
          alreadyPassedCount={flow.alreadyPassedCount}
          headerChecked={flow.headerChecked}
          onRetry={() => flow.refetch()}
          onSetActiveRow={flow.setActiveRowId}
          onToggleAll={flow.handleToggleAll}
          onToggleRow={flow.handleToggleRow}
          onOpenCancelStatus={flow.openCancelStatusModal}
          onPassApplicants={flow.handlePassApplicants}
          onFailApplicants={flow.handleFailApplicants}
          onClearSelection={() => flow.setSelectedIds(new Set())}
          onOpenInformModal={() => flow.setModalOpen({ open: true, modalName: 'inform' })}
        />
      </S.Container>

      <FinalEvaluationModals
        modalOpen={flow.modalOpen}
        partSelectApplicant={flow.partSelectApplicant}
        processedPassCount={flow.processedPassCount}
        activeApplicant={flow.activeApplicant}
        cancelStatus={flow.cancelStatus}
        selectedCount={flow.selectedCount}
        alreadyPassedCount={flow.alreadyPassedCount}
        selectedIds={flow.selectedIds}
        recruitmentId={recruitmentId}
        isPassing={flow.isPassing}
        onClose={() => flow.setModalOpen({ open: false, modalName: null })}
        onSetCancelStatus={flow.setCancelStatus}
        onConfirmPart={flow.handleConfirmPassWithSelectedPart}
        onConfirmSelectedPass={flow.handlePassApplicants}
      />
    </>
  )
}

export default FinalEvaluation
