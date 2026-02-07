import Caution from '@shared/assets/icons/caution.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

const ExistGeneration = ({ onClose }: { onClose: () => void }) => {
  const content = `이미 존재하는 기수입니다.\n기존 기수를 삭제한 후 새롭게 생성해 주세요.`
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="경고"
      content={content}
      Icon={Caution}
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
        <Button type="button" label={'돌아가기'} tone="gray" onClick={onClose} typo="C3.Md" />
      </Flex>
    </AlertModalLayout>
  )
}

export default ExistGeneration
