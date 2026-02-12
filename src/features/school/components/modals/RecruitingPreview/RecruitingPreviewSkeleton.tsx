import Close from '@/shared/assets/icons/close.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import * as S from './RecruitingPreview.style'

export const RecruitingPreviewSkeletonContent = ({
  title,
  onClose,
}: {
  title: string
  onClose: () => void
}) => (
  <S.ModalContentWrapper
    css={{
      backgroundColor: theme.colors.black,
      boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.70)',
      width: 'fit-content',
    }}
  >
    <Modal.Header>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        css={{
          marginBottom: '33px',
          [media.down(theme.breakPoints.mobile)]: { marginBottom: '10px' },
        }}
      >
        <Modal.Title asChild>
          <S.Title>{title}</S.Title>
        </Modal.Title>
        <S.ModalButton type="button" aria-label="모달 닫기" onClick={onClose}>
          <Close color={theme.colors.gray[300]} width={30} />
        </S.ModalButton>
      </Flex>
    </Modal.Header>
    <Modal.Body>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={16}
        css={{ minHeight: '320px', minWidth: '420px' }}
      >
        <Loading />
      </Flex>
    </Modal.Body>
  </S.ModalContentWrapper>
)
