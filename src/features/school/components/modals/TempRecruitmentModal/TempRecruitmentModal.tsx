import Close from '@shared/assets/icons/close.svg?react'
import { Modal } from '@shared/ui/common/Modal'

import * as S from '@/features/school/components/modals/TempRecruitmentModal/TempRecruitmentModal.style'
import { getRecruitments } from '@/features/school/domain/api'
import { recruiteKeys } from '@/features/school/domain/queryKey'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import TempRecruitmentCard from '../../TempRecruitmentCard/TempRecruitmentCard'

type TempRecruitmentModalProps = {
  onClose: () => void
}
const TempRecruitmentModal = ({ onClose }: TempRecruitmentModalProps) => {
  const { data, isLoading, error } = useCustomQuery(
    recruiteKeys.recruitments({ status: 'DRAFT' }).queryKey,
    () => getRecruitments({ status: 'DRAFT' }),
  )
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="920px"
            maxHeight={'600px'}
            minHeight={'600px'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{
                  borderBottom: `1px solid ${theme.colors.gray[600]}`,
                }}
              >
                <Modal.Title asChild>
                  <S.Title>임시저장 모집</S.Title>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper
                height="100%"
                minHeight="480px"
                width="100%"
                alignItems="center"
                flexDirection="column"
                gap={'8px'}
              >
                {data?.result.recruitments.map((recruitment) => (
                  <TempRecruitmentCard
                    key={recruitment.recruitmentId}
                    title={recruitment.recruitmentName}
                    tempSavedTime={'2026.01.06'}
                    editable={recruitment.editable}
                  />
                ))}
                {data?.result.recruitments.length === 0 && !isLoading && !error && (
                  <S.EmptyText>임시저장된 모집이 없습니다.</S.EmptyText>
                )}
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default TempRecruitmentModal
