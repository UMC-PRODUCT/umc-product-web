import { useState } from 'react'

import { RECRUITING_LIST_MOCKS } from '@/features/school/mocks/apply'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import EmptyRecruiting from '../EmptyRecruiting/EmptyRecruiting'
import RecruitingCard from '../RecruitingCard/RecruitingCard'
import * as S from './RecruitingList.style'

const RecruitingList = () => {
  const [tab, setTab] = useState<'진행 중' | '종료된 모집' | '예정된 모집'>('진행 중')
  return (
    <Flex gap={20} flexDirection="column">
      <PageTitle title="모집 목록" />
      <Section variant="outline" gap={24}>
        <S.Header>
          <S.Tab isActive={tab === '진행 중'} onClick={() => setTab('진행 중')}>
            진행 중인 모집
          </S.Tab>
          <S.Tab isActive={tab === '종료된 모집'} onClick={() => setTab('종료된 모집')}>
            종료된 모집
          </S.Tab>
          <S.Tab isActive={tab === '예정된 모집'} onClick={() => setTab('예정된 모집')}>
            예정된 모집
          </S.Tab>
        </S.Header>
        <Flex
          flexDirection="column"
          gap={12}
          maxHeight={530}
          height={'fit-content'}
          minHeight={400}
          css={{ overflowY: 'auto' }}
        >
          {RECRUITING_LIST_MOCKS.length > 0 ? (
            RECRUITING_LIST_MOCKS.map((recruiting) => (
              <RecruitingCard
                key={recruiting.id}
                title={recruiting.title}
                startDate={recruiting.startDate}
                endDate={recruiting.endDate}
                applicants={recruiting.applicants}
                state={recruiting.state}
              />
            ))
          ) : (
            <EmptyRecruiting tab={tab} />
          )}
        </Flex>
      </Section>
    </Flex>
  )
}
export default RecruitingList
