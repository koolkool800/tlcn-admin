import styled from 'styled-components';

export const Wrapper = styled.div`
  width: fit-content;
  display: inline;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  .ant-modal-content {
    background-color: ${(props) => props.theme.colors.neutral800};
    padding: 40px 100px 56px;
    .form-report-container {
      .detail {
        margin-bottom: 28px;
        .label {
          font-size: 15px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0em;
          text-align: left;
          color: ${(props) => props.theme.colors.surfaceHight};
          margin-bottom: 12px;
        }
        p {
          color: ${(props) => props.theme.colors.surfaceMedium};
        }
      }

      .list-upload {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .item-upload {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            svg {
              cursor: pointer;
            }
          }
        }
        .item-name {
          color: ${(props) => props.theme.colors.surfaceMedium};
        }
      }
      .ant-upload-list-text {
        display: none;
      }
    }
  }

  .ant-modal-close {
    height: 33px;
    width: 33px;
  }
  .ant-modal-header {
    background-color: inherit;
  }
  .btn-wrap {
    button {
      span {
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
  }
  .ant-upload-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 100%;
  }
  .wrap-review {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    border-radius: 14px;
    border: 1px dashed ${(props) => props.theme.colors.surfaceHight};

    .upload-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: ${(props) => props.theme.colors.surfaceMedium};
    }
  }
`;
