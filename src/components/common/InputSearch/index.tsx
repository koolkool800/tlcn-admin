import useDebounce from '@hooks/useDebounce';
import { Form } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import Input from '../Input';
import * as S from './style';

type Props = {
  placeholder?: string;
  defaultValue?: string;
  name?: string;
};
const InputSearch = ({
  placeholder = 'Search',
  defaultValue,
  name = 'keyword',
}: Props) => {
  const form = Form.useFormInstance();
  const debounce = useDebounce();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(defaultValue || '');
  }, []);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
    debounce(() => {
      form.setFieldsValue({
        [name]: e.target.value,
      });
      form.submit();
    });
  };
  return (
    <S.InputContainer>
      <Input
        value={searchValue}
        allowClear
        placeholder={placeholder}
        prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
        onChange={onChange}
      />
      <Form.Item noStyle name={name} style={{ marginBottom: 0 }}>
        <div style={{ display: 'none' }} />
      </Form.Item>
    </S.InputContainer>
  );
};

export default InputSearch;
