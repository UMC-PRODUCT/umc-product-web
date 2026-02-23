import type { Meta, StoryObj } from '@storybook/react-vite'

import RadioChoice from './RadioChoice'

const meta = {
  title: 'Common/Question/RadioChoice',
  component: RadioChoice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    content: '웹 파트',
    optionId: 'web',
    value: 'web',
    mode: 'edit',
    isOtherOption: false,
  },
} satisfies Meta<typeof RadioChoice>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const OtherOption: Story = {
  args: {
    content: '기타',
    optionId: 'other',
    isOtherOption: true,
    value: 'other',
    otherInputValue: '직접 입력 값',
  },
}
