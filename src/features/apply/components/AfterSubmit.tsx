import { useNavigate } from '@tanstack/react-router'

import * as S from '@/features/apply/components/shared'
import Submit from '@/shared/assets/icons/submit.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

export default function AfterSubmit() {
  const navigate = useNavigate()
  return (
    <S.AlreadySubmitLayout gap={'16px'} flexDirection="column">
      <Submit width={108} />
      <S.SubmitTitle>지원서 제출이 완료되었습니다.</S.SubmitTitle>
      <S.SubmitContent>지원 현황은 ‘대시보드’에서 확인할 수 있습니다.</S.SubmitContent>
      <Flex width={'150px'} css={{ marginTop: '32px' }}>
        <Button
          label="대시보드로 이동"
          tone="lime"
          onClick={() => navigate({ to: '/dashboard' })}
        />
      </Flex>
    </S.AlreadySubmitLayout>
  )
}
