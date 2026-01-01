import { Link, useRouterState } from '@tanstack/react-router'
import Flex from '../Flex/Flex'
import { theme } from '@/styles/theme'

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
    <nav>
      <Flex
        direction="row"
        gap="48px"
        css={{ color: 'white', cursor: 'pointer' }}
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
