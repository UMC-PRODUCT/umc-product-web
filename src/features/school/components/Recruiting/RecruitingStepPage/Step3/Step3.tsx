import { useEffect, useMemo } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import type { PartSmallType, PartType } from '@/features/auth/domain/model'
import { useRecruitingContext } from '@/features/school/components/Recruiting/RecruitingPage/RecruitingContext'
import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { convertApplicationFormToItems } from '@/features/school/utils/recruiting/applicationFormMapper'
import { buildQuestionsPayload } from '@/features/school/utils/recruiting/recruitingPayload'
import { isPartItemsValid } from '@/features/school/utils/recruiting/validatePartItems'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option, RecruitingForms } from '@/shared/types/form'
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
  part: PartType | null
  setPart: (nextPart: PartType | null) => void
  partCompletion: Partial<Record<PartType, boolean>>
  setPartCompletion: (next: Partial<Record<PartType, boolean>>) => void
  canEditQuestions: boolean
}

const Step3 = ({
  control,
  page,
  setPage,
  part,
  setPart,
  partCompletion,
  setPartCompletion,
  canEditQuestions,
}: Step3Props) => {
  const router = useRouter()
  const recruitingMatch = router.state.matches.find(
    (m) => (m.params as Record<string, string>).recruitingId,
  )
  const recruitingId =
    (recruitingMatch?.params as Record<string, string> | undefined)?.recruitingId ?? ''
  const recruitmentParts = useWatch({ control, name: 'recruitmentParts' })
  const items = useWatch({ control, name: 'items' })
  const { recruitmentForm } = useRecruitingContext()
  const queryClient = useQueryClient()
  const { usePatchRecruitmentApplicationFormDraft } = useRecruitingMutation()
  const { mutate: patchTempSavedRecruitQuestionsMutate } =
    usePatchRecruitmentApplicationFormDraft(recruitingId)
  const applicationQueryKey = schoolKeys.getRecruitmentApplicationFormDraft(recruitingId)
  const partOptions = useMemo<Array<Option<PartSmallType>>>(
    () =>
      recruitmentParts.reduce<Array<Option<PartSmallType>>>((acc, partValue) => {
        const label = PART_TYPE_TO_SMALL_PART[partValue]
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

    if (!isComplete) {
      setPartCompletion({ ...partCompletion, [selectedPart]: false })
      return
    }

    if (!isPartItemsValid(items, selectedPart)) {
      // 유효성 검증 실패 시에는 '작성 완료'로 넘어가지 않고 '작성 중' 상태를 유지한다.
      setPartCompletion({ ...partCompletion, [selectedPart]: false })
      return
    }

    setPartCompletion({
      ...partCompletion,
      [selectedPart]: true,
    })
    if (!recruitingId) return
    patchTempSavedRecruitQuestionsMutate(
      { items: buildQuestionsPayload(items) },
      {
        onSuccess: (data) => {
          recruitmentForm.setValue('items', convertApplicationFormToItems(data.result), {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: true,
          })
          queryClient.invalidateQueries({ queryKey: applicationQueryKey })
        },
      },
    )
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
          disablePartSelect={false}
          disableStatusToggle={!canEditQuestions}
        />
      )}
      <Step3QuestionList
        page={page}
        control={control}
        selectedPart={selectedPart}
        isSelectedPartComplete={isSelectedPartComplete}
        isLocked={!canEditQuestions}
      />
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={PAGE_LIST.length} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default Step3
