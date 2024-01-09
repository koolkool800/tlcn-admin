import styled from 'styled-components';

export const WrapperItem = styled.div`
  .title {
    font-size: 16px;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.bold};
    color: ${(props) => props.theme.colors.white} !important;
  .paragraph {
    span {
      margin: 20px 0;
      font-family: ${(props) => props.theme.font.bold};
    }
  }
`;
