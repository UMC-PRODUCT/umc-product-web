import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import FileItem from './FileItem'

const meta = {
  title: 'Common/Question/FileItem',
  component: FileItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    fileName: 'portfolio.pdf',
    fileSize: '2.4MB',
    status: 'success',
    progress: 100,
    mode: 'edit',
    removeFile: fn(),
    onRetry: fn(),
  },
} satisfies Meta<typeof FileItem>

export default meta
type Story = StoryObj

export const Success: Story = {}

export const Loading: Story = {
  args: {
    status: 'loading',
    progress: 42,
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    progress: 0,
    errorMessage: '업로드에 실패했습니다.',
  },
}
