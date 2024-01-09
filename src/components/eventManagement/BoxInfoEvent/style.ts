import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary510};
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  .container-box {
    p {
      margin-top: 20px;
    }
  }
`;
