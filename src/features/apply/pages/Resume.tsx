import * as S from '@/features/apply/components/shared'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'

import FormQuestion from '../components/FormQuestion'
import { ScheduleSelector } from '../components/TimeTable'

export default function Resume() {
  const schoolName = '중앙대학교'
  const classNumber = '10기'

  const dates = ['1/4', '1/5', '1/6', '1/7']
  const disabled = {
    '1/4': ['16:00', '16:30', '17:00'], // 해당 시간 드래그 불가
    '1/8': ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30'],
  }
  return (
    <S.PageLayout>
      <Flex maxWidth={'956px'}>
        <PageTitle title={`UMC ${schoolName} ${classNumber} 지원서`} />
      </Flex>
      <S.BorderSection>
        {`지원자 안내 사항, 운영진 인사말 등\n지원자 안내 사항, 운영진 인사말 등 \n지원자 안내 사항, 운영진 인사말 등`}
      </S.BorderSection>
      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex width={'380px'} justifyContent="flex-end" alignItems="center" gap={'18px'}>
            <span>20xx년 x월 x일 xx:xx에 마지막으로 저장됨.</span>
            <Badge
              typo="C2.Md"
              tone="lime"
              variant="outline"
              onClick={() => {}}
              css={{ cursor: 'pointer' }}
            >
              저장하기
            </Badge>
          </Flex>
        </Flex>
      </S.BorderSection>
      <S.BorderSection>
        <FormQuestion
          necesssaruy={true}
          question="면접 가능한 시간을 선택해 주세요."
          questionNumber={1}
        >
          <ScheduleSelector
            dates={dates}
            startHour={16}
            endHour={22}
            disabledSlots={disabled}
            onChange={(data) => console.log('Selected Data:', data)}
          />
        </FormQuestion>
      </S.BorderSection>
    </S.PageLayout>
  )
}
