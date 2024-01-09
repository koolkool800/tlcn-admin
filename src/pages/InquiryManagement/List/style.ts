import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .table {
    margin-top: 16px;
  }

  .title {
    margin-bottom: 26px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;

  .filter {
    width: 100%;
  }

  .search {
    display: inline-flex;
  }

  .dropdown {
    display: inline-flex;
    min-width: 160px;
    margin-left: 8px;

    .ant-form-item {
      width: 100%;
    }
  }
`;

export { Wrapper, Filter };
