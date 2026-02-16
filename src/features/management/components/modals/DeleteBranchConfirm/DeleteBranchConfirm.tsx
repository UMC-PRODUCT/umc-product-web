import Caution from '@shared/assets/icons/caution.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'

const DeleteBranchConfirm = ({ onClose, branchId }: { branchId: string; onClose: () => void }) => {
  const content = `삭제된 지부에 대한 모든 데이터는 복구할 수 없습니다.\n삭제하시겠습니까?`
  const { useDeleteBranch } = useManagementMutations()
  const { mutate: deleteBranchMutate } = useDeleteBranch()
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
            deleteBranchMutate(branchId, {
              onSuccess: () => {
                onClose()
              },
            })
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default DeleteBranchConfirm
