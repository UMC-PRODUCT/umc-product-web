import { useState } from 'react'
import Flex from '../../../Flex/Flex'
import * as S from './ExternalLink.style'
import KakaoIcon from '@/assets/social/kakao-talk.svg?react'
import InstagramIcon from '@/assets/social/instagram.svg?react'
import YoutubeIcon from '@/assets/social/youtube.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'

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
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <S.MenuItemWrapper>
        <S.MenuItem onClick={() => handleToggle()}>
          외부 링크
          <Arrow
            css={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </S.MenuItem>
        {subLinks.length > 0 && isOpen && (
          <S.SubMenu>
            <S.ChildLinks alignItems="flex-start">
              {subLinks.map((sub) => {
                const SocialIcon = socialIconMap[sub.icon]
                return (
                  <a
                    key={sub.label}
                    href={sub.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Flex gap="6px" alignItems="center">
                      <SocialIcon width={24} height={24} aria-hidden />
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
