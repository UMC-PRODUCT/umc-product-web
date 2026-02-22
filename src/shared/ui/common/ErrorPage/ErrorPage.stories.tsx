import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import ErrorPage from './ErrorPage'

const meta = {
  title: 'Common/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    hint: { control: 'text' },
    retryLabel: { control: 'text' },
  },
  args: {
    title: '오류가 발생했습니다',
    description: '잠시 후 다시 시도해 주세요.',
    hint: '문제가 반복되면 관리자에게 문의해 주세요.',
    retryLabel: '다시 시도',
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj

export const Default: Story = {}

export const WithoutRetry: Story = {
  args: {
    onRetry: undefined,
  },
}
