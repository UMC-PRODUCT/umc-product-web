import Notice from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const SubmitRecruitingErrorModal = ({
  onClose,
  message,
}: {
  onClose: () => void
  message?: string
}) => {
  return (
    <AlertModalLayout
      mode="error"
      onClose={onClose}
      title="모집 등록 실패"
      content={message || `요청을 처리하는 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.`}
      Icon={Notice}
    >
      <Flex justifyContent="flex-end" alignItems="center" width="100px">
        <Button
          onClick={onClose}
          label="확인"
          tone="gray"
          typo="C3.Md"
          css={{ height: 32, width: 80, marginTop: 16 }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default SubmitRecruitingErrorModal
