import type { RecruitingForms } from '@/features/school/domain'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { pageType, ResumeFormSectionProps } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'

import ResumeFormSection from '../pages/resume/ResumeFormSection'
import * as S from './ResumeContent.style'

interface ResumeContentProps {
  questionData: Array<pageType>
  formData: RecruitingForms
  displayLastSavedTime: string | null
  handleSave: () => void
  control: ResumeFormSectionProps['control']
  setValue: ResumeFormSectionProps['setValue']
  clearErrors: ResumeFormSectionProps['clearErrors']
  errors: ResumeFormSectionProps['errors']
  currentPage: number
  totalPages: number
  isFormIncomplete: boolean
  openSubmitModal: () => void
  handlePageNavigation: ResumeFormSectionProps['onPageChange']
  isEdit?: boolean
}

const ResumeContent = ({
  questionData,
  displayLastSavedTime,
  handleSave,
  control,
  setValue,
  clearErrors,
  errors,
  currentPage,
  totalPages,
  isFormIncomplete,
  openSubmitModal,
  handlePageNavigation,
  isEdit,
  formData,
}: ResumeContentProps) => {
  return (
    <>
      <S.BorderedSection alignItems="flex-start">{formData.noticeContent}</S.BorderedSection>
      <S.BorderedSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap="18px">
            {displayLastSavedTime && (
              <S.LastSavedTime>{displayLastSavedTime}에 마지막으로 저장됨.</S.LastSavedTime>
            )}
            <Badge
              typo="B3.Md"
              tone="lime"
              variant="outline"
              onClick={handleSave}
              css={{
                cursor: 'pointer',
                [media.down(theme.breakPoints.tablet)]: {
                  ...theme.typography.B4.Md,
                },
              }}
            >
              저장하기
            </Badge>
          </Flex>
        </Flex>
      </S.BorderedSection>

      <S.BorderedSection>
        <ResumeFormSection
          pages={questionData}
          control={control}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          currentPage={currentPage}
          totalPages={totalPages}
          isSubmitDisabled={isFormIncomplete}
          onOpenSubmitModal={openSubmitModal}
          onPageChange={handlePageNavigation}
          isEdit={isEdit}
        />
      </S.BorderedSection>
    </>
  )
}

export default ResumeContent
