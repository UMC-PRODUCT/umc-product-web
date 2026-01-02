import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import Arrow from '@/assets/icons/arrow.svg?react'
import InstagramIcon from '@/assets/social/instagram.svg?react'
import KakaoIcon from '@/assets/social/kakao-talk.svg?react'
import YoutubeIcon from '@/assets/social/youtube.svg?react'

import Flex from '../../../Flex/Flex'
import * as S from './ExternalLink.style'

const socialIconMap = {
  kakao: KakaoIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} as const

export default function ExternalLink({
  subLinks,
}: {
  subLinks: Array<{
    label: string
    link: string
    icon: 'kakao' | 'instagram' | 'youtube'
  }>
}) {
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
        {subLinks.length > 0 && isOpen && (
          <S.SubMenu>
            <S.ChildLinks direction="column" alignItems="flex-start">
              {subLinks.map((sub) => {
                const SocialIcon = socialIconMap[sub.icon]
                return (
                  <a
                    key={sub.label}
                    href={sub.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Flex direction="row" gap="6px" alignItems="center">
                      <SocialIcon width={24} height={24} aria-hidden="true" />
                      {sub.label}
                    </Flex>
                  </a>
                )
              })}
            </S.ChildLinks>
          </S.SubMenu>
        )}
      </S.MenuItemWrapper>
    </>
  )
}
