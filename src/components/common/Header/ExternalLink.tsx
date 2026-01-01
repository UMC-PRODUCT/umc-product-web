import styled from '@emotion/styled'
import { useState } from 'react'
import Flex from '../Flex/Flex'
import KakaoIcon from '@/assets/social/kakao-talk.svg?react'
import InstagramIcon from '@/assets/social/instagram.svg?react'
import YoutubeIcon from '@/assets/social/youtube.svg?react'
import { theme } from '@/styles/theme'
import { media } from '@/styles/media'
import Arrow from '@/assets/icons/arrow.svg?react'

const socialIconMap = {
  kakao: KakaoIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
} as const

const ChildLinks = styled(Flex)({
  gap: '12px',
  flexDirection: 'column',
  a: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: theme.colors.white,
    textDecoration: 'none',
  },
  [media.down('1120px')]: {
    gap: '8px',
    ...theme.typography.C4.Rg,
  },
  ...theme.typography.B4.Rg,
  svg: {
    width: '24px',
    height: '24px',
    [media.down('1120px')]: {
      width: '22px',
      height: '22px',
    },
  },
})

export const MenuItemWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const MenuItem = styled(Flex)({
  gap: '8px',
  cursor: 'pointer',
  flexDirection: 'row',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  flexWrap: 'nowrap',
  color: theme.colors.white,
  ...theme.typography.B3.Md,
  [media.down('1120px')]: {
    ...theme.typography.B4.Rg,
  },
  svg: {
    width: '20px',
    height: '20px',
    [media.down('1120px')]: {
      width: '16px',
      height: '16px',
    },
  },
})

export const SubMenu = styled.div({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '80px',
  right: '106px',
  gap: '10px',
  padding: '22px',
  borderRadius: 12,
  backgroundColor: theme.colors.gray[800],
  border: `1px solid ${theme.colors.gray[700]}`,
  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
  zIndex: 10,
  [media.down('1120px')]: {
    position: 'static',
    padding: '0',
    marginTop: '8px',
    boxShadow: 'none',
    width: '100%',
    flexWrap: 'wrap',
    border: 'none',
  },
})

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
      <MenuItemWrapper>
        <MenuItem onClick={() => handleToggle()}>
          외부 링크
          <Arrow
            css={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </MenuItem>
        {subLinks.length > 0 && isOpen && (
          <SubMenu>
            <ChildLinks alignItems="flex-start">
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
            </ChildLinks>
          </SubMenu>
        )}
      </MenuItemWrapper>
    </>
  )
}
