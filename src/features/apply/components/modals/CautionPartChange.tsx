import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const CautionPartChange = ({
  onClose,
  onConfirm,
  ranksText,
}: {
  onClose: () => void
  onConfirm: () => void
  ranksText: string
}) => {
  const content = `${ranksText} 파트별 문항에 답변을 작성한 기록이 존재합니다.\n${ranksText} 파트를 변경할 경우, 해당 작성 내역이 초기화됩니다.`
  return (
    <AlertModalLayout
      mode="warning"
      onClose={onClose}
      title="주의"
      content={content}
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
        <Button onClick={onClose} label="취소하기" tone="gray" typo="C3.Md" />
        <Button onClick={onConfirm} label="변경하기" tone="lime" typo="C3.Md" />
      </Flex>
    </AlertModalLayout>
  )
}

export default CautionPartChange
