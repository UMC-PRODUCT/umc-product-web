import Notice from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const AccountSuspended = ({
  onClose,
  onSuspend,
  name,
}: {
  onClose: () => void
  onSuspend: () => void
  name: string
}) => {
  return (
    <AlertModalLayout
      mode={'error'}
      onClose={onClose}
      title="경고"
      content={`계정이 정지된 회원은 UMC 활동에 참여할 수 없습니다.
‘${name}’님의 계정을 정지시키시겠습니까?`}
      Icon={Notice}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="185px"
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
            onSuspend()
          }}
          label="계정정지"
          tone="necessary"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default AccountSuspended
