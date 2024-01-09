import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .containerInfoEvent {
    display: flex;
  }
  .container-button-submit {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .container-svg {
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
      transform: scale(0.5);
      text-align: center;
      position: absolute;
    }
  }
  .ant-upload-list-item-actions {
    display: none;
  }
  .formItem-svg {
    .ant-upload-list-item-name {
      color: white;
    }
  }
  .container-platform-fee {
    display: flex;
    gap: 10px;
  }
  .container-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-upload img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-svg button {
    display: flex;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload.ant-upload-select,
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload.ant-upload-select {
    width: 100% !important;
    height: 100% !important;
  }
`;

export { Wrapper };
