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
      options: [
        'H1.Sb',
        'H2.Sb',
        'H3.Sb',
        'H4.Sb',
        'H4.Md',
        'H5.Sb',
        'H5.Md',
        'B1.Sb',
        'B1.Md',
        'B2.Md',
        'B3.Sb',
        'B3.Md',
        'B3.Rg',
        'B4.Sb',
        'B4.Md',
        'B4.Rg',
        'B5.Sb',
        'B5.Md',
        'B5.Rg',
        'C1.Sb',
        'C1.Md',
        'C2.Sb',
        'C2.Md',
        'C2.Rg',
        'C3.Md',
        'C3.Rg',
        'C4.Rg',
        'C5.Rg',
        'C5.Md',
        'Slogan.Md',
      ],
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
type Story = StoryObj

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
