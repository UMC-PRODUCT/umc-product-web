import { useQueryClient } from '@tanstack/react-query'

import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import FillNotice from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const DeleteConfirm = ({
  onClose,
  name,
  recruitmentId,
}: {
  onClose: () => void
  name: string
  recruitmentId: string
}) => {
  const queryClient = useQueryClient()
  const { useDeleteRecruitment } = useRecruitingMutation()
  const { mutate: deleteRecruitmentMutate } = useDeleteRecruitment(recruitmentId)

  const handleDeleteRecruitment = () => {
    deleteRecruitmentMutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['school'],
        })
        onClose()
      },
      onError: (error) => {
        console.error('Failed to delete recruitment:', error)
      },
    })
  }
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
            handleDeleteRecruitment()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default DeleteConfirm
