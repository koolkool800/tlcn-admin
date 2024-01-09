import { Form } from 'antd';
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
    margin-bottom: 30px;
  }

  .dropdown {
    display: inline-flex;
    min-width: 160px;
    margin-left: 8px;

    .ant-form-item {
      width: 100%;
    }
  }

  .table {
    margin-top: 16px;
  }
`;

const CustomForm = styled(Form)`
  margin-top: 26px;
`;

export { Wrapper, CustomForm };
