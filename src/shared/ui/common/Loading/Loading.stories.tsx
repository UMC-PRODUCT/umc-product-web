import type { Meta, StoryObj } from '@storybook/react-vite'

import Loading from './Loading'

const meta = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 12, max: 72, step: 2 } },
    borderWidth: { control: { type: 'number', min: 1, max: 8, step: 1 } },
    label: { control: 'text' },
    labelPlacement: {
      control: 'inline-radio',
      options: ['bottom', 'right'],
    },
  },
  args: {
    size: 36,
    borderWidth: 3,
    label: '불러오는 중',
    labelPlacement: 'bottom',
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const InlineLabel: Story = {
  args: {
    labelPlacement: 'right',
    label: '처리 중',
    size: 22,
  },
}

export const IconOnly: Story = {
  args: {
    label: undefined,
  },
}
