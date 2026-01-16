import { useEffect, useMemo, useRef } from 'react'
import type { Control, UseFormTrigger } from 'react-hook-form'
import { useFormState, useWatch } from 'react-hook-form'

import { getPartKey } from '@/features/school/utils/partQuestionBank'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import { theme } from '@/shared/styles/theme'
import type { Option, RecruitingForms } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'
import { Badge } from '@/shared/ui/common/Badge'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'
import Section from '@/shared/ui/common/Section/Section'

import QuestionList from '../QuestionList/QuestionList'
import RecuritingPageNavigator from '../RecruitingPageNavigator/RecruitingPageNavigator'
import * as S from './common'

const PAGE_LIST = [1, 2, 3]

interface Step3Props {
  control: Control<RecruitingForms>
  trigger: UseFormTrigger<RecruitingForms>
  page: number
  setPage: (nextPage: number) => void
  part: PartType | null
  setPart: (nextPart: PartType | null) => void
  partCompletion: Partial<Record<PartType, boolean>>
  setPartCompletion: (next: Partial<Record<PartType, boolean>>) => void
}

const Step3 = ({
  control,
  trigger,
  page,
  setPage,
  part,
  setPart,
  partCompletion,
  setPartCompletion,
}: Step3Props) => {
  const nextIdRef = useRef(1)
  const recruitingPart = useWatch({
    control,
    name: 'recruitingPart',
  })
  const pages = useWatch({
    control,
    name: 'pages',
  })
  const partQuestionBank = useWatch({
    control,
    name: 'partQuestionBank',
  })
  const { touchedFields } = useFormState({ control })
  const partOptions = useMemo<Array<Option<PartType>>>(
    () =>
      recruitingPart.map((partValue) => ({
        label: partValue,
        id: partValue,
      })),
    [recruitingPart],
  )
  const selectedPart =
    part && recruitingPart.includes(part)
      ? part
      : recruitingPart.length > 0
        ? recruitingPart[0]
        : null
  const currentFormPageIndex = useMemo(() => {
    if (page === 1 || page === 2) {
      return pages.findIndex((pageEntry) => pageEntry.page === page)
    }
    return -1
  }, [page, pages])
  const isSelectedPartComplete = selectedPart ? Boolean(partCompletion[selectedPart]) : false

  useEffect(() => {
    if (page !== 3) return
    const firstPart = recruitingPart.length > 0 ? recruitingPart[0] : null
    if (!selectedPart && firstPart) {
      setPart(firstPart)
    }
    if (selectedPart && !recruitingPart.includes(selectedPart)) {
      setPart(firstPart)
    }
  }, [page, recruitingPart, selectedPart, setPart])

  const getNextQuestionId = () => {
    const current = nextIdRef.current
    nextIdRef.current = current + 1
    return current
  }

  const maxQuestionId = useMemo(() => {
    const pageIds = pages.flatMap((pageEntry) =>
      pageEntry.questions.map((question) => question.questionId),
    )
    const partIds = Object.values(partQuestionBank).flatMap((questions) =>
      Array.isArray(questions) ? questions.map((question) => question.questionId) : [],
    )
    return Math.max(0, ...pageIds, ...partIds)
  }, [pages, partQuestionBank])

  useEffect(() => {
    if (maxQuestionId >= nextIdRef.current) {
      nextIdRef.current = maxQuestionId + 1
    }
  }, [maxQuestionId])

  const touchedPages = (
    touchedFields as unknown as {
      pages?: Array<{ questions?: unknown }>
    }
  ).pages
  const touchedPagesLength = touchedPages ? touchedPages.length : 0
  const currentTouchedPage =
    touchedPages && currentFormPageIndex >= 0 ? touchedPages[currentFormPageIndex] : undefined
  const hasTouchedPageQuestions =
    currentFormPageIndex >= 0 &&
    currentFormPageIndex < touchedPagesLength &&
    Boolean(currentTouchedPage && currentTouchedPage.questions)
  const touchedPartBank = (
    touchedFields as unknown as {
      partQuestionBank?: Record<string, unknown>
    }
  ).partQuestionBank
  const hasTouchedPartQuestions =
    selectedPart && Boolean(touchedPartBank && touchedPartBank[getPartKey(selectedPart)])

  const handlePartStatusChange = (isComplete: boolean) => {
    if (!selectedPart) return
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
        <Flex gap={28}>
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
        <Section
          variant="solid"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={'12px 26px'}
        >
          <Dropdown
            options={partOptions}
            placeholder="파트를 선택해 주세요."
            value={
              selectedPart
                ? {
                    label: selectedPart,
                    id: selectedPart,
                  }
                : undefined
            }
            onChange={(option) => setPart(option.label)}
            css={{ width: 300 }}
            optionSuffix={(option) =>
              partCompletion[option.label] ? (
                <span
                  css={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: theme.colors.lime,
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon width={10} height={10} color={theme.colors.black} />
                </span>
              ) : null
            }
          />

          <Flex gap={14} width={'fit-content'} alignItems="center">
            <Badge
              typo="B4.Sb"
              tone={'gray'}
              variant={isSelectedPartComplete ? 'outline' : 'solid'}
              css={{ padding: '4px 14px', cursor: selectedPart ? 'pointer' : 'default' }}
              onClick={() => handlePartStatusChange(false)}
            >
              작성 중
            </Badge>
            <Badge
              typo="B4.Sb"
              tone={'gray'}
              variant={isSelectedPartComplete ? 'solid' : 'outline'}
              css={{ padding: '4px 14px', cursor: selectedPart ? 'pointer' : 'default' }}
              onClick={() => handlePartStatusChange(true)}
            >
              작성 완료
            </Badge>
          </Flex>
        </Section>
      )}
      {currentFormPageIndex >= 0 ? (
        <QuestionList
          key={currentFormPageIndex}
          control={control}
          fieldArrayName={`pages.${currentFormPageIndex}.questions`}
          namePrefixBase={`pages.${currentFormPageIndex}.questions`}
          getNextQuestionId={getNextQuestionId}
          trigger={trigger}
          hasTouched={hasTouchedPageQuestions}
        />
      ) : page === 3 && selectedPart ? (
        <QuestionList
          key={selectedPart}
          control={control}
          fieldArrayName={`partQuestionBank.${getPartKey(selectedPart)}`}
          namePrefixBase={`partQuestionBank.${getPartKey(selectedPart)}`}
          getNextQuestionId={getNextQuestionId}
          trigger={trigger}
          hasTouched={Boolean(hasTouchedPartQuestions)}
          isLocked={isSelectedPartComplete}
        />
      ) : (
        <Flex flexDirection="column" alignItems="center" padding={'30px'}>
          <S.SubTitle>모집할 파트를 먼저 선택해 주세요.</S.SubTitle>
        </Flex>
      )}
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={PAGE_LIST.length} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default Step3
