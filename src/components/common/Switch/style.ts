import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  .ant-form-item-control-input {
    min-height: unset;
  }
  .ant-switch {
    &:hover {
      background-color: ${(props) => props.theme.colors.surfaceDark};
    }
  }
  .ant-switch-checked {
    background-color: ${(props) =>
      props.theme.colors.solidBrightGreenNetrual} !important;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.solidBrightGreenNetrual};
    }
  }
  button {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    border-radius: 8.4px;
  }
  .ant-switch-handle {
    &::before {
      border-radius: 6.3px;
      background-color: ${(props) => props.theme.colors.black};
    }
  }
`;
