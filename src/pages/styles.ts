import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;

  .header {
    /* background-color: #fff; */
    box-shadow: 0 0 28px 0 rgba(86, 61, 124, 0.13);
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
  }

  .sider {
    border-right: 1px solid rgba(0, 0, 0, 0.72);
    /* background: linear-gradient(
      180deg,
      rgba(13, 34, 28, 0.2) 0%,
      rgba(13, 34, 28, 0) 100%
    );
    backdrop-filter: blur(14px); */
    background: #161b22;
  }

  .ant-layout {
    height: 100%;
    /* background: linear-gradient(
      180deg,
      rgba(13, 34, 28, 0.2) 0%,
      rgba(13, 34, 28, 0) 100%
    );
    backdrop-filter: blur(14px); */
  }

  .ant-layout-header {
    padding: 8px 24px;
    min-height: 64px;
    height: auto;
    /* background: linear-gradient(
      180deg,
      rgba(13, 34, 28, 0.2) 0%,
      rgba(13, 34, 28, 0) 100%
    );
    backdrop-filter: blur(14px); */
    background: #161b22;
  }

  .content {
    padding: 24px 32px;
    overflow-y: auto;
    /* background: linear-gradient(
      180deg,
      rgba(13, 34, 28, 0.2) 0%,
      rgba(13, 34, 28, 0) 100%
    );
    backdrop-filter: blur(14px); */
    background: #0d1117;
  }
`;
