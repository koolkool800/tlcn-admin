import { Radio, RadioChangeEvent, RadioProps, Space } from 'antd';
import RadioButton from '../RadioButton';

interface RadioGroupProps extends RadioProps {
  options: { value: any; label: string }[];
  direction?: 'vertical' | 'horizontal' | undefined;
}
function RadioGroup({ options, direction, ...restProps }: RadioGroupProps) {
  return (
    <Radio.Group {...restProps}>
      <Space direction={direction}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Space>
    </Radio.Group>
  );
}

export default RadioGroup;
