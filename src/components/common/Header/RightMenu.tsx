import styled from '@emotion/styled'
import Profile from './Profile'
import Flex from '@/components/common/Flex/Flex'
import Arrow from '@/assets/icons/arrow.svg?react'
import ArrowUp from '@/assets/icons/arrow_up.svg?react'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

const StyleFlex = styled('div')`
  display: flex;
  align-items: center;
  gap: 32px;
  justify-content: center;
  ${media.down('1120px')} {
    display: none;
  }
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
  const Children = (
    <Flex
      css={{
        gap: '32px',
        [media.down('1120px')]: {
          gap: '8px',
          flexDirection: 'column',
        },
      }}
    >
      {children?.map((child) => (
        <Flex
          key={child.label}
          onClick={child.onClick}
          css={{
            gap: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            color: theme.colors.white,
            ...theme.typography.B3.Md,
            [media.down('1120px')]: {
              ...theme.typography.B5.Rg,
            },
          }}
        >
          {child.label}
          {child.icon === 'arrow' ? (
            <Arrow height={18} />
          ) : (
            <ArrowUp height={18} />
          )}
        </Flex>
      ))}
    </Flex>
  )

  return (
    <nav
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: '49px',
        height: 'fit-content',
      }}
    >
      <StyleFlex>{Children}</StyleFlex>
      <Profile children={Children} />
    </nav>
  )
}
