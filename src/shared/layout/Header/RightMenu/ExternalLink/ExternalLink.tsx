import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { ExternalLink as ExternalLinkType } from '@/features/auth/domain/types'
import Arrow from '@/shared/assets/icons/arrow.svg?react'
import Setting from '@/shared/assets/icons/setting.svg?react'
import InstagramIcon from '@/shared/assets/social/instagram.svg?react'
import KakaoIcon from '@/shared/assets/social/kakao-talk.svg?react'
import YoutubeIcon from '@/shared/assets/social/youtube.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { UMC_CENTRAL_LINKS } from '@/shared/constants/umc'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'
import ExternalLinkModal from '@/shared/ui/modals/ExternalLinkModal'

import * as S from './ExternalLink.style'

const iconByType: Record<LinkType, typeof KakaoIcon> = {
  KAKAO: KakaoIcon,
  INSTAGRAM: InstagramIcon,
  YOUTUBE: YoutubeIcon,
}

const ExternalLink = ({ subLinks }: { subLinks: Array<ExternalLinkType> }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { role } = useUserProfileStore()
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
        {isOpen && (
          <S.SubMenu>
            <S.ChildLinks flexDirection="column" alignItems="flex-start">
              {UMC_CENTRAL_LINKS.map((link) => (
                <a key={link.title} href={link.url} target="_blank" rel="noreferrer noopener">
                  <Flex flexDirection="row" gap="6px" alignItems="center">
                    {(() => {
                      const Icon = iconByType[link.type as LinkType]
                      return <Icon width={24} height={24} aria-hidden="true" />
                    })()}
                    {link.title}
                  </Flex>
                </a>
              ))}
              <hr css={{ width: '100%', border: `0.5px solid ${theme.colors.gray[600]}` }} />
              {subLinks.map((link) => {
                const Icon = iconByType[link.type]
                return (
                  <a
                    key={`${link.type}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Flex flexDirection="row" gap="6px" alignItems="center">
                      <Icon width={24} height={24} aria-hidden="true" />
                      {link.title}
                    </Flex>
                  </a>
                )
              })}

              {role?.roleType === 'SCHOOL_PRESIDENT' ||
              role?.roleType === 'SCHOOL_VICE_PRESIDENT' ||
              role?.roleType === 'SCHOOL_PART_LEADER' ||
              role?.roleType === 'SCHOOL_ETC_ADMIN' ? (
                <>
                  <hr css={{ width: '100%', border: `0.5px solid ${theme.colors.gray[600]}` }} />
                  <S.SettingButton type="button" onClick={() => setModalOpen(true)}>
                    <Setting />
                    <span className="setting">외부 링크 관리하기</span>
                  </S.SettingButton>
                </>
              ) : null}
            </S.ChildLinks>
          </S.SubMenu>
        )}
        {modalOpen && <ExternalLinkModal onClose={() => setModalOpen(false)} />}
      </S.MenuItemWrapper>
    </>
  )
}

export default ExternalLink
