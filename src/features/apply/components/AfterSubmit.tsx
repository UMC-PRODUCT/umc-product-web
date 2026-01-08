import { useNavigate } from '@tanstack/react-router'

import * as S from '@/features/apply/components/ApplyPage.style'
import SubmitCompleteIcon from '@/shared/assets/icons/submit.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

const SUBMIT_ICON_SIZE = 108
const DASHBOARD_BUTTON_WIDTH = '150px'

const AfterSubmit = () => {
  const navigate = useNavigate()

  const handleNavigateToDashboard = () => {
    navigate({ to: '/dashboard' })
  }

  return (
    <S.SubmitCompleteContainer gap="16px" flexDirection="column">
      <SubmitCompleteIcon width={SUBMIT_ICON_SIZE} />
      <S.SubmitTitle>지원서 제출이 완료되었습니다.</S.SubmitTitle>
      <S.SubmitDescription>
        지원 현황은 &apos;대시보드&apos;에서 확인할 수 있습니다.
      </S.SubmitDescription>
      <Flex width={DASHBOARD_BUTTON_WIDTH} css={{ marginTop: '32px' }}>
        <Button label="대시보드로 이동" tone="lime" onClick={handleNavigateToDashboard} />
      </Flex>
    </S.SubmitCompleteContainer>
  )
}

export default AfterSubmit
