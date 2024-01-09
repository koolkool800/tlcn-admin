import { styled } from 'styled-components';

export const Container = styled.div`
  h5 {
    text-align: left;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-form-item-has-error {
    .ant-form-item-control-input {
      border-color: #ff4d4f !important;
    }
    .ant-upload-select {
      border-color: #ff4d4f !important;
    }
  }
  .spin-loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
  }
  .action-container {
    display: flex;
    gap: 24px;
  }
  .select-item {
    width: 147px;
    transition: border 0.2s;

    &.ant-form-item-has-error {
      .cate-select {
        border-color: #ff4d4f !important;
        transition: border-color 0.2s;
      }
    }
  }
  .input-item {
    flex: 1;
  }
  .ant-upload-wrapper {
    display: block;
    height: 100%;
    width: 100%;
    cursor: pointer;
    .ant-upload.ant-upload-select {
      height: 100%;
      width: 100%;
      padding: 8px;
    }
  }
  .upload-img-container {
    .ant-form-item-margin-offset {
      margin-bottom: 0px !important;
    }
    .ant-form-item-control {
      height: 300px;
      justify-content: center;
      align-items: center;

      transition: border 0.2s;
      &:hover {
        border-color: unset;
        transition: border 0.2s;
      }
      .ant-form-item-control-input {
        width: 100%;
        height: 100%;
        border: 1px solid #a5adaa;
        border-radius: 14px;
        /* border-color: #ff4d4f; */
        transition: border 0.2s;
      }
    }

    .ant-form-item-control-input-content {
      height: 100%;
    }
    .ant-form-item-with-help {
    }

    .img-wrap {
      /* max-height: 300px; */
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 300px;
        height: 100%;
        object-fit: contain;
      }

      .upload-default {
        width: 352px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
      }
    }
  }

  .thumb-form-item {
    .ant-upload-select {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .ant-upload-select {
      height: 100%;
      width: fit-content;
      padding: 8px;
      border: 1px solid #a5adaa;
      border-radius: 14px;
    }
    .img-wrap {
      /* max-height: 300px; */
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 300px;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;
