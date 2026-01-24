import FillNotice from '@shared/assets/icons/notice_fill.svg?react'

import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const DeleteAccountModal = ({
  nickname,
  name,
  onClose,
  onClick,
}: {
  nickname: string
  name: string
  onClose: () => void
  onClick: () => void
}) => {
  const content = `계정을 삭제할 시 복구할 수 없습니다.
${nickname}/${name} 님의 계정을 삭제하시겠습니까?`
  return (
    <AlertModalLayout
      onClose={onClose}
      content={content}
      Icon={FillNotice}
      title="경고"
      mode="error"
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
        <Button
          type="button"
          label={'취소하기'}
          tone="gray"
          onClick={onClose}
          typo="C3.Md"
        ></Button>
        <Button
          type="button"
          label={'삭제하기'}
          tone="necessary"
          typo="C3.Md"
          onClick={() => {
            onClick()
            onClose()
          }}
        ></Button>
      </Flex>
    </AlertModalLayout>
  )
}
export default DeleteAccountModal
