import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import NoticeIcon from '@/shared/assets/icons/notice.svg?react'
import { Button } from '@/shared/ui/common/Button'

import AlertModalLayout from './AlertModalLayout'

const meta = {
  title: 'Modal/AlertModalLayout',
  component: AlertModalLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '저장이 완료되었습니다',
    content: '변경사항이 정상적으로 반영되었습니다.',
    mode: 'success',
    Icon: NoticeIcon,
    onClose: fn(),
  },
} satisfies Meta<typeof AlertModalLayout>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return !isOpen ? (
      <Button
        label="알림 모달 다시 열기"
        tone="lime"
        css={{ width: 180, padding: 10 }}
        onClick={() => setIsOpen(true)}
      />
    ) : (
      <AlertModalLayout
        title="저장이 완료되었습니다"
        content="변경사항이 정상적으로 반영되었습니다."
        mode="success"
        Icon={NoticeIcon}
        onClose={() => setIsOpen(false)}
      >
        <Button
          label="확인"
          tone="lime"
          css={{ width: 96, padding: 8 }}
          onClick={() => setIsOpen(false)}
        />
      </AlertModalLayout>
    )
  },
}

export const Warning: Story = {
  args: {
    title: '주의가 필요합니다',
    content: '삭제 후에는 복구할 수 없습니다.',
    mode: 'warning',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return !isOpen ? (
      <Button
        label="경고 모달 다시 열기"
        tone="lime"
        css={{ width: 180, padding: 10 }}
        onClick={() => setIsOpen(true)}
      />
    ) : (
      <AlertModalLayout
        title="주의가 필요합니다"
        content="삭제 후에는 복구할 수 없습니다."
        mode="warning"
        Icon={NoticeIcon}
        onClose={() => setIsOpen(false)}
      >
        <Button
          label="취소"
          tone="gray"
          variant="outline"
          css={{ width: 96, padding: 8 }}
          onClick={() => setIsOpen(false)}
        />
        <Button
          label="삭제"
          tone="necessary"
          css={{ width: 96, padding: 8 }}
          onClick={() => setIsOpen(false)}
        />
      </AlertModalLayout>
    )
  },
}
