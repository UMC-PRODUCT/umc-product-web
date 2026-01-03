import FillNotice from '@/assets/icons/notice_fill.svg?react'
import { Button } from '@/components/common/Button/Button'
import Flex from '@/components/common/Flex/Flex'
import AlertModalLayout from '@/components/Modal/AlertModal/AlertModalLayout/AlertModalLayout'

export default function DeleteConfirm({
  onClose,
  name,
  onClick,
  type,
  count,
}: {
  onClose: () => void
  onClick: () => void
  name: string
  type: 'school' | 'account'
  count: number
}) {
  const entityTypeKorea = type === 'school' ? '학교' : '계정'
  const content =
    count === 1
      ? `삭제된 ${entityTypeKorea} 데이터는 복구할 수 없습니다.
        ‘${name}’를 삭제하시겠습니까?`
      : `삭제된 ${entityTypeKorea} 데이터는 복구할 수 없습니다.
        ‘${name}’ 외 ${count - 1}개의 ${entityTypeKorea}를 삭제하시겠습니까?`
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
        <Button
          type="button"
          label={'취소하기'}
          tone="gray"
          onClick={onClose}
          typo="C3.Md"
        ></Button>
        <Button
          type="button"
          label={'삭제하기'}
          tone="necessary"
          typo="C3.Md"
          onClick={() => {
            onClick()
            onClose()
          }}
        ></Button>
      </Flex>
    </AlertModalLayout>
  )
}
