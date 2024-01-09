import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .filter {
    margin-top: 26px;
    width: 100%;

    display: flex;
    gap: 60px;

    .search {
      width: 292px;
    }
    .status {
      width: 92px;
    }
  }

  .table {
    margin-top: 16px;
  }
`;

export { Wrapper };
