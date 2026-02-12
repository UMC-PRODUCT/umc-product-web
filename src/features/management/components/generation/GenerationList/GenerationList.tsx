import { useState } from 'react'

import Notice from '@shared/assets/icons/notice.svg?react'

import { useGetGisuList } from '@/features/management/hooks/useManagementQueries'
import { theme } from '@/shared/styles/theme'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'
import Section from '@/shared/ui/common/Section/Section'
import SectionTitle from '@/shared/ui/common/SectionTitles/SectionTitle'

import GenerationCard from '../GenerationCard/GenerationCard'

const GenerationList = () => {
  const [page, setPage] = useState(0)
  const { data } = useGetGisuList({ page: String(page), size: '20' })
  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <Flex flexDirection="column" gap={2} alignItems="flex-start">
        <SectionTitle title="기수 목록 및 삭제" />
        <Flex gap={6}>
          <Notice color={theme.colors.necessary} width={18} />
          <ErrorMessage errorMessage="삭제된 기수는 복구할 수 없습니다." typo="C2.Sb" />
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={10}>
        <Section
          variant="solid"
          padding="10px 70px"
          justifyContent="space-between"
          flexDirection="row"
          css={{ color: theme.colors.gray[400], ...theme.typography.C2.Sb }}
        >
          <span>기수</span>
          <span css={{ width: '90px' }}>삭제</span>
        </Section>
        {data?.result.content.map((generation) => (
          <GenerationCard
            key={generation.gisuId}
            gisuId={generation.gisuId}
            gisuName={generation.generation}
          />
        ))}
      </Flex>
      <span css={{ color: theme.colors.gray[300], ...theme.typography.C4.Rg }}>
        총 {data?.result.totalElements ?? 0}개의 기수
      </span>
      <div css={{ alignSelf: 'center' }}>
        <Navigation
          currentPage={page + 1}
          totalPages={Number(data?.result.totalPages)}
          onChangePage={setPage}
        />
      </div>
    </Flex>
  )
}
export default GenerationList
