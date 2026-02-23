import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from './Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['white', 'lime', 'kakao', 'gray', 'darkGray', 'necessary', 'caution'],
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
    rounded: { control: { type: 'number', min: 0, max: 40, step: 1 } },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    label: '버튼',
    tone: 'lime',
    variant: 'solid',
    typo: 'B3.Md',
    rounded: 6,
    disabled: false,
    isLoading: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj

export const Solid: Story = {}

export const Outline: Story = {
  args: {
    tone: 'white',
    variant: 'outline',
    label: 'Outline Button',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    label: '저장 중',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '비활성화',
  },
}
