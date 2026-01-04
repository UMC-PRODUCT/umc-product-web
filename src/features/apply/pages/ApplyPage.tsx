import { useState } from 'react'

import * as S from '@/features/apply/components/shared'
import { PART_INFO } from '@/features/management/constants/partInfo'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'

import AfterSubmit from '../components/AfterSubmit'
import BeforeSubmit from '../components/BeforeSubmit'
import CautionConfirm from '../components/modals/CautionConfirm'

type ModalState = {
  isOpen: boolean
  link: string
}

export function ApplyPage() {
  const [alreadySubmitted, _setAlreadySubmitted] = useState(false) // TODO: 추후 API 연동 시 지원 여부에 따라 변경
  const schoolName = '중앙대학교'
  const classNumber = '10기'
  const recruitmentPeriod = '20xx년 x월 x일 ~ 20xx년 x월 x일'
  const activityPeriod = '20xx년 x월 ~ 20xx년 x월 (약 6개월)'
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    link: '',
  })

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }
  return (
    <S.PageLayout>
      <Flex flexDirection="column" gap="35px" maxWidth={'868px'}>
        <Flex flexDirection="column" gap="22px">
          <PageTitle title={`UMC ${schoolName} ${classNumber} 추가모집`} />
          <Flex gap={'9px'} flexDirection="column" alignItems="flex-start">
            <S.Info>모집 기간 | {recruitmentPeriod}</S.Info>
            <S.Info>활동 기간 | {activityPeriod}</S.Info>
          </Flex>
        </Flex>
        {alreadySubmitted ? <AfterSubmit /> : <BeforeSubmit data={PART_INFO} setModal={setModal} />}
      </Flex>
      {modal.isOpen && <CautionConfirm onClose={closeModal} link={modal.link} />}
    </S.PageLayout>
  )
}
