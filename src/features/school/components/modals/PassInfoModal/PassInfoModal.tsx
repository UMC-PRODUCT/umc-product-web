import Inform from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const PassInfoModal = ({
  onClose,
  onConfirm,
  selectedCount,
  alreadyPassedCount,
}: {
  onClose: () => void
  onConfirm: () => void
  selectedCount: number
  alreadyPassedCount: number
}) => {
  const remainingCount = Math.max(selectedCount - alreadyPassedCount, 0)
  const content =
    alreadyPassedCount > 0
      ? `선택된 지원자 ${selectedCount}명 중 ${alreadyPassedCount}명은 이미 합격 처리되어 있습니다.\n합격자 ${alreadyPassedCount}명을 제외한 나머지 ${remainingCount}명을 합격 처리 하시겠습니까?`
      : `선택된 지원자 ${selectedCount}명을 합격 처리 하시겠습니까?`
  return (
    <AlertModalLayout
      Icon={Inform}
      mode={'disabled'}
      onClose={onClose}
      title="안내"
      content={content}
    >
      <Flex
        height="32px"
        gap="16px"
        maxWidth="182px"
        justifyContent="flex-end"
        css={{
          marginTop: '40px',
        }}
      >
        <Button type="button" label={'닫기'} tone="gray" onClick={onClose} typo="C3.Md" />
        <Button
          type="button"
          label={'합격 처리'}
          tone="lime"
          typo="C3.Md"
          onClick={() => {
            onConfirm()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}
export default PassInfoModal
