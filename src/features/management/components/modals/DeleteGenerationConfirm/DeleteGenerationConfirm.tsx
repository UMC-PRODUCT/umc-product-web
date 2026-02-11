import Caution from '@shared/assets/icons/caution.svg?react'
import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'

const DeleteGenerationConfirm = ({ onClose, gisuId }: { gisuId: string; onClose: () => void }) => {
  const content = `삭제된 기수에 대한 모든 데이터는 복구할 수 없습니다.\n삭제하시겠습니까?`
  const { useDeleteGeneration } = useManagementMutations()
  const { mutate: deleteGenerationMutate } = useDeleteGeneration()
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
            deleteGenerationMutate(gisuId, {
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

export default DeleteGenerationConfirm
