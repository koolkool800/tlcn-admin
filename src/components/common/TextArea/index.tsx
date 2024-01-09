import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { TextAreaProps } from 'antd/es/input';
import * as S from './style';

const { TextArea } = Input;

interface Props extends TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: Rule[];
}

function TextAreaCustom(props: Props) {
  const {
    name,
    label,
    rows = 4,
    placeholder = 'Enter more detail about the trade preferred area',
    rules,
    required,
    ...rest
  } = props;
  return (
    <S.Wrapper>
      <Form.Item
        name={name}
        label={label}
        rules={rules || []}
        required={required}
      >
        <TextArea
          {...rest}
          bordered={false}
          rows={rows}
          placeholder={placeholder}
        />
      </Form.Item>
    </S.Wrapper>
  );
}

export default TextAreaCustom;
