import { useEditSchoolModalLogic } from '@/features/management/hooks/useEditSchoolModalLogic'
import Close from '@/shared/assets/icons/close.svg?react'
import Edit from '@/shared/assets/icons/edit.svg?react'
import DefaultSchool from '@/shared/assets/icons/school.svg'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './EditSchoolModal.style'
import ExternalLinkEditor from './ExternalLinkEditor'

const EditSchoolModal = ({ onClose, schoolId }: { onClose: () => void; schoolId: string }) => {
  const {
    isOpen,
    setIsOpen,
    schoolDetails,
    isLoading,
    fileInputRef,
    profilePreview,
    isUploading,
    links,
    editingIndex,
    openAddLink,
    linkType,
    setLinkType,
    linkTitleValue,
    linkUrlValue,
    linkTitleField,
    linkUrlField,
    register,
    isDeleteLoading,
    isPatchLoading,
    handleFileInputChange,
    handleFileWrapperClick,
    handleStartAddLink,
    handleStartEditLink,
    handleSubmitLink,
    handleRemoveLink,
    handleCancelLinkEditor,
    handleDeleteSchool,
    handleSave,
  } = useEditSchoolModalLogic(schoolId, onClose)

  return (
    <Modal.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) onClose()
      }}
    >
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="520px"
            height={'fit-content'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>학교 정보 수정</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>

            {isLoading || !schoolDetails ? (
              <Flex justifyContent="center" alignItems="center" css={{ padding: '32px 0' }}>
                <SuspenseFallback label="학교 정보를 불러오는 중입니다." />
              </Flex>
            ) : (
              <>
                <Section height="fit-content" variant="solid" css={{ marginTop: '16px' }}>
                  <Flex alignItems="center" justifyContent="center" gap={25}>
                    <S.ModalButton type="button" onClick={handleFileWrapperClick}>
                      <img
                        src={profilePreview ?? schoolDetails.result.logoImageUrl ?? DefaultSchool}
                        alt="학교 이미지"
                        css={{
                          borderRadius: '50%',
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          maxWidth: '100px',
                          maxHeight: '100px',
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                        }}
                      />
                    </S.ModalButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      hidden
                      onChange={(event) => handleFileInputChange(event.target.files)}
                    />
                    <Flex flexDirection="column" alignItems="flex-start">
                      <Flex alignItems="center" gap={20}>
                        <S.Name>{schoolDetails.result.schoolName}</S.Name>
                        <S.Status>
                          <S.Circle />
                          활성
                        </S.Status>
                      </Flex>
                      <S.SubInfo>{schoolDetails.result.remark}</S.SubInfo>
                    </Flex>
                  </Flex>
                </Section>

                <Flex flexDirection="column">
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>학교명</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="학교명을 입력해주세요"
                      {...register('schoolName')}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>비고</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="비고 (선택)"
                      {...register('remark')}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={12}>
                    <S.Title>외부 링크</S.Title>

                    <S.LinkPreviewList>
                      {links.map((link, index) =>
                        editingIndex === index ? (
                          <ExternalLinkEditor
                            key={`${link.type}-${link.url}-${index}`}
                            isOpen
                            mode="edit"
                            linkTitleValue={linkTitleValue}
                            linkUrlValue={linkUrlValue}
                            linkType={linkType}
                            onLinkTypeChange={setLinkType}
                            onSubmit={handleSubmitLink}
                            onCancel={handleCancelLinkEditor}
                            linkTitleField={linkTitleField}
                            linkUrlField={linkUrlField}
                          />
                        ) : (
                          <S.LinkPreviewItem key={`${link.type}-${link.url}-${index}`}>
                            <Flex gap={4} flexDirection="column" alignItems="flex-start">
                              <S.LinkTitleText>{link.title}</S.LinkTitleText>
                              <S.LinkUrlText>{link.url}</S.LinkUrlText>
                            </Flex>
                            <Flex width={'fit-content'} gap={14}>
                              <S.ModalButton
                                type="button"
                                aria-label="링크 수정"
                                onClick={() => handleStartEditLink(index)}
                              >
                                <Edit color={theme.colors.gray[400]} />
                              </S.ModalButton>
                              <S.ModalButton
                                type="button"
                                aria-label="링크 삭제"
                                onClick={() => handleRemoveLink(index)}
                              >
                                <Close color={theme.colors.gray[400]} width={20} />
                              </S.ModalButton>
                            </Flex>
                          </S.LinkPreviewItem>
                        ),
                      )}
                    </S.LinkPreviewList>

                    <ExternalLinkEditor
                      isOpen={openAddLink}
                      mode="add"
                      linkTitleValue={linkTitleValue}
                      linkUrlValue={linkUrlValue}
                      linkType={linkType}
                      onToggleOpen={handleStartAddLink}
                      onLinkTypeChange={setLinkType}
                      onSubmit={handleSubmitLink}
                      onCancel={handleCancelLinkEditor}
                      linkTitleField={linkTitleField}
                      linkUrlField={linkUrlField}
                    />
                  </Flex>
                </Flex>
              </>
            )}

            <Modal.Footer>
              <S.FooterWrapper>
                <Button
                  typo="C3.Md"
                  tone="necessary"
                  label="학교 삭제"
                  isLoading={isDeleteLoading}
                  disabled={isPatchLoading}
                  onClick={handleDeleteSchool}
                />
                <Flex gap={8} width={'fit-content'}>
                  <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                  <Button
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="저장하기"
                    css={{ width: 'fit-content', padding: '6px 18px' }}
                    disabled={isPatchLoading || isDeleteLoading}
                    onClick={handleSave}
                  />
                </Flex>
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default EditSchoolModal
