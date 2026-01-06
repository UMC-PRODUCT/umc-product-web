import { useNavigate } from '@tanstack/react-router'

import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

import Caution from '@/shared/assets/icons/caution.svg?react'

export default function CautionConfirm({ onClose, link }: { onClose: () => void; link: string }) {
  const navigate = useNavigate()
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`이미 작성 중인 지원서가 존재합니다. 이어서 작성하시겠습니까?
        ‘새로 작성하기’를 선택하실 경우, 기존 지원서는 삭제됩니다.`}
      Icon={Caution}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="250px"
        height="32px"
        css={{ marginTop: '50px' }}
      >
        <Button
          onClick={() => {
            onClose()
            navigate({ to: '/apply/new', search: { page: 1 } })
          }}
          label="새로 작성하기"
          tone="gray"
          typo="C3.Md"
        />
        <Button
          onClick={() => {
            onClose()
            navigate({ to: link })
          }}
          label="이어서 작성하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}
