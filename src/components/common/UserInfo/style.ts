import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.emphasisDarkSurfaceHigh};

  font-size: 1.5rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownContainer = styled.div`
  transform: translateY(14px);
  .ant-dropdown-menu {
    background-color: ${(props) => props.theme.colors.neutral900};
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    .ant-dropdown-menu-item {
      height: 40px;
      border-radius: 14px;
      &:hover {
        background-color: #2b2b2b;
        transition: all ease-out 0.2s;
      }
    }
  }
`;

export const NavLinkMenu = styled(NavLink)`
  color: ${(props) => props.theme.colors.surfaceHight} !important;
  font-family: ${(props) => props.theme.font.variable};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
