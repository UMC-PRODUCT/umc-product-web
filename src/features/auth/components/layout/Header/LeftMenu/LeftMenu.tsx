import { useRouterState } from '@tanstack/react-router'

import * as S from './LeftMenu.style'

const LeftMenu = ({
  children,
}: {
  children?: Array<{
    label: string
    link: string
  }>
}) => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <S.Container>
      <S.MenuList>
        {children?.map((child) => {
          const isActive =
            child.link === '/' ? currentPath === '/' : currentPath.startsWith(child.link)
          return (
            <S.MenuLink key={child.label} to={child.link} $active={isActive}>
              {child.label}
            </S.MenuLink>
          )
        })}
      </S.MenuList>
    </S.Container>
  )
}

export default LeftMenu
