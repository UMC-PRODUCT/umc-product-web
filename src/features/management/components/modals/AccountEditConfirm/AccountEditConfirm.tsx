import Check from '@/shared/assets/icons/check.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const AccountEditConfirm = ({ onClose }: { onClose: () => void }) => {
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={() => {
        window.location.reload()
        onClose()
      }}
      title="수정 완료"
      content={`수정된 정보가 시스템에 정상적으로 반영되었습니다.
수정 사항은 즉시 적용됩니다.`}
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
            window.location.reload()
          }}
          label="확인"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default AccountEditConfirm
