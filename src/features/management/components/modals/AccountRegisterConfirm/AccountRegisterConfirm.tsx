import { useNavigate } from '@tanstack/react-router'

import Check from '@shared/assets/icons/check.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

const AccountRegisterConfirm = ({ onClose, link }: { onClose: () => void; link: string }) => {
  const navigate = useNavigate()
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={onClose}
      title="생성 완료"
      content={`계정이 시스템에 정상적으로 등록되었습니다.
계정 정보는 ‘계정 수정 및 삭제’에서 확인할 수 있습니다.`}
      Icon={Check}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="138px"
        height="32px"
        css={{ marginTop: '50px' }}
      >
        <Button
          onClick={() => {
            onClose()
            navigate({ to: link })
          }}
          label="계정 정보 확인하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default AccountRegisterConfirm
