import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  h5 {
    text-align: left;
  }
  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    .btn-approve {
      max-width: 200px;
    }
  }
`;
