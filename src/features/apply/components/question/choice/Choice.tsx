import { Flex } from '@/shared/ui/common/Flex'

import RadioChoice from './RadioChoice'

interface ChoiceProps {
  value?: string
  onChange?: (value: any) => void
  options: Array<string>
}

export const Choice = ({ value, onChange, options }: ChoiceProps) => {
  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, index) => (
        <RadioChoice
          content={option}
          value={value}
          key={index}
          onClick={() => onChange?.(option)}
        />
      ))}
    </Flex>
  )
}
