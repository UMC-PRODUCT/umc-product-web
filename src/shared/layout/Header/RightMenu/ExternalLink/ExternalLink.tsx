import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import Arrow from '@/shared/assets/icons/arrow.svg?react'
import InstagramIcon from '@/shared/assets/social/instagram.svg?react'
import KakaoIcon from '@/shared/assets/social/kakao-talk.svg?react'
import YoutubeIcon from '@/shared/assets/social/youtube.svg?react'
import Flex from '@/shared/ui/common/Flex/Flex'

import * as S from './ExternalLink.style'

const ExternalLink = ({
  subLinks,
}: {
  subLinks: {
    kakaoLink?: string
    instagramLink?: string
    youtubeLink?: string
  }
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleToggle()
    }
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
      handleToggle()
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const hasAnyLink = Boolean(subLinks.kakaoLink || subLinks.instagramLink || subLinks.youtubeLink)

  return (
    <>
      <S.MenuItemWrapper ref={cardRef}>
        <S.MenuItem
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          외부 링크
          <Arrow
            aria-hidden="true"
            css={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </S.MenuItem>
        {isOpen && (
          <S.SubMenu>
            <S.ChildLinks flexDirection="column" alignItems="flex-start">
              {!hasAnyLink && <span>연결된 외부 링크가 없습니다.</span>}
              {subLinks.kakaoLink && (
                <a href={subLinks.kakaoLink} target="_blank" rel="noreferrer noopener">
                  <Flex flexDirection="row" gap="6px" alignItems="center">
                    <KakaoIcon width={24} height={24} aria-hidden="true" />
                    카카오톡 채널
                  </Flex>
                </a>
              )}
              {subLinks.instagramLink && (
                <a href={subLinks.instagramLink} target="_blank" rel="noreferrer noopener">
                  <Flex flexDirection="row" gap="6px" alignItems="center">
                    <InstagramIcon width={24} height={24} aria-hidden="true" />
                    인스타그램
                  </Flex>
                </a>
              )}
              {subLinks.youtubeLink && (
                <a href={subLinks.youtubeLink} target="_blank" rel="noreferrer noopener">
                  <Flex flexDirection="row" gap="6px" alignItems="center">
                    <YoutubeIcon width={24} height={24} aria-hidden="true" />
                    유튜브
                  </Flex>
                </a>
              )}
            </S.ChildLinks>
          </S.SubMenu>
        )}
      </S.MenuItemWrapper>
    </>
  )
}

export default ExternalLink
