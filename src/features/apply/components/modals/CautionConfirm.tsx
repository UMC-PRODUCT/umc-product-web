import { useNavigate } from '@tanstack/react-router'

import { Button } from '@shared/ui/common/Button/Button'
import Flex from '@shared/ui/common/Flex/Flex'
import AlertModalLayout from '@shared/ui/modals/AlertModalLayout/AlertModalLayout'

import Caution from '@/shared/assets/icons/caution.svg?react'

export default function CautionConfirm({
  onClose,
  createNewResume,
  existingResumeId,
}: {
  onClose: () => void
  createNewResume: () => void
  existingResumeId: number
}) {
  const navigate = useNavigate()
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`이미 작성 중인 지원서가 존재합니다. 이어서 작성하시겠습니까?
        ‘새로 작성하기’를 선택하실 경우, 기존 지원서는 삭제됩니다.`}
      Icon={Caution}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="250px"
        height="32px"
        css={{ marginTop: '50px' }}
      >
        <Button
          onClick={() => {
            createNewResume()
            onClose()
            const resumeId = 1 // TODO: 새로 생성된 지원서 ID로 변경
            navigate({
              to: `/apply/$resumeId`,
              params: { resumeId: String(resumeId) },
              search: { page: 1 },
            })
          }}
          label="새로 작성하기"
          tone="gray"
          typo="C3.Md"
        />
        <Button
          onClick={() => {
            const resumeId = existingResumeId
            navigate({
              to: `/apply/$resumeId`,
              params: { resumeId: String(resumeId) },
              search: { page: 1 },
            })
            onClose()
          }}
          label="이어서 작성하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}
