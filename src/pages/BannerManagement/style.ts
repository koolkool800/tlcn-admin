import { styled } from 'styled-components';

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h5 {
    text-align: left;
  }
  .action-btns {
    display: flex;
    gap: 16px;
  }
  .tabs-container {
    .ant-tabs-nav-list {
    }
    .ant-tabs-tab {
      text-align: center;
      width: 400px;
      width: 50%;
    }
    .ant-tabs-nav-operations {
      display: none;
    }
  }
`;
