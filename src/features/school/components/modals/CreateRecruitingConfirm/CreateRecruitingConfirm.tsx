import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const CreateRecruitingConfirm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: () => void
}) => {
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`모집 생성 이후에는 일부 정보가 수정 불가할 수 있습니다.
지원자가 있는 모집은 삭제할 수 없으니 신중하게 생성해 주세요.`}
      Icon={Caution}
    >
      <Flex
        gap="16px"
        justifyContent="flex-end"
        alignItems="center"
        width="182px"
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
            onSubmit()
            onClose()
          }}
          label="생성하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default CreateRecruitingConfirm
