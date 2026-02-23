import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import SuspenseFallback from '../SuspenseFallback/SuspenseFallback'
import AsyncBoundary from './AsyncBoundary'

const ThrowError = () => {
  throw new Error('스토리북 에러 경계 테스트')
}

const SilenceBoundaryErrorLogs = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const originalError = console.error
    console.error = (...args: Array<unknown>) => {
      const normalized = args.map((arg) => String(arg)).join(' ')
      if (
        normalized.includes('The above error occurred in the <ThrowError> component') ||
        normalized.includes('스토리북 에러 경계 테스트')
      ) {
        return
      }
      originalError(...args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return <>{children}</>
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
    <SilenceBoundaryErrorLogs>
      <AsyncBoundary fallback={<SuspenseFallback label="로딩 중" />}>
        <ThrowError />
      </AsyncBoundary>
    </SilenceBoundaryErrorLogs>
  ),
}

export const CustomErrorFallback: Story = {
  render: () => (
    <SilenceBoundaryErrorLogs>
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
    </SilenceBoundaryErrorLogs>
  ),
}
