import FillNotice from '@shared/assets/icons/notice_fill.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

const DeleteFail = ({ onClose, name }: { onClose: () => void; name: string }) => {
  const content = `‘${name}’의 지원자가 존재합니다.
지원자가 존재하는 모집은 삭제할 수 없습니다.`
  return (
    <AlertModalLayout
      mode={'disabled'}
      onClose={onClose}
      title="안내"
      content={content}
      Icon={FillNotice}
    >
      <Flex
        height="32px"
        maxWidth="65px"
        justifyContent="flex-end"
        css={{
          marginTop: '40px',
        }}
      >
        <Button type="button" label={'닫기'} tone="gray" onClick={onClose} typo="C3.Md"></Button>
      </Flex>
    </AlertModalLayout>
  )
}

export default DeleteFail
