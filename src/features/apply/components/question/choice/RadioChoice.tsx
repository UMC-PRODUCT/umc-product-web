import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from '../choice/shared'

export default function RadioChoice({
  content,
  onClick,
  value,
}: {
  content: string
  onClick?: () => void
  value?: string
}) {
  const isChecked = value === content // 체크 여부 판단

  return (
    <Flex alignItems="center" gap={14} onClick={onClick} css={{ cursor: 'pointer' }}>
      <S.RadioChoiceInput
        type="radio"
        readOnly // onChange 대신 부모 클릭을 쓰므로 경고 방지
        checked={isChecked}
        isChecked={isChecked} // 스타일용 props
      />
      <span css={{ color: theme.colors.white, ...theme.typography.B3.Rg }}>{content}</span>
    </Flex>
  )
}
