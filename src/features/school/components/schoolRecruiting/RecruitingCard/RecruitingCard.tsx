import { useState } from 'react'

import DeleteConfirm from '@/features/school/components/modals/DeleteConfirm'
import DeleteFail from '@/features/school/components/modals/DeleteFail'
import type { PartCompletion } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './RecruitingCard.style'

interface RecruitingCardProps {
  title: string
  startDate: string
  endDate: string
  applicants: number
  state: PartCompletion
}
const RecruitingCard = ({ title, startDate, endDate, applicants, state }: RecruitingCardProps) => {
  const badgeTone = state === '진행 중' ? 'lime' : state === '모집 종료' ? 'gray' : 'white'
  const [isModalOpen, setIsModalOpen] = useState({
    modalName: '',
    open: false,
    name: title,
  })

  return (
    <Section
      variant="solid"
      flexDirection="row"
      justifyContent="space-between"
      padding="18px 28px"
      minHeight={100}
      css={{ overflowX: 'auto' }}
    >
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.LeftInfo padding={0}>
          <Flex width={110} gap={4}>
            <span className="label">시작:</span>
            <span className="dateInfo">{startDate}</span>
          </Flex>
          <Flex width={110} gap={4}>
            <span className="label">종료:</span>
            <span className="dateInfo">{endDate}</span>
          </Flex>
          <Flex width={90} gap={4}>
            <span className="label">지원자: </span>
            <span className="recruiteNum">{applicants}</span>
            <span className="label">명</span>
          </Flex>
          <Badge className="state" variant="outline" typo="B5.Md" tone={badgeTone}>
            {state}
          </Badge>
        </S.LeftInfo>
      </S.InfoWrapper>
      <Flex width={126} gap={12} height={28}>
        <Button label="수정" tone="caution" />
        <Button
          label="삭제"
          tone="necessary"
          onClick={() =>
            setIsModalOpen({
              modalName: applicants > 0 ? 'deleteFail' : 'deleteConfirm',
              open: true,
              name: title,
            })
          }
        />
      </Flex>
      {isModalOpen.open && isModalOpen.modalName === 'deleteConfirm' ? (
        <DeleteConfirm
          onClose={() => setIsModalOpen({ ...isModalOpen, open: false })}
          name={isModalOpen.name}
          onClick={() => {}}
        />
      ) : isModalOpen.open && isModalOpen.modalName === 'deleteFail' ? (
        <DeleteFail
          onClose={() => setIsModalOpen({ ...isModalOpen, open: false })}
          name={isModalOpen.name}
        />
      ) : null}
    </Section>
  )
}

export default RecruitingCard
