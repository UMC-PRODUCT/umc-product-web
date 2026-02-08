import Search from '@shared/assets/icons/search.svg?react'

import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import { CandidateTable } from '../components/candidate/CandidateTable'
import { CANDIDATE } from '../mocks/candidates'

type CandidateFilterOptions = {
  branches: Array<Option<string>>
  schools: Array<Option<string>>
  parts: Array<Option<string>>
}

const defaultFilterOptions: CandidateFilterOptions = {
  branches: [
    { label: 'Ain 지부', id: 1 },
    { label: 'Scorpio 지부', id: 2 },
  ],
  schools: [
    { label: '상명대학교', id: 1 },
    { label: '중앙대학교', id: 2 },
  ],
  parts: [
    { label: 'Web', id: 1 },
    { label: 'Design', id: 2 },
  ],
}

type CandidatePageProps = {
  filterOptions?: CandidateFilterOptions
}
export const CandidatePage = ({ filterOptions = defaultFilterOptions }: CandidatePageProps) => {
  return (
    <PageLayout
      title="지원자 관리"
      subTitle="지부별, 학교별, 파트별 지원 현황을 조회할 수 있습니다."
    >
      <FilterBar
        gap={'25px'}
        leftChild={
          <>
            <Dropdown placeholder="전체 지부" options={filterOptions.branches} />
            <Dropdown placeholder="전체 학교" options={filterOptions.schools} />
            <Dropdown placeholder="전체 파트" options={filterOptions.parts} />
            <TextField
              placeholder="이름, 닉네임, 이메일로 검색"
              type="text"
              autoComplete="none"
              Icon={Search}
              IconPlaced="left"
              css={{ width: '280px', height: '52px' }}
            />
            <Button
              typo="B3.Sb"
              label="검색"
              tone="lime"
              css={{ minWidth: '80px', width: '80px', height: '52px' }}
            />
            <Button
              typo="B3.Sb"
              label="초기화"
              variant="outline"
              tone="gray"
              css={{ minWidth: '80px', width: '80px', height: '40px' }}
            />
          </>
        }
      />
      <Flex gap={'4px'}>
        <span css={{ color: theme.colors.white, ...theme.typography.H4.Sb }}>전체 지원자</span>
        <span css={{ color: theme.colors.lime, ...theme.typography.H4.Sb }}>
          {CANDIDATE.length}명
        </span>
      </Flex>
      <CandidateTable
        items={CANDIDATE}
        totalPages={19}
        currentPage={1}
        onChangePage={(page) => {
          console.log(page)
        }}
      />
    </PageLayout>
  )
}
