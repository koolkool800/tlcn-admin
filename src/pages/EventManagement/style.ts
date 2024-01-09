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
    margin-bottom: 8px;
  }

  .dropdown {
    display: inline-flex;
    min-width: 112px;
    margin-left: 8px;

    .ant-form-item {
      width: 100%;
    }
    margin-bottom: 8px;
  }

  .table {
    margin-top: 16px;
  }
`;

export { Wrapper };
