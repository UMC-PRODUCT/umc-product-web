import Warning from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const AccountActivate = ({
  onClose,
  onActivate,
  name,
}: {
  onClose: () => void
  onActivate: () => void
  name: string
}) => {
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`계정이 활성화된 회원은 UMC 활동에 참여할 수 있습니다.
‘${name}’님의 계정을 활성화하시겠습니까?`}
      Icon={Warning}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="194px"
        height="32px"
        css={{ marginTop: '50px' }}
      >
        <Button
          onClick={() => {
            onClose()
          }}
          label="취소하기"
          tone="gray"
          typo="C3.Md"
        />
        <Button
          onClick={() => {
            onClose()
            onActivate()
          }}
          label="활성화하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default AccountActivate
