import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import styled from '@emotion/styled'
import Badge from '../Badge/Badge'
import Flex from '../Flex/Flex'
import Icon from '@/assets/icons/profile.svg?react'
import Close from '@/assets/icons/close.svg?react'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export default function Profile({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // 추후 수정 예정
  const school = '중앙대학교'
  const rights = '총괄'
  const name = '성이름'
  const nickname = '닉넴'
  const email = 'umc1234'

  const handleLogout = () => {
    // 로그아웃 로직 추가 예정
    navigate({
      to: '/auth/login',
    })
  }
  return (
    <>
      <Icon
        css={{
          borderRadius: '100%',
          cursor: 'pointer',
          width: 40,
          [media.down(theme.breakPoints.tablet)]: {
            width: 19,
          },
        }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <Modal>
          <Close
            width={22}
            css={{ position: 'absolute', top: 16, right: 16 }}
          />
          <Flex gap="12px">
            <Icon
              css={{
                borderRadius: '100%',
                cursor: 'pointer',
                width: 46,
                minWidth: 46,
                [media.down(theme.breakPoints.tablet)]: {
                  width: 40,
                  minWidth: 40,
                },
              }}
            />
            <Flex direction="column" alignItems="flex-start" gap="4px">
              <span
                css={{
                  color: theme.colors.white,
                  ...theme.typography.B3.Md,
                  [media.down(theme.breakPoints.tablet)]: {
                    ...theme.typography.B4.Md,
                  },
                }}
              >
                {nickname}/{name}
              </span>
              <span
                css={{
                  color: theme.colors.gray[300],
                  ...theme.typography.B4.Rg,
                  [media.down(theme.breakPoints.tablet)]: {
                    ...theme.typography.B5.Rg,
                  },
                }}
              >
                {email}
              </span>
            </Flex>
          </Flex>
          <Flex direction="column" gap="12px">
            <Flex
              gap="10px"
              css={{ color: theme.colors.gray[300], ...theme.typography.B4.Rg }}
            >
              <Badge content="소속" tone="gray" variant="solid" typo="H5.Md" />
              {school}
            </Flex>
            <Flex
              gap="10px"
              css={{ color: theme.colors.gray[300], ...theme.typography.B4.Rg }}
            >
              <Badge content="권한" tone="gray" variant="solid" typo="H5.Md" />
              {rights}
            </Flex>
          </Flex>
          {children && <MobileOnly>{children}</MobileOnly>}
          <Flex
            justifyContent="center"
            css={{
              color: theme.colors.white,
              textDecoration: 'underline',
              ...theme.typography.B5.Rg,
            }}
            onClick={handleLogout}
          >
            로그아웃
          </Flex>
        </Modal>
      )}
    </>
  )
}

const Modal = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 10px;
  width: 232px;
  ${media.down(theme.breakPoints.tablet)} {
    width: 212px;
    top: 50px;
  }
  padding: 16px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`

const MobileOnly = styled.div`
  display: none;
  ${media.down('1120px')} {
    display: block;
  }
`
