import Inform from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const ConfirmGetRecruitmentModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void
  onConfirm: () => void
}) => {
  const content = `
기존 모집 데이터가 존재합니다.
해당 데이터를 불러와 모집을 생성하시겠습니까?
  `
  return (
    <AlertModalLayout
      Icon={Inform}
      mode={'disabled'}
      onClose={onClose}
      title="안내"
      content={content}
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
          label={'새로 만들기'}
          tone="gray"
          onClick={onClose}
          typo="C3.Md"
          css={{ width: '98px' }}
        />
        <Button
          type="button"
          label={'기존 모집 불러오기'}
          tone="lime"
          typo="C3.Md"
          onClick={() => {
            onConfirm()
          }}
          css={{ width: '138px' }}
        />
      </Flex>
    </AlertModalLayout>
  )
}
export default ConfirmGetRecruitmentModal
