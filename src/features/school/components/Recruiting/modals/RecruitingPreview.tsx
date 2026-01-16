import { useMemo, useState } from 'react'

import ResumeContent from '@/features/apply/components/ResumeContent'
import { useResumeForm } from '@/features/apply/pages/resume/useResumeForm'
import Close from '@/shared/assets/icons/close.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { PartQuestionBankPage, QuestionList } from '@features/apply/domain'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import * as S from './RecruitingPreview.style'

const RecruitingPreview = ({
  onClose,
  title,
  questionData,
}: {
  onClose: () => void
  title: string
  questionData: QuestionList
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { control, setValue, clearErrors, errors, isFormIncomplete, resolvedPages } = useResumeForm(
    questionData,
    { labelMode: 'part', showAllParts: true },
  )
  const partQuestions = useMemo(
    () =>
      (Object.values(questionData.partQuestionBank) as Array<Array<PartQuestionBankPage>>).flatMap(
        (partPages) => partPages.flatMap((partPage) => partPage.questions),
      ),
    [questionData.partQuestionBank],
  )
  const totalPages = resolvedPages.length
  const currentPageIndex = Math.max(Math.min(currentPage - 1, totalPages - 1), 0)
  const currentPageData = resolvedPages[currentPageIndex] ?? {
    page: currentPageIndex + 1,
    questions: [],
  }
  const currentQuestions = currentPageData.questions ?? []

  const handlePageNavigation = (nextPage: number) => {
    setCurrentPage(nextPage)
  }

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            css={{
              backgroundColor: theme.colors.black,
              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.70)',
            }}
            flexDirection="column"
            width={'fit-content'}
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
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                gap={22}
              >
                <ResumeContent
                  questionData={questionData}
                  displayLastSavedTime={null}
                  handleSave={() => {}}
                  currentQuestions={currentQuestions}
                  partQuestions={partQuestions}
                  isEdit={false}
                  control={control}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  errors={errors}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  isFormIncomplete={isFormIncomplete}
                  openSubmitModal={() => {}}
                  handlePageNavigation={handlePageNavigation}
                />
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default RecruitingPreview
