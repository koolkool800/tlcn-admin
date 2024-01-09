import styled from 'styled-components';

export const Wrapper = styled.div`
  .ant-input {
    /* border-color: transparent !important; */
    font-size: 15px;
    line-height: 20px;
    border-radius: 14px;
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceSmall};
    background-color: ${(props) => props.theme.colors.surfaceDark};
    padding-top: 10px;
    &::placeholder {
      color: ${(props) => props.theme.colors.surfaceSmall};
    }
  }

  textarea {
    border: 1px solid #a5adaa !important;
  }
`;
