import Check from '@/shared/assets/icons/check.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const SetPassSuccessModal = ({
  onClose,
  processedCount,
}: {
  onClose: () => void
  processedCount?: number
}) => {
  const resolvedCount = processedCount ?? 0
  return (
    <AlertModalLayout
      Icon={Check}
      mode={'success'}
      onClose={onClose}
      title="합격 처리 완료"
      content={`선택된 ${resolvedCount}명의 지원자를 합격 처리 완료했습니다.\n'합격 취소' 버튼을 클릭하면 합격 처리를 취소할 수 있습니다.`}
    >
      <Flex
        height="32px"
        gap="16px"
        maxWidth="70px"
        justifyContent="flex-end"
        css={{
          marginTop: '40px',
        }}
      >
        <Button type="button" label={'확인'} tone="lime" typo="C3.Md" onClick={() => onClose()} />
      </Flex>
    </AlertModalLayout>
  )
}
export default SetPassSuccessModal
