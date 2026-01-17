import { useCallback, useEffect, useRef, useState } from 'react'

import CardTitle from '@/features/school/components/common/CardTitle'
import { EVALUATION_PART_STATUS_MOCKS } from '@/features/school/mocks/apply'
import Section from '@/shared/ui/common/Section/Section'
import { mappingEvaluationColor } from '@/shared/utils/mappingColor'

import * as S from './PartStatus.style'

const PartStatus = () => {
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
        {EVALUATION_PART_STATUS_MOCKS.map(({ part, document, interview }) => (
          <S.PartGrid
            key={part}
            document={mappingEvaluationColor(document)}
            interview={mappingEvaluationColor(interview)}
          >
            <span className="part">{part}</span>
            <span className="document">{document}</span>
            <span className="interview">{interview}</span>
          </S.PartGrid>
        ))}
      </S.Container>
    </Section>
  )
}

export default PartStatus
