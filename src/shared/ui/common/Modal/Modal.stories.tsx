import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Flex } from '../Flex'
import { Modal } from './Modal'

const meta = {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button label="모달 열기" tone="lime" css={{ width: 140, padding: 10 }} />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Flex
            flexDirection="column"
            gap={18}
            css={{
              width: 420,
              background: '#202020',
              border: '1px solid #3E3E3E',
              borderRadius: 12,
              padding: 20,
              color: '#FFFFFF',
            }}
          >
            <Modal.Header>
              <Modal.Title>지원서 제출</Modal.Title>
              <Modal.Close />
            </Modal.Header>
            <Modal.Body>
              <Modal.Description>정말 제출하시겠습니까?</Modal.Description>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>
                <Button
                  label="취소"
                  tone="gray"
                  variant="outline"
                  css={{ width: 90, padding: 8 }}
                />
              </Modal.Close>
              <Button label="확인" tone="lime" css={{ width: 90, padding: 8 }} />
            </Modal.Footer>
          </Flex>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  ),
}
