import { Flex } from '@/shared/ui/common/Flex'

import RadioChoice from './RadioChoice'

interface ChoiceProps {
  value?: string
  onChange?: (value: any) => void
  options: Array<string>
  mode: 'view' | 'edit'
}

export const Choice = ({ value, onChange, options, mode }: ChoiceProps) => {
  const isEditable = mode === 'edit'

  const handleSelect = (option: string) => {
    onChange?.(option)
  }

  return (
    <Flex flexDirection="column" gap={10}>
      {options.map((option, index) => (
        <RadioChoice
          content={option}
          value={value}
          key={index}
          mode={mode}
          onClick={isEditable ? () => handleSelect(option) : undefined}
        />
      ))}
    </Flex>
  )
}
