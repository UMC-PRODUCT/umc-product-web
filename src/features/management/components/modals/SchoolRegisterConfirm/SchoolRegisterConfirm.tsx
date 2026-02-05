import { useNavigate } from '@tanstack/react-router'

import Check from '@/shared/assets/icons/check.svg?react'
import { Button } from '@/shared/ui/common/Button/Button'
import Flex from '@/shared/ui/common/Flex/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const SchoolRegisterConfirm = ({
  onClose,
  schoolName,
  link,
}: {
  onClose: () => void
  schoolName: string
  link: string
}) => {
  const navigate = useNavigate()
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={onClose}
      title="등록 완료"
      content={`‘${schoolName}’가 시스템에 정상적으로 등록되었습니다.
등록된 학교의 정보는 ‘학교 정보 수정'에서 확인할 수 있습니다.`}
      Icon={Check}
    >
      <Flex
        gap="8px"
        justifyContent="flex-end"
        alignItems="center"
        width="138px"
        height="32px"
        css={{ marginTop: '50px' }}
      >
        <Button
          onClick={() => {
            onClose()
            navigate({ to: link })
          }}
          label="학교 정보 확인하기"
          tone="lime"
          typo="C3.Md"
        />
      </Flex>
    </AlertModalLayout>
  )
}

export default SchoolRegisterConfirm
