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
  currentStatus,
}: {
  onClose: () => void
  applicationId: string
  recruitmentId: string
  name: string
  nickname: string
  score: string
  currentStatus: 'PASS' | 'FAIL'
}) => {
  const queryClient = useQueryClient()
  const { usePatchFinalSelectionStatus } = useRecruitingMutation()
  const { mutate: patchFinalSelectionStatus } = usePatchFinalSelectionStatus(recruitmentId)
  const handleCancelStatus = () => {
    patchFinalSelectionStatus(
      { applicationId, requestBody: { decision: 'WAIT' } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['school', 'finalSelections'] })
          onClose()
        },
      },
    )
  }

  const isPass = currentStatus === 'PASS'
  const content = `${name}/${nickname} 님의 최종 환산 점수는 ${score}점입니다.\n${nickname} 님의 ${
    isPass ? '합격' : '불합격'
  }을 취소하시겠습니까?`

  return (
    <AlertModalLayout
      Icon={Caution}
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={content}
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
          label={isPass ? '합격 취소' : '불합격 취소'}
          tone="necessary"
          typo="C3.Md"
          onClick={() => {
            handleCancelStatus()
          }}
        />
      </Flex>
    </AlertModalLayout>
  )
}
export default PassCancleCautionModal
