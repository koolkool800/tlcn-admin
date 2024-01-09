import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .filter {
    margin-top: 26px;
    width: 100%;
  }

  .search {
    display: inline-flex;
  }

  .dropdown {
    display: inline-flex;
    min-width: 112px;
    margin-left: 8px;

    .ant-form-item {
      width: 100%;
    }
  }

  .table {
    margin-top: 16px;
  }
`;

const Filter = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { Wrapper, Filter };
