import type { Meta, StoryObj } from '@storybook/react-vite'

import ErrorMessage from './ErrorMessage'

const meta = {
  title: 'Common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: { control: 'text' },
    typo: {
      control: 'select',
      options: ['B5.Md', 'B4.Md', 'B3.Md', 'C5.Md'],
    },
  },
  args: {
    errorMessage: '필수 입력 항목입니다.',
    typo: 'B5.Md',
  },
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const Large: Story = {
  args: {
    typo: 'B3.Md',
    errorMessage: '입력값 형식이 올바르지 않습니다.',
  },
}
