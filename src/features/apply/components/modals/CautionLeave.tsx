import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const CautionLeave = ({ onClose, onMove }: { onClose: () => void; onMove: () => void }) => {
  return (
    <AlertModalLayout
      mode="warning"
      onClose={onClose}
      title="주의"
      content={`이미 작성 중인 내용이 있습니다.
저장하지 않고 이동할 경우, 작성 중인 내용은 모두 사라집니다.`}
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
        <Button onClick={onMove} label="이동하기" tone="gray" typo="C3.Md" />
        <Button onClick={onClose} label="이어서 작성하기" tone="lime" typo="C3.Md" />
      </Flex>
    </AlertModalLayout>
  )
}

export default CautionLeave
