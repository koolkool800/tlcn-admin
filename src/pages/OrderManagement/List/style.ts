import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .table {
    margin-top: 16px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;

  .filter {
    width: 100%;

    .filter-status {
      width: 200px;
    }
  }

  .search {
    display: inline-flex;
    margin-bottom: 8px;
  }

  .dropdown {
    display: inline-flex;
    min-width: 160px;
    margin-left: 8px;

    .ant-form-item {
      width: 100%;
    }

    margin-bottom: 8px;
  }
`;

export { Wrapper, Filter };
