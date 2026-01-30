import FillNotice from '@shared/assets/icons/notice_fill.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

const DeleteConfirm = ({
  onClose,
  name,
  onClick,
}: {
  onClose: () => void
  onClick: () => void
  name: string
}) => {
  const content = `삭제된 모집은 복구할 수 없습니다.
‘${name}’을 삭제하시겠습니까?`
  return (
    <AlertModalLayout
      mode={'error'}
      onClose={onClose}
      title="경고"
      content={content}
      Icon={FillNotice}
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
        <Button type="button" label={'취소하기'} tone="gray" onClick={onClose} typo="C3.Md" />
        <Button
          type="button"
          label={'삭제하기'}
          tone="necessary"
          typo="C3.Md"
          onClick={() => {
            onClick()
            onClose()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default DeleteConfirm
