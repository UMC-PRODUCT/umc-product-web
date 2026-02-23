import type { Meta, StoryObj } from '@storybook/react-vite'

import NoticeIcon from '@/shared/assets/icons/notice.svg?react'

import Instruction from './Instruction'

const meta = {
  title: 'Common/Instruction',
  component: Instruction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    typography: {
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
    mode: {
      control: 'inline-radio',
      options: ['success', 'error', 'warning', 'disabled'],
    },
    iconSize: { control: { type: 'number', min: 12, max: 32, step: 1 } },
  },
  args: {
    content: '입력값을 확인해 주세요.',
    typography: 'B4.Md',
    mode: 'warning',
    iconSize: 18,
    Icon: NoticeIcon,
  },
} satisfies Meta<typeof Instruction>

export default meta
type Story = StoryObj

export const Warning: Story = {}

export const Success: Story = {
  args: {
    mode: 'success',
    content: '정상적으로 저장되었습니다.',
  },
}
