import { useEffect, useMemo } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import { mapApiPartToPartType } from '@/features/school/utils/recruiting/items'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option, RecruitingForms, RecruitingPartApi } from '@/shared/types/form'
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
  page: number
  setPage: (nextPage: number) => void
  part: RecruitingPartApi | null
  setPart: (nextPart: RecruitingPartApi | null) => void
  partCompletion: Partial<Record<RecruitingPartApi, boolean>>
  setPartCompletion: (next: Partial<Record<RecruitingPartApi, boolean>>) => void
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
  const recruitmentParts = useWatch({
    control,
    name: 'recruitmentParts',
  })
  const items = useWatch({
    control,
    name: 'items',
  })
  const partOptions = useMemo<Array<Option<PartType>>>(
    () =>
      recruitmentParts.reduce<Array<Option<PartType>>>((acc, partValue) => {
        const label = mapApiPartToPartType(partValue)
        acc.push({ label, id: partValue })
        return acc
      }, []),
    [recruitmentParts],
  )
  const selectedPart =
    part && recruitmentParts.includes(part)
      ? part
      : recruitmentParts.length > 0
        ? recruitmentParts[0]
        : null
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

  const isPartItemsValid = (targetPart: RecruitingPartApi) => {
    const partItems = items.filter(
      (item) => item.target.kind === 'PART' && item.target.part === targetPart,
    )
    if (partItems.length === 0) return false
    return partItems.every((item) => {
      const questionText = item.question.questionText
      if (typeof questionText !== 'string' || questionText.trim().length === 0) return false
      if (item.question.type !== 'CHECKBOX' && item.question.type !== 'RADIO') return true
      const options = Array.isArray(item.question.options) ? item.question.options : []
      if (options.length === 0) return false
      const normalized = options
        .map((option) => option.content.trim())
        .filter((content) => content.length > 0)
      if (normalized.length !== options.length) return false
      const unique = new Set(normalized)
      return unique.size === normalized.length
    })
  }

  const handlePartStatusChange = (isComplete: boolean) => {
    if (!selectedPart) return
    if (isComplete && !isPartItemsValid(selectedPart)) return
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
        <Section
          variant="solid"
          justifyContent="space-between"
          alignItems="center"
          padding={'12px 26px'}
          css={{
            flexDirection: 'row',
            [media.down(theme.breakPoints.mobile)]: { flexDirection: 'column', gap: '12px' },
          }}
        >
          <Dropdown
            options={partOptions}
            placeholder="파트를 선택해 주세요."
            value={
              selectedPart
                ? {
                    label: mapApiPartToPartType(selectedPart),
                    id: selectedPart,
                  }
                : undefined
            }
            onChange={(option) => setPart(option.id as RecruitingPartApi)}
            css={{ width: 300, maxWidth: '100%' }}
            optionSuffix={(option) =>
              partCompletion[option.id as RecruitingPartApi] ? (
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
      {page === 1 || page === 2 ? (
        <QuestionList
          key={`common-${page}`}
          control={control}
          target={{ kind: 'COMMON_PAGE', pageNo: page }}
        />
      ) : page === 3 && selectedPart ? (
        <QuestionList
          key={`part-${selectedPart}`}
          control={control}
          target={{ kind: 'PART', part: selectedPart }}
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
