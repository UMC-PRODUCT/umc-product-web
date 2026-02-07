import Caution from '@shared/assets/icons/caution.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

const DeleteBranchConfirm = ({ onClose, branchId }: { branchId: string; onClose: () => void }) => {
  const content = `삭제된 지부에 대한 모든 데이터는 복구할 수 없습니다.\n삭제하시겠습니까?`
  // TODO: 지부 삭제 API 연동
  console.log('삭제할 지부 ID:', branchId)
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
        <Button type="button" label={'취소하기'} tone="gray" onClick={onClose} typo="C3.Md" />
        <Button
          type="button"
          label={'삭제하기'}
          tone="lime"
          typo="C3.Md"
          onClick={() => {
            // TODO: 지부 삭제 API 연동
            onClose()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default DeleteBranchConfirm
