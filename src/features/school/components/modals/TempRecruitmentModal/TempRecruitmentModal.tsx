import Close from '@shared/assets/icons/close.svg?react'
import { Modal } from '@shared/ui/common/Modal'

import * as S from '@/features/school/components/modals/TempRecruitmentModal/TempRecruitmentModal.style'
import { getRecruitments } from '@/features/school/domain/api'
import { recruiteKeys } from '@/features/school/domain/queryKey'
import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { theme } from '@/shared/styles/theme'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import TempRecruitmentCard from '../../TempRecruitmentCard/TempRecruitmentCard'

type TempRecruitmentModalProps = {
  onClose: () => void
}

const TempRecruitmentList = () => {
  const { data } = useCustomSuspenseQuery(
    recruiteKeys.recruitments({ status: 'DRAFT' }).queryKey,
    () => getRecruitments({ status: 'DRAFT' }),
  )

  const recruitments = data.result.recruitments

  if (recruitments.length === 0) {
    return <S.EmptyText>임시저장된 모집이 없습니다.</S.EmptyText>
  }

  return (
    <>
      {recruitments.map((recruitment) => (
        <TempRecruitmentCard
          key={recruitment.recruitmentId}
          title={recruitment.recruitmentName}
          tempSavedTime={'2026.01.06'}
          editable={recruitment.editable}
          recruitmentId={String(recruitment.recruitmentId)}
        />
      ))}
    </>
  )
}

const TempRecruitmentModal = ({ onClose }: TempRecruitmentModalProps) => {
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
                <AsyncBoundary
                  fallback={
                    <S.MessageWrapper>
                      <SuspenseFallback label="로딩 중…" gap={12}>
                        <S.MessageTitle>임시저장된 모집을 불러오는 중입니다.</S.MessageTitle>
                        <S.MessageDescription>잠시만 기다려 주세요.</S.MessageDescription>
                      </SuspenseFallback>
                    </S.MessageWrapper>
                  }
                  errorFallback={(error, reset) => (
                    <S.MessageWrapper>
                      <ErrorPage
                        title="임시저장된 모집을 불러오는 중 오류가 발생했습니다."
                        description={error.message || '잠시 후 다시 시도해 주세요.'}
                        hint="문제가 계속되면 고객센터로 문의해 주세요."
                        onRetry={reset}
                        retryLabel="다시 불러오기"
                      />
                    </S.MessageWrapper>
                  )}
                >
                  <TempRecruitmentList />
                </AsyncBoundary>
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default TempRecruitmentModal
