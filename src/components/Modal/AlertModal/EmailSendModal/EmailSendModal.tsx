import Notice from '@/assets/icons/notice.svg?react'
import Flex from '@/components/common/Flex/Flex'
import AlertModalLayout from '@/components/modal/AlertModal/AlertModalLayout/AlertModalLayout'
import { theme } from '@/styles/theme'

export default function EmailSendModal({ onClose }: { onClose: () => void }) {
  return (
    <AlertModalLayout
      mode={'success'}
      onClose={onClose}
      title="이메일 전송"
      content={`입력된 이메일 주소로 메일을 전송했습니다.
        메일함을 확인하여 회원가입을 완료해주세요.`}
      Icon={Notice}
    >
      <Flex gap="8px" justifyContent="flex-end" alignItems="center" css={{ marginTop: '50px' }}>
        <span css={{ color: theme.colors.gray[400], ...theme.typography.B4.Rg }}>
          메일을 받지 못하셨나요?
        </span>
        <a
          css={{
            color: theme.colors.lime,
            borderBottom: '1px solid',
            borderColor: theme.colors.lime,
            cursor: 'pointer',
            ...theme.typography.B4.Sb,
          }}
        >
          인증 메일 재전송
        </a>
      </Flex>
    </AlertModalLayout>
  )
}
