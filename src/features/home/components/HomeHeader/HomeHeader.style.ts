import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

import { homeResponsiveFont, homeResponsiveSpace } from '../../pages/styles/HomePage.common.style'

export const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(22, 22, 22, 0.8);
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

export const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  ${homeResponsiveSpace('padding: 24px 60px;', 'padding: 20px 32px;', 'padding: 16px 20px;')}
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.button`
  ${homeResponsiveFont('24px', '22px', '20px')}
  font-weight: 800;
  color: ${theme.colors.white};
  letter-spacing: -0.5px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;
  display: flex;
  align-items: center;
  width: 70px;
  ${media.down(theme.breakPoints.tablet)} {
    width: 60px;
  }
  ${media.down(theme.breakPoints.mobile)} {
    width: 40px;
  }
  svg {
    width: 100%;
  }
`

export const NavLinks = styled.ul`
  display: flex;
  ${homeResponsiveSpace('gap: 48px;', 'gap: 30px;', 'gap: 18px;')}
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
`

export const NavLink = styled.button`
  color: ${theme.colors.gray[400]};
  text-decoration: none;
  ${homeResponsiveFont('15px', '14px', '10px')}
  font-weight: 500;
  transition: color 0.3s;
  background: none;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;

  &:hover {
    color: ${theme.colors.white};
  }
`

export const ApplyButton = styled.button`
  background: ${theme.colors.lime};
  color: ${theme.colors.black};
  ${homeResponsiveSpace('padding: 10px 12px;', 'padding: 9px 10px;', 'padding: 8px 8px;')}
  border-radius: 8px;
  font-weight: 700;
  ${homeResponsiveFont('14px', '13px', '12px')}
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(149, 239, 75, 0.3);
  }
  ${media.down(theme.breakPoints.tablet)} {
    display: none;
  }
`
