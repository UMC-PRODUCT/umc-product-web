import { useState } from 'react'

import { useGetRecruitmentsList } from '@/features/school/hooks/useGetRecruitingData'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import EmptyRecruiting from '../EmptyRecruiting/EmptyRecruiting'
import RecruitingCard from '../RecruitingCard/RecruitingCard'
import * as S from './RecruitingList.style'

const RecruitingList = () => {
  const [tab, setTab] = useState<'ONGOING' | 'CLOSED' | 'SCHEDULED'>('ONGOING')
  const { data } = useGetRecruitmentsList(tab)
  const recruitments = data?.result.recruitments ?? []
  return (
    <Flex gap={20} flexDirection="column">
      <PageTitle title="모집 목록" />
      <Section variant="outline" gap={24}>
        <S.Header>
          <S.Tab isActive={tab === 'ONGOING'} onClick={() => setTab('ONGOING')}>
            진행 중인 모집
          </S.Tab>
          <S.Tab isActive={tab === 'CLOSED'} onClick={() => setTab('CLOSED')}>
            종료된 모집
          </S.Tab>
          <S.Tab isActive={tab === 'SCHEDULED'} onClick={() => setTab('SCHEDULED')}>
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
          {recruitments.length > 0 ? (
            recruitments.map((recruitment) => (
              <RecruitingCard
                recruitmentId={recruitment.recruitmentId}
                key={recruitment.recruitmentId}
                title={recruitment.recruitmentName}
                startDate={recruitment.startDate}
                endDate={recruitment.endDate}
                applicants={recruitment.applicantCount}
                state={recruitment.phase}
                editable={recruitment.editable}
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
