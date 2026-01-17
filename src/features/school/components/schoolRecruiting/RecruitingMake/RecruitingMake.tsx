import { useNavigate } from '@tanstack/react-router'

import Create from '@/shared/assets/icons/create.svg?react'
import Load from '@/shared/assets/icons/load.svg?react'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './RecruitingMake.style'

const RecruitingMake = () => {
  const navigate = useNavigate()
  const handleCreateRecruiting = () => {
    const recruitingId = 1 // TODO: 새로 생성된 모집 ID 추후 API 연동 필요
    navigate({
      to: '/school/recruiting/$recruitingId',
      params: { recruitingId: String(recruitingId) },
    })
  }

  const handleLoadRecruiting = () => {
    const recruitingId = 1 // TODO: 임시저장된 모집 ID 추후 API 연동 필요
    navigate({
      to: '/school/recruiting/$recruitingId',
      params: { recruitingId: String(recruitingId) },
      search: {
        source: 'temp',
      },
    })
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
    </Flex>
  )
}
export default RecruitingMake
