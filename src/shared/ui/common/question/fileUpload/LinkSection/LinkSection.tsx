import { useState } from 'react'

import ErrorIcon from '@/shared/assets/icons/notice.svg?react'
import { theme } from '@/shared/styles/theme'
import type { QuestionMode } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'

import LinkItem from '../LinkItem/LinkItem'
import * as S from './LinkSection.style'

type LinkSectionProps = {
  links: Array<string>
  mode: QuestionMode
  onLinksChange: (nextLinks: Array<string>) => void
}

const LinkSection = ({ links, mode, onLinksChange }: LinkSectionProps) => {
  const isEditable = mode === 'edit'
  const [linkInput, setLinkInput] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAddLink = () => {
    const trimmed = linkInput.trim()
    if (!trimmed) {
      return
    }
    if (!trimmed.startsWith('https://')) {
      setErrorMessage('링크 주소가 올바르지 않습니다.')
      return
    }
    setErrorMessage(null)
    onLinksChange([...links, trimmed])
    setLinkInput('')
  }

  const handleRemoveLink = (index: number) => {
    onLinksChange(links.filter((_, idx) => idx !== index))
  }

  const handleLinkInputChange = (next: string) => {
    if (errorMessage && (next === '' || next.startsWith('https://'))) {
      setErrorMessage(null)
    }
    setLinkInput(next)
  }

  const handleLinkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddLink()
    }
  }

  return (
    <S.InputWrapper>
      {links.map((link, i) => (
        <LinkItem key={i} value={link} mode={mode} onRemove={() => handleRemoveLink(i)} />
      ))}
      <S.LinkItemWrapper flexDirection="row" width="100%" gap={21} alignItems="center">
        <input
          placeholder="링크 붙여 넣기"
          value={linkInput}
          readOnly={!isEditable}
          onChange={isEditable ? (e) => handleLinkInputChange(e.target.value) : undefined}
          onKeyDown={isEditable ? handleLinkKeyDown : undefined}
          css={S.linkInputStyle(isEditable)}
        />
        <Button
          type="button"
          className="add-button"
          typo="B4.Md"
          tone="gray"
          label="항목 추가"
          disabled={!isEditable}
          onClick={isEditable ? handleAddLink : undefined}
          css={{ borderRadius: '20px' }}
        />
      </S.LinkItemWrapper>
      {errorMessage && (
        <Flex
          gap={2}
          alignItems="center"
          css={{ position: 'absolute', bottom: '6px', left: '12px' }}
        >
          <ErrorIcon width={14} color={theme.colors.necessary} />
          <ErrorMessage typo="C5.Md" errorMessage={errorMessage} />
        </Flex>
      )}
    </S.InputWrapper>
  )
}

export default LinkSection
