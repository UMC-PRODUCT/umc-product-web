import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckChoice } from './CheckChoice'

const meta = {
  title: 'Common/Question/CheckChoice',
  component: CheckChoice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    content: 'React',
    isChecked: true,
    mode: 'edit',
    isOtherOption: false,
    onToggle: () => {},
  },
} satisfies Meta<typeof CheckChoice>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const OtherOption: Story = {
  args: {
    content: '기타',
    isOtherOption: true,
    otherInputValue: '직접 입력',
  },
}
