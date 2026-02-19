import FillNotice from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const InterviewNotStartedModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <AlertModalLayout
      Icon={FillNotice}
      mode="error"
      onClose={onClose}
      title="안내"
      content="면접이 시작되지 않아 평가 제출이 불가능합니다."
    >
      <Flex
        height="32px"
        maxWidth="100px"
        justifyContent="flex-end"
        css={{
          marginTop: '40px',
        }}
      >
        <Button type="button" label={'확인'} tone="gray" onClick={onClose} typo="C3.Md" />
      </Flex>
    </AlertModalLayout>
  )
}

export default InterviewNotStartedModal
