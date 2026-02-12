import { useQueryClient } from '@tanstack/react-query'

import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const PassCancleCautionModal = ({
  onClose,
  applicationId,
  recruitmentId,
  name,
  nickname,
  score,
}: {
  onClose: () => void
  applicationId: string
  recruitmentId: string
  name: string
  nickname: string
  score: string
}) => {
  const queryClient = useQueryClient()
  const { usePatchFinalSelectionStatus } = useRecruitingMutation()
  const { mutate: patchFinalSelectionStatus } = usePatchFinalSelectionStatus(
    recruitmentId,
    applicationId,
  )
  const handleCancelPass = () => {
    patchFinalSelectionStatus(
      { decision: 'WAIT' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['school', 'finalSelections'] })
          onClose()
        },
      },
    )
  }
  return (
    <AlertModalLayout
      Icon={Caution}
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`${name}/${nickname} 님의 최종 환산 점수는 ${score}점입니다.\n${nickname} 님의 합격을 취소하시겠습니까?`}
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
        <Button type="button" label={'닫기'} tone="gray" onClick={onClose} typo="C3.Md" />
        <Button
          type="button"
          label={'합격 취소'}
          tone="necessary"
          typo="C3.Md"
          onClick={() => {
            handleCancelPass()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}
export default PassCancleCautionModal
