import { Link, useRouterState } from '@tanstack/react-router'
import Flex from '../Flex/Flex'
import { theme } from '@/styles/theme'
import { media } from '@/styles/media'

export default function LeftMenu({
  children,
}: {
  children?: Array<{
    label: string
    link: string
  }>
}) {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <nav css={{ flex: 1, display: 'flex' }}>
      <Flex
        direction="row"
        css={{
          color: 'white',
          cursor: 'pointer',
          gap: '48px',
          [media.down(theme.breakPoints.desktop)]: {
            gap: '38px',
          },
          [media.down(theme.breakPoints.tablet)]: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            gap: '0px',
            maxWidth: '503px',
          },
        }}
      >
        {children?.map((child) => {
          const isActive = currentPath.startsWith(child.link)
          return (
            <Link
              key={child.label}
              to={child.link}
              css={{
                color: isActive ? theme.colors.lime : theme.colors.white,
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap',
                ...theme.typography.H4.Sb,
                [media.down(theme.breakPoints.desktop)]: {
                  ...theme.typography.H4.Md,
                },
                [media.down(theme.breakPoints.tablet)]: {
                  ...theme.typography.H5.Md,
                },
              }}
            >
              {child.label}
            </Link>
          )
        })}
      </Flex>
    </nav>
  )
}
