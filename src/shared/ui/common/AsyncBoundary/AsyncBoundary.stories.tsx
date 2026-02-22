import type { Meta, StoryObj } from '@storybook/react-vite'

import SuspenseFallback from '../SuspenseFallback/SuspenseFallback'
import AsyncBoundary from './AsyncBoundary'

const ThrowError = () => {
  throw new Error('스토리북 에러 경계 테스트')
}

const meta = {
  title: 'Common/AsyncBoundary',
  component: AsyncBoundary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AsyncBoundary>

export default meta
type Story = StoryObj

export const ErrorFallback: Story = {
  render: () => (
    <AsyncBoundary fallback={<SuspenseFallback label="로딩 중" />}>
      <ThrowError />
    </AsyncBoundary>
  ),
}

export const CustomErrorFallback: Story = {
  render: () => (
    <AsyncBoundary
      fallback={<SuspenseFallback label="로딩 중" />}
      errorFallback={(error, reset) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span>{error.message}</span>
          <button type="button" onClick={reset}>
            리셋
          </button>
        </div>
      )}
    >
      <ThrowError />
    </AsyncBoundary>
  ),
}
