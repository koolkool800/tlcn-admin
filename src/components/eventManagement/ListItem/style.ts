import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  .container-item {
    display: flex;
    align-items: center;
    min-width: 400px;
    .item {
      min-width: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
      color: ${(props) => props.theme.colors.white};
    }
  }
`;
