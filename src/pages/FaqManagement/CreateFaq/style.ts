import { styled } from 'styled-components';

export const NewFaqContainer = styled.div`
  h5 {
    text-align: left;
    margin-bottom: 16px;
  }
  .form-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .btn-submit {
    width: fit-content;
  }
  .ant-form-item-with-help.ant-form-item-has-error {
    color: red;
    .ant-row
      .ant-col
      .ant-form-item-control-input
      .ant-form-item-control-input-content {
      .select-category {
        border-color: #ff4d4f !important;
      }
    }
  }
`;
