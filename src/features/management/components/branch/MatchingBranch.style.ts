import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
  background-color: #000000;
  min-height: 100vh;
  color: #ffffff;
`

export const MainSection = styled.section`
  flex: 1;
`

export const Header = styled.div`
  margin-bottom: 30px;
`

export const BranchHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 16px;
    margin: 0;
    font-weight: 600;
  }
  span {
    font-size: 12px;
    color: ${theme.colors.gray[400]};
  }
`

export const SchoolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`

export const SchoolBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};

  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  gap: 5px;

  .school-name {
    flex: 1;
  }
  .delete-btn {
    cursor: pointer;
    border: none;
    background: none;
    background-color: ${theme.colors.necessary};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      min-width: 10px;
      min-height: 10px;
    }
  }
`

export const Sidebar = styled.aside`
  width: 320px;
`

export const WaitingBox = styled.div`
  position: sticky;
  top: 40px;
  background-color: ${theme.colors.gray[700]};
  border: 1.5px solid ${theme.colors.lime};
  border-radius: 20px;
  padding: 23px 30px;
  min-height: 400px;

  h2 {
    color: ${theme.colors.lime};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 0;
  }
  p {
    color: ${theme.colors.gray[400]};
    font-size: 12px;
    margin-bottom: 24px;
  }
`

export const WaitingItem = styled(SchoolBadge)`
  background-color: ${theme.colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`
