import { Flex } from '@/shared/ui/common/Flex'

import { CheckChoice } from './CheckChoice'

interface MultipleChoiceProps {
  value?: Array<string>
  onChange?: (value: Array<string>) => void
  options: Array<string>
}

export const MultipleChoice = ({ options, value = [], onChange }: MultipleChoiceProps) => {
  // value가 undefined일 경우를 대비해 로컬 변수화
  const selected = Array.isArray(value) ? value : []

  const handleToggle = (option: string) => {
    // 클릭 시점에 딱 한 번만 계산해서 부모에게 전달
    const nextValue = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]

    onChange?.(nextValue)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, index) => (
        <CheckChoice
          key={`${option}-${index}`}
          content={option}
          // 불필요한 객체나 함수 생성을 최소화하여 전달
          isChecked={selected.includes(option)}
          onToggle={() => handleToggle(option)}
        />
      ))}
    </Flex>
  )
}
