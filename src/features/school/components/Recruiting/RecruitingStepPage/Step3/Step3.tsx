import { useEffect, useMemo } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { PartSmallType } from '@/features/auth/domain/model'
import { mapApiPartToPartType } from '@/features/school/utils/recruiting/items'
import { isPartItemsValid } from '@/features/school/utils/recruiting/validatePartItems'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option, RecruitingForms, RecruitingPart } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'
import Section from '@/shared/ui/common/Section/Section'

import RecuritingPageNavigator from '../../RecruitingPageNavigator/RecruitingPageNavigator'
import * as S from '../common'
import Step3PartHeader from './Step3PartHeader'
import Step3QuestionList from './Step3QuestionList'

const PAGE_LIST = [1, 2, 3]

interface Step3Props {
  control: Control<RecruitingForms>
  page: number
  setPage: (nextPage: number) => void
  part: RecruitingPart | null
  setPart: (nextPart: RecruitingPart | null) => void
  partCompletion: Partial<Record<RecruitingPart, boolean>>
  setPartCompletion: (next: Partial<Record<RecruitingPart, boolean>>) => void
}

const Step3 = ({
  control,
  page,
  setPage,
  part,
  setPart,
  partCompletion,
  setPartCompletion,
}: Step3Props) => {
  const recruitmentParts = useWatch({ control, name: 'recruitmentParts' })
  const items = useWatch({ control, name: 'items' })
  const partOptions = useMemo<Array<Option<PartSmallType>>>(
    () =>
      recruitmentParts.reduce<Array<Option<PartSmallType>>>((acc, partValue) => {
        const label = mapApiPartToPartType(partValue)
        acc.push({ label, id: partValue })
        return acc
      }, []),
    [recruitmentParts],
  )
  // 현재 파트를 유지하되, 없으면 첫 번째 파트를 기본으로 선택한다.
  const getSelectedPart = () => {
    if (part && recruitmentParts.includes(part)) return part
    return recruitmentParts.length > 0 ? recruitmentParts[0] : null
  }
  const selectedPart = getSelectedPart()
  const isSelectedPartComplete = selectedPart ? Boolean(partCompletion[selectedPart]) : false

  useEffect(() => {
    if (page !== 3) return
    const firstPart = recruitmentParts.length > 0 ? recruitmentParts[0] : null
    if (!selectedPart && firstPart) {
      setPart(firstPart)
    }
    if (selectedPart && !recruitmentParts.includes(selectedPart)) {
      setPart(firstPart)
    }
  }, [page, recruitmentParts, selectedPart, setPart])

  // 완료 처리 전에 문항 유효성을 확인한다.
  const handlePartStatusChange = (isComplete: boolean) => {
    if (!selectedPart) return
    if (isComplete && !isPartItemsValid(items, selectedPart)) return
    setPartCompletion({
      ...partCompletion,
      [selectedPart]: isComplete,
    })
  }

  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={27} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>지원서 페이지 안내</S.Title>
          <S.SubTitle>지원서 페이지별 주제에 맞는 문항을 작성하세요.</S.SubTitle>
        </Flex>
        <Flex
          css={{
            gap: '28px',
            [media.down(theme.breakPoints.mobile)]: { gap: '10px', overflowX: 'auto' },
          }}
        >
          {PAGE_LIST.map((pageNumber) => (
            <RecuritingPageNavigator
              key={pageNumber}
              page={pageNumber}
              setPage={setPage}
              currentPage={page}
            />
          ))}
        </Flex>
      </Section>
      {page === 3 && (
        <Step3PartHeader
          partOptions={partOptions}
          selectedPart={selectedPart}
          isSelectedPartComplete={isSelectedPartComplete}
          partCompletion={partCompletion}
          onChangePart={setPart}
          onChangeStatus={handlePartStatusChange}
          labelResolver={mapApiPartToPartType}
        />
      )}
      <Step3QuestionList
        page={page}
        control={control}
        selectedPart={selectedPart}
        isSelectedPartComplete={isSelectedPartComplete}
      />
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={PAGE_LIST.length} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default Step3
