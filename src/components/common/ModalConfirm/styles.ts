import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  .ant-modal-content {
    min-width: 582px;
    max-width: 100%;
    padding: 40px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.neutral800};
    .ant-modal-close {
      right: 24px;
      top: 24px;
      inset-inline-end: 24px;
      width: 40px;
      height: 40px;
    }
    .ant-modal-header {
      background-color: inherit;
      border-radius: unset;
    }
  }
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  text-align: center;
  .success-img {
    img {
      width: 64px;
      height: 64px;
    }
  }
  .content-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    text-align: center;
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    h5 {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;
