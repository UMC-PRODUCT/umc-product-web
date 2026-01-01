import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import Flex from '@/components/common/Flex/Flex'
import Profile from '@/assets/icons/profile.svg?react'
import Arrow from '@/assets/icons/arrow.svg?react'
import ArrowUp from '@/assets/icons/arrow_up.svg?react'
import { media } from '@/styles/media'

const StyleFlex = styled('div')`
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
  color: ${theme.colors.white};
  ${media.down(theme.breakPoints.desktop)} {
    display: none;
  }
  ${theme.typography.B3.Md};
`

export default function RightMenu({
  children,
}: {
  children?: Array<{
    label: string
    onClick: () => void
    icon: 'arrow' | 'arrowUp'
  }>
}) {
  return (
    <nav css={{ display: 'flex', alignItems: 'center', gap: '49px' }}>
      <StyleFlex>
        {children?.map((child) => (
          <Flex
            key={child.label}
            onClick={child.onClick}
            gap="4px"
            css={{
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
            }}
          >
            {child.label}
            {child.icon === 'arrow' ? (
              <Arrow width={18} height={18} />
            ) : (
              <ArrowUp width={35} height={35} />
            )}
          </Flex>
        ))}
      </StyleFlex>
      <Profile
        width={32}
        height={32}
        css={{
          borderRadius: '50%',
          cursor: 'pointer',
          minWidth: 32,
          minHeight: 32,
        }}
      />
    </nav>
  )
}
