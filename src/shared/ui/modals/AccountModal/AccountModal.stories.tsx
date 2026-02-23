import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fn } from 'storybook/test'

import { authKeys } from '@/shared/queryKeys'
import { Button } from '@/shared/ui/common/Button'

import AccountModal from './AccountModal'

const meta = {
  title: 'Modal/AccountModal',
  component: AccountModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof AccountModal>

export default meta
type Story = StoryObj<typeof meta>

const createStoryQueryClient = () => {
  const queryClient = new QueryClient()

  queryClient.setQueryData(authKeys.getMemberOAuthMe, [
    { memberOAuthId: '1', memberId: '100', provider: 'KAKAO' as const },
    { memberOAuthId: '2', memberId: '100', provider: 'GOOGLE' as const },
  ])

  return queryClient
}

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    const [queryClient] = useState(() => createStoryQueryClient())

    return (
      <QueryClientProvider client={queryClient}>
        {!isOpen ? (
          <Button
            label="계정 연동 모달 다시 열기"
            tone="lime"
            css={{ width: 220, padding: 10 }}
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <AccountModal
            {...args}
            onClose={() => {
              args.onClose()
              setIsOpen(false)
            }}
          />
        )}
      </QueryClientProvider>
    )
  },
}
