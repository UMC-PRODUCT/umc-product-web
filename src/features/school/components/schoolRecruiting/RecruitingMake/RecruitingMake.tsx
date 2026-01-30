import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import Create from '@/shared/assets/icons/create.svg?react'
import Load from '@/shared/assets/icons/load.svg?react'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import TempRecruitmentModal from '../../modals/TempRecruitmentModal/TempRecruitmentModal'
import * as S from './RecruitingMake.style'

const RecruitingMake = () => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { usePostFirstRecruitment } = useRecruitingMutation()
  const { mutate: postFirstRecruitmentMutate } = usePostFirstRecruitment()

  const handleCreateRecruiting = () => {
    postFirstRecruitmentMutate(undefined, {
      onSuccess: (data) => {
        const recruitingId = data.result.recruitmentId
        navigate({
          to: '/school/recruiting/$recruitingId',
          params: { recruitingId: String(recruitingId) },
          search: {
            source: 'temp',
            step: 1,
          },
        })
      },
    })
  }

  const handleLoadRecruiting = () => {
    setOpenModal(true)
  }
  return (
    <Flex gap={20} flexDirection="column">
      <PageTitle title="모집 작성" />
      <Section variant="outline" padding={16}>
        <S.Grid>
          <S.Card
            variant="solid"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={14}
            onClick={handleCreateRecruiting}
          >
            <Create />
            <Flex alignItems="flex-start" flexDirection="column" width={'fit-content'}>
              <span className="title">새로운 모집 생성하기</span>
              <span className="description">처음부터 새로 작성</span>
            </Flex>
          </S.Card>
          <S.Card
            variant="solid"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={14}
            onClick={handleLoadRecruiting}
          >
            <Load />
            <Flex alignItems="flex-start" flexDirection="column" width={'fit-content'}>
              <span className="title">임시저장 모집 불러오기</span>
              <span className="description">작성 중인 모집 이어서 작성</span>
            </Flex>
          </S.Card>
        </S.Grid>
      </Section>
      {openModal && <TempRecruitmentModal onClose={() => setOpenModal(false)} />}
    </Flex>
  )
}
export default RecruitingMake
