import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

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
  padding: 24px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 20px 32px;
  }
`

export const Logo = styled.button`
  font-size: 24px;
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
`

export const NavLinks = styled.ul`
  display: flex;
  gap: 48px;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;

  ${media.down(theme.breakPoints.tablet)} {
    display: none;
  }
`

export const NavLink = styled.button`
  color: ${theme.colors.gray[400]};
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.3s;
  background: none;
  border: none;
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
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
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
`
