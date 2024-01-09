import { styled } from 'styled-components';

export const TabsWrap = styled.div`
  width: 100%;
  .ant_tabs {
    width: 100%;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 24px;
  }
  .ant-tabs-nav-wrap {
    width: 100%;
  }
  .ant-tabs-nav-list {
    /* gap: 12px; */
    width: 100%;
  }
  .ant-tabs-tab {
    width: 100%;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.primarySolid500};
  }
  .ant-tabs .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 0 20px;
    margin: 0 auto;
    flex: 1;
    width: 50%;
  }
  .ant-tabs-top > .ant-tabs-nav::before {
    border-color: transparent;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: ${(props) => props.theme.colors.primarySolid500};
  }
`;
