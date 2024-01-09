import { Radio, RadioProps } from 'antd';
import * as S from './styles';

interface RadioButtonProp extends RadioProps {
  value: any;
  label: any;
}

function RadioButton({ value, label, ...restProps }: RadioButtonProp) {
  return (
    <S.RadioItem>
      <Radio value={value} {...restProps}>
        {label}
      </Radio>
    </S.RadioItem>
  );
}

export default RadioButton;
