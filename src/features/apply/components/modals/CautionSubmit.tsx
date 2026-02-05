import { useNavigate } from '@tanstack/react-router'

import Caution from '@/shared/assets/icons/caution.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const CautionSubmit = ({
  onClose,
  onSubmit,
  onAllowNavigate,
}: {
  onClose: () => void
  onSubmit: () => void
  onAllowNavigate?: () => void
}) => {
  const navigate = useNavigate()
  return (
    <AlertModalLayout
      mode={'warning'}
      onClose={onClose}
      title="주의"
      content={`지원서 제출 이후에는 지원서 수정이 불가합니다.
지원서를 제출하시겠습니까?`}
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
            onClose()
          }}
          label="이어서 작성하기"
          tone="gray"
          typo="C3.Md"
        />
        <Button
          onClick={() => {
            onSubmit()
            onClose()
            onAllowNavigate?.()
            navigate({
              to: '/apply',
            })
          }}
          label="제출하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default CautionSubmit
