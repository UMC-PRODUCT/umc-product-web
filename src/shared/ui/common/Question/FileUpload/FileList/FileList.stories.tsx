import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { UploadedFile } from '@/shared/types/apply'

import FileList from './FileList'

const files: Array<UploadedFile> = [
  {
    id: 'f1',
    name: 'portfolio.pdf',
    size: 2400000,
    status: 'success',
    progress: 100,
    file: new File(['demo'], 'portfolio.pdf', { type: 'application/pdf' }),
  },
  {
    id: 'f2',
    name: 'resume.zip',
    size: 5300000,
    status: 'loading',
    progress: 60,
    file: new File(['demo'], 'resume.zip', { type: 'application/zip' }),
  },
  {
    id: 'f3',
    name: 'etc.docx',
    size: 310000,
    status: 'error',
    progress: 0,
    file: new File(['demo'], 'etc.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }),
    errorMessage: '파일 형식을 확인해 주세요.',
  },
]

const meta = {
  title: 'Common/Question/FileList',
  component: FileList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    files,
    mode: 'edit',
    onRetry: fn(),
    onRemove: fn(),
  },
} satisfies Meta<typeof FileList>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 760, maxWidth: '100%' }}>
      <FileList files={files} mode="edit" onRetry={fn()} onRemove={fn()} />
    </div>
  ),
}
