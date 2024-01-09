import type { DatePickerProps } from 'antd';
import { DatePicker, Form } from 'antd';
import { Rule } from 'antd/es/form';
import { Calendar } from 'iconsax-react';
import * as S from './style';

interface DateType {
  name: string;
  label?: string;
  mb?: string;
  rules?: Rule[];
}

function DatePickerCustom({
  name,
  label,
  mb,
  rules,
  ...restProps
}: DateType & DatePickerProps) {
  const nameForm = Form.useWatch(name);
  return (
    <S.Wrapper>
      <Form.Item
        label={label}
        name={name}
        required
        style={{ marginBottom: mb }}
        rules={rules}
      >
        <DatePicker
          {...restProps}
          bordered={false}
          suffixIcon={!nameForm ? <Calendar /> : null}
        />
      </Form.Item>
    </S.Wrapper>
  );
}

export default DatePickerCustom;
