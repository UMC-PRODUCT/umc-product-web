import { useState } from 'react'

import { useResumeForm } from '@features/apply/pages/resume/useResumeForm'

import ResumeContent from '@/features/apply/components/ResumeContent'
import Close from '@/shared/assets/icons/close.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import { useGetRecruitmentApplicationForm } from '../../../hooks/useGetRecruitingData'
import * as S from './RecruitingPreview.style'

export const RecruitingPreviewContent = ({
  onClose,
  title,
  recruitingId,
}: {
  onClose: () => void
  title: string
  recruitingId: string
}) => {
  const { data } = useGetRecruitmentApplicationForm(recruitingId)
  const questionData = data.result
  const [currentPage, setCurrentPage] = useState(1)

  const { control, setValue, clearErrors, errors, isFormIncomplete, resolvedPages } = useResumeForm(
    questionData,
    undefined,
    { labelMode: 'part', showAllParts: true },
  )

  const totalPages = resolvedPages.length

  const handlePageNavigation = (nextPage: number) => {
    setCurrentPage(nextPage)
  }

  return (
    <S.ModalContentWrapper>
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
            <S.ModalButton type="button" aria-label="모달 닫기" onClick={onClose}>
              <Close color={theme.colors.gray[300]} width={30} />
            </S.ModalButton>
          </Modal.Close>
        </Flex>
      </Modal.Header>
      <Modal.Body>
        <S.ContentWrapper>
          <ResumeContent
            pages={resolvedPages}
            displayLastSavedTime={null}
            handleSave={() => {}}
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
            formData={questionData}
          />
        </S.ContentWrapper>
      </Modal.Body>
    </S.ModalContentWrapper>
  )
}
