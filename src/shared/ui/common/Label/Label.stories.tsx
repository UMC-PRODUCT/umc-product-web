import type { Meta, StoryObj } from '@storybook/react-vite'

import Label from './Label'

const meta = {
  title: 'Common/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
    necessary: { control: 'boolean' },
  },
  args: {
    label: '이름',
    size: 'md',
    necessary: false,
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const Required: Story = {
  args: {
    label: '이메일',
    necessary: true,
  },
}

export const Large: Story = {
  args: {
    label: '지원 동기',
    size: 'lg',
  },
}
