import Check from '@/shared/assets/icons/check.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const AccountInviteConfirm = ({ onClose }: { onClose: () => void }) => {
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={onClose}
      title="발송 완료"
      content={`초대 메일이 정상적으로 발송되었습니다.
초대 메일을 통해 가입이 완료되면 계정이 활성화됩니다.`}
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
          }}
          label="확인"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default AccountInviteConfirm
