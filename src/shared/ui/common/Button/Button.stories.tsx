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
      options: ['B3.Md', 'B4.Md', 'B5.Md'],
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
type Story = StoryObj<typeof meta>

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
