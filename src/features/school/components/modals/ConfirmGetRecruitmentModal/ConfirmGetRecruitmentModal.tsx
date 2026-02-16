import Inform from '@/shared/assets/icons/notice_fill.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import AlertModalLayout from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout'

const ConfirmGetRecruitmentModal = ({
  onClose,
  onClickAdditional,
  onClickNew,
}: {
  onClose: () => void
  onClickAdditional: () => void
  onClickNew: () => void
}) => {
  const content = `
추가 모집인가요?
기존의 모집 데이터를 불러와 연동할 수 있습니다.
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
          label={'네, 추가 모집입니다.'}
          tone="gray"
          onClick={() => {
            onClickAdditional()
          }}
          typo="C3.Md"
          css={{ width: '145px' }}
        />
        <Button
          type="button"
          label={'아니요, 새로운 모집입니다.'}
          tone="lime"
          typo="C3.Md"
          onClick={() => {
            onClickNew()
          }}
          css={{ width: '182px' }}
        />
      </Flex>
    </AlertModalLayout>
  )
}
export default ConfirmGetRecruitmentModal
