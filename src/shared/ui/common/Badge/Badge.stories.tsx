import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  title: 'Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['darkGray', 'gray', 'lime', 'white', 'necessary', 'caution'],
    },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline'],
    },
    typo: {
      control: 'select',
      options: ['B5.Sb', 'B5.Md', 'C5.Md'],
    },
    children: { control: 'text' },
  },
  args: {
    tone: 'lime',
    variant: 'solid',
    typo: 'B5.Sb',
    children: '모집중',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {}

export const Outline: Story = {
  args: {
    tone: 'gray',
    variant: 'outline',
    children: '승인 대기',
  },
}

export const Alert: Story = {
  args: {
    tone: 'necessary',
    children: '마감 임박',
  },
}
