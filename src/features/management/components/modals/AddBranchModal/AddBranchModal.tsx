import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

import { managementKeys } from '@/features/management/domain/queryKeys'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import { useGetUnassignedSchools } from '@/features/management/hooks/useManagementQueries'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import { Modal } from '@/shared/ui/common/Modal'
import LabelDropdown from '@/shared/ui/form/LabelDropdown/LabelDropdown'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './AddBranchModal.style'

const AddBranchModal = ({ onClose, gisuId }: { onClose: () => void; gisuId: string }) => {
  const queryClient = useQueryClient()
  const [selectedSchools, setSelectedSchools] = useState<Array<Option<string>>>([])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: schoolData } = useGetUnassignedSchools(gisuId)
  const { usePostChapter } = useManagementMutations()
  const { mutate: postChapterMutate } = usePostChapter()
  const { register, handleSubmit, setValue } = useForm<{
    chapterName: string
    schoolIds: Array<string>
  }>({
    defaultValues: { chapterName: '', schoolIds: [] },
  })
  const handleSelectSchool = (option: Option<string>) => {
    setSelectedSchools((prev) => {
      if (prev.some((school) => school.id === option.id)) {
        return prev
      }
      const next = [...prev, option]
      setValue(
        'schoolIds',
        next.map((school) => String(school.id)),
      )
      return next
    })
  }

  const handleRemoveSchool = (id: Option<string>['id']) => {
    setSelectedSchools((prev) => {
      const next = prev.filter((school) => school.id !== id)
      setValue(
        'schoolIds',
        next.map((school) => String(school.id)),
      )
      return next
    })
  }

  const onSubmit = (data: { chapterName: string; schoolIds: Array<string> }) => {
    setSubmitError(null)
    postChapterMutate(
      {
        name: data.chapterName,
        schoolIds: data.schoolIds,
        gisuId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: managementKeys.getGisuChapterWithSchools(gisuId),
          })
          onClose()
        },
        onError: (error) => {
          setSubmitError(
            (error as { response?: { data?: { message?: string } } } | null)?.response?.data
              ?.message ?? '지부 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
          )
        },
      },
    )
  }

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="520px"
            minHeight={'500px'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>지부 생성</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <form
              onSubmit={handleSubmit(onSubmit)}
              css={{
                marginTop: '24px',
                gap: '30px',
                flex: 1,
                flexDirection: 'column',
                width: '100%',
                display: 'flex',
              }}
            >
              <LabelTextField
                type="text"
                autoComplete="none"
                label="지부 이름"
                necessary={true}
                placeholder="지부 이름을 입력하세요."
                {...register('chapterName')}
              />
              <LabelDropdown
                placeholder="해당 지부의 소속 학교를 선택하세요. (추후 추가 가능)"
                options={schoolData.result.schools.map((school) => ({
                  id: school.schoolId,
                  label: school.schoolName,
                }))}
                label="소속 학교"
                onChange={handleSelectSchool}
              />
              <Flex flexDirection="column" alignItems="flex-start" gap="8px">
                <Label label={`선택된 학교 (${selectedSchools.length}개)`} />
                {selectedSchools.length === 0 && (
                  <S.SelectedSchoolText>선택된 학교가 없습니다.</S.SelectedSchoolText>
                )}
                <Flex gap="8px" flexWrap="wrap">
                  {selectedSchools.map((school) => (
                    <S.SelectedSchoolTag key={school.id}>
                      {school.label}
                      <S.RemoveButton
                        type="button"
                        aria-label={`${school.label} 삭제`}
                        onClick={() => handleRemoveSchool(school.id)}
                      >
                        <Close width={12} color={theme.colors.gray[400]} />
                      </S.RemoveButton>
                    </S.SelectedSchoolTag>
                  ))}
                </Flex>
                {submitError ? (
                  <ErrorMessage
                    errorMessage={submitError}
                    typo="B4.Md"
                    responsiveTypo={{ tablet: 'B4.Md' }}
                  />
                ) : null}
              </Flex>

              <Modal.Footer>
                <S.FooterWrapper>
                  <Button typo="C3.Md" tone="gray" label="취소하기" onClick={onClose} />
                  <Button
                    type="submit"
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="생성하기"
                    css={{ width: 'fit-content', padding: '6px 18px' }}
                  />
                </S.FooterWrapper>
              </Modal.Footer>
            </form>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default AddBranchModal
