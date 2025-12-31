import AlertModalLayout from '@/components/Modal/AlertModal/AlertModalLayout/AlertModalLayout'
import Notice from '@/assets/icons/notice.svg?react'
import Flex from '@/components/common/Flex/Flex'
import Button from '@/components/common/Button/Button'
import { useNavigate } from '@tanstack/react-router'
export default function AlreadyExistAccount({
  onClose,
}: {
  onClose: () => void
}) {
  const navigate = useNavigate({ from: '/auth/login' })
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={onClose}
      title="가입 이력 존재"
      content={`카카오 계정으로 가입한 이력이 존재합니다.
        Google 계정을 기존 카카오 계정에 연동하시겠습니까?`}
      Icon={Notice}
    >
      <Flex
        height="32px"
        gap="16px"
        justifyContent="flex-end"
        css={{
          marginTop: '40px',
        }}
      >
        <Button
          type="button"
          label={'로그인 화면으로'}
          tone="gray"
          onClick={() => navigate({ to: '/auth/login' })}
          typo="C3.Md"
        ></Button>
        <Button
          type="button"
          label={'계정 연동하기'}
          tone="lime"
          typo="C3.Md"
          onClick={onClose}
        ></Button>
      </Flex>
    </AlertModalLayout>
  )
}
