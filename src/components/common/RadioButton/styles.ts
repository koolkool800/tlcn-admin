import { styled } from 'styled-components';

export const RadioItem = styled.div`
  padding: 6px;
  .ant-radio-wrapper {
    margin-inline-end: 0;
    span.ant-radio + * {
      padding-inline-start: 7px;
      padding-inline-end: 0;
      color: ${(props) => props.theme.colors.surfaceHight};
    }
  }
  .ant-radio-wrapper .ant-radio-inner {
    height: 20px;
    width: 20px;
    background-color: #121212;
    border-color: #717171;
    &::after {
      width: 20px;
      height: 20px;
      margin-block-start: -10px;
      margin-inline-start: -10px;
      background-color: #121212;
    }
  }
  .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
    background-color: ${(props) => props.theme.colors.primary500};
    border-color: ${(props) => props.theme.colors.primary500};
  }
  .ant-radio-wrapper {
    &:hover {
      .ant-radio-inner {
        border-color: ${(props) => props.theme.colors.primary500};
      }
    }
  }
`;
