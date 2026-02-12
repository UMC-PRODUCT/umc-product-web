import type { UseFormRegisterReturn } from 'react-hook-form'

import Plus from '@/shared/assets/icons/plus.svg?react'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import LinkDropdown from '@/shared/ui/form/LinkDropdown/LinkDropdown'
import LinkInput from '@/shared/ui/form/LinkInput/LinkInput'

import { LINK_TYPE_OPTIONS } from '../../../domain/schoolConstants'
import * as S from './EditSchoolModal.style'

type ExternalLinkEditorProps = {
  isOpen: boolean
  mode: 'add' | 'edit'
  linkTitleValue: string
  linkUrlValue: string
  linkType: Option<string> | null
  onToggleOpen?: () => void
  onLinkTypeChange: (option: Option<string> | null) => void
  onSubmit: () => void
  onCancel: () => void
  linkTitleField: UseFormRegisterReturn
  linkUrlField: UseFormRegisterReturn
}

const ExternalLinkEditor = ({
  isOpen,
  mode,
  linkTitleValue,
  linkUrlValue,
  linkType,
  onToggleOpen,
  onLinkTypeChange,
  onSubmit,
  onCancel,
  linkTitleField,
  linkUrlField,
}: ExternalLinkEditorProps) => {
  const isAddMode = mode === 'add'
  const isDisabled = !linkTitleValue.trim() || !linkUrlValue.trim() || (isAddMode && !linkType)

  if (!isOpen && isAddMode) {
    return (
      <S.AddLink onClick={onToggleOpen}>
        <span>
          <Plus color="currentColor" width={20} height={20} />
        </span>
        링크 추가
      </S.AddLink>
    )
  }

  return (
    <Flex flexDirection="column" gap={8}>
      <Flex gap={8}>
        <LinkInput label="링크 제목" placeholder="링크의 제목을 입력하세요." {...linkTitleField} />
        {isAddMode ? (
          <LinkDropdown options={LINK_TYPE_OPTIONS} value={linkType} onChange={onLinkTypeChange} />
        ) : null}
      </Flex>
      <LinkInput label="URL" placeholder="URL 주소를 입력하세요." {...linkUrlField} />
      <Flex gap={8} justifyContent="flex-end" css={{ marginTop: '8px' }}>
        <Button
          tone="gray"
          typo="C5.Md"
          label="닫기"
          css={{ height: '25px', width: '65px' }}
          onClick={onCancel}
        />
        <Button
          tone="lime"
          typo="C5.Md"
          label={isAddMode ? '링크 등록' : '링크 수정'}
          css={{ height: '25px', width: '65px' }}
          disabled={isDisabled}
          onClick={onSubmit}
        />
      </Flex>
    </Flex>
  )
}

export default ExternalLinkEditor
