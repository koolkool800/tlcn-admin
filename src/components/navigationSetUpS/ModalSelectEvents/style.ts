import { Modal } from 'antd';
import { styled } from 'styled-components';

export const ModalStyle = styled(Modal)`
  h5 {
    margin-bottom: 20px;
  }
  .ant-modal-content {
    background-color: #030f0b;
    width: fit-content;
    .ant-modal-body {
      width: fit-content;
      .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
        justify-content: center;
      }
    }
  }
`;
export const ModalContent = styled.div`
  width: 100%;
  h5 {
    margin-bottom: 20px;
  }
  .btn-Change {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
