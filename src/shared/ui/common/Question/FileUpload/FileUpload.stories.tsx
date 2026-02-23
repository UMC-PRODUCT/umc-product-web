import type { Meta, StoryObj } from '@storybook/react-vite'

import type { FileUploadAnswer } from '@/shared/types/apply'

import { FileUpload } from './FileUpload'

const value: FileUploadAnswer = {
  files: [
    {
      id: 'file-1',
      name: 'portfolio.pdf',
      size: 1230000,
      status: 'success',
      progress: 100,
      file: new File(['demo'], 'portfolio.pdf', { type: 'application/pdf' }),
    },
  ],
  links: ['https://github.com/umc-product-web'],
}

const meta = {
  title: 'Common/Question/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj

export const ViewMode: Story = {
  render: () => (
    <div style={{ width: 900, maxWidth: '100%' }}>
      <FileUpload value={value} mode="view" />
    </div>
  ),
}
