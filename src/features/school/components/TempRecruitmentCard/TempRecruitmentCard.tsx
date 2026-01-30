import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import DeleteConfirm from '@/features/school/components/modals/DeleteConfirm/DeleteConfirm'
import * as S from '@/features/school/components/TempRecruitmentCard/TempRecruitmentCard.style'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import { recruiteKeys } from '../../domain/queryKey'
import { useRecruitingMutation } from '../../hooks/useRecruitingMutation'

const TempRecruitmentCard = ({
  title,
  tempSavedTime,
  editable,
  recruitmentId,
}: {
  title: string
  tempSavedTime: string
  editable?: boolean
  recruitmentId: string
}) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    name: title,
  })
  const { useDeleteRecruitment } = useRecruitingMutation()
  const { mutate: deleteRecruitmentMutate } = useDeleteRecruitment(recruitmentId)

  const handleDeleteRecruitment = () => {
    deleteRecruitmentMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: recruiteKeys.recruitments({ status: 'DRAFT' }).queryKey,
        })
      },
      onError: (error) => {
        console.error('Failed to delete recruitment:', error)
      },
    })
  }
  return (
    <Section
      variant="both"
      flexDirection="row"
      justifyContent="space-between"
      padding="18px 28px"
      minHeight={100}
      css={{ overflowX: 'auto' }}
    >
      <S.InfoWrapper>
        <S.Title>{title}</S.Title>
        <S.LeftInfo padding={0}>
          <Flex width={200} gap={4}>
            <span className="label">임시저장 시각:</span>
            <span className="dateInfo">{tempSavedTime}</span>
          </Flex>
        </S.LeftInfo>
      </S.InfoWrapper>
      {editable && (
        <Flex width={126} gap={12} height={28}>
          <Button
            label="수정"
            tone="caution"
            onClick={() => {
              navigate({
                to: '/school/recruiting/$recruitingId',
                params: { recruitingId: recruitmentId.toString() },
                search: { source: 'temp', step: 1 },
              })
            }}
          />
          <Button
            label="삭제"
            tone="necessary"
            onClick={() =>
              setIsModalOpen({
                open: true,
                name: title,
              })
            }
          />
        </Flex>
      )}
      {!editable && (
        <Button
          label="조회"
          tone="lime"
          onClick={() =>
            navigate({
              to: '/school/recruiting/$recruitingId',
              params: { recruitingId: recruitmentId.toString() },
              search: { source: 'temp', step: 1 },
            })
          }
          css={{ width: '65px', height: '28px' }}
        />
      )}
      {isModalOpen.open && (
        <DeleteConfirm
          onClose={() => setIsModalOpen({ ...isModalOpen, open: false })}
          name={isModalOpen.name}
          onClick={handleDeleteRecruitment}
        />
      )}
    </Section>
  )
}

export default TempRecruitmentCard
