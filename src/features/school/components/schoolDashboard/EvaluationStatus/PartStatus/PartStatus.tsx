import { useCallback, useEffect, useRef, useState } from 'react'

import CardTitle from '@/features/school/components/common/CardTitle'
import type { PartStatus as PartStatusType } from '@/features/school/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { transformEvaluationStatusTypeKorean } from '@/shared/utils'
import { mappingEvaluationColor } from '@/shared/utils/mappingColor'

import * as S from './PartStatus.style'

const PartStatus = ({ evaluationStatus }: { evaluationStatus: Array<PartStatusType> }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [showBlur, setShowBlur] = useState(true)

  const updateBlur = useCallback((element?: HTMLDivElement | null) => {
    const el = element ?? ref.current
    if (!el) return
    const hasOverflow = el.scrollHeight > el.clientHeight + 1
    const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
    setShowBlur(hasOverflow && !atEnd)
  }, [])

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node
      if (node) {
        updateBlur(node)
      }
    },
    [updateBlur],
  )

  const handleScroll = useCallback(() => updateBlur(), [updateBlur])

  useEffect(() => {
    const handleResize = () => updateBlur()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateBlur])

  return (
    <Section
      variant="outline"
      padding={'17px 20px'}
      alignItems="flex-start"
      gap={16}
      css={{ position: 'relative' }}
    >
      <CardTitle title="파트별 진행현황" />
      <S.Container onScroll={handleScroll} ref={setContainerRef}>
        {showBlur ? <S.Blur /> : null}
        {evaluationStatus.map(({ part, documentStatus, interviewStatus }) => (
          <S.PartFlex
            key={part}
            document={mappingEvaluationColor(documentStatus)}
            interview={mappingEvaluationColor(interviewStatus)}
          >
            <span className="part">{PART_TYPE_TO_SMALL_PART[part]}</span>
            <Flex width={'fit-content'} gap={20}>
              <span className="document">
                서류 {transformEvaluationStatusTypeKorean(documentStatus)}
              </span>
              <span className="interview">
                면접 {transformEvaluationStatusTypeKorean(interviewStatus)}
              </span>
            </Flex>
          </S.PartFlex>
        ))}
      </S.Container>
    </Section>
  )
}

export default PartStatus
