import styled from 'styled-components';

export const Sidebar = styled.div`
  height: 100%;
`;

export const SidebarHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
`;

export const SidebarBody = styled.div`
  padding: 24px 12px;
  .ant-menu-inline .ant-menu-item,
  .ant-menu-vertical .ant-menu-item,
  .ant-menu-inline .ant-menu-submenu-title,
  .ant-menu-vertical .ant-menu-submenu-title {
    /* margin: 0; */
  }
  .ant-menu-item {
    width: 100%;
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-size: 16px;
  }
  .ant-menu-light,
  .ant-menu-light > .ant-menu {
    background-color: inherit;
  }
  .ant-menu-light .ant-menu-item-selected,
  .ant-menu-light > .ant-menu .ant-menu-item-selected {
    border-radius: 12px;
    background: rgba(83, 246, 198, 0.1);
    color: ${(props) => props.theme.colors.solid500};
  }
  .ant-menu-light:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover,
  .ant-menu-light
    > .ant-menu:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .ant-menu-light
    .ant-menu-item:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ),
  .ant-menu-light
    > .ant-menu
    .ant-menu-item:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ),
  .ant-menu-light
    .ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ),
  .ant-menu-light
    > .ant-menu
    .ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ) {
    color: ${(props) => props.theme.colors.surfaceMedium};
  }
`;
