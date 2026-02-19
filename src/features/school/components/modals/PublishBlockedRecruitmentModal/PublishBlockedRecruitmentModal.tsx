import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const PublishBlockedRecruitmentModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <AlertModalLayout
      mode="warning"
      onClose={onClose}
      title="안내"
      content={`현재 진행 중인 서류 모집이 종료된 이후에 발행이 가능합니다.\n해당 모집은 임시저장한 모집에서 확인하실 수 있습니다.`}
      Icon={Caution}
    >
      <Flex justifyContent="flex-end" alignItems="center" width="100px">
        <Button
          onClick={onConfirm}
          label="확인"
          tone="lime"
          typo="C3.Md"
          css={{ height: 32, width: 80, marginTop: 16 }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default PublishBlockedRecruitmentModal
