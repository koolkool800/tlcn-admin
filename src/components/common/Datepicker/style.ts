import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  input {
    color: white !important;
    opacity: 0.5;
    width: 100%;
    &::placeholder {
      color: white !important;
      font-weight: 500 !important;
      opacity: 0.5 !important;
    }
  }
  .ant-picker {
    width: 100%;
    height: 40px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.surfaceDark} !important;
    border: 1px solid ${(props) => props.theme.colors.surfaceMedium} !important;
    .ant-picker-suffix {
      color: ${(props) => props.theme.colors.white} !important;
    }
    .ant-picker-clear {
      background: transparent !important;
      path {
        fill: ${(props) => props.theme.colors.white};
      }
    }
  }
`;
