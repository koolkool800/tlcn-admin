import { InputNumberProps } from 'antd';
import * as S from './style';

interface Props extends InputNumberProps {
  placeholder: string;
}
const InputNumber = ({ type = 'input', placeholder, ...restProps }: Props) => {
  return <S.InputAnt {...restProps} placeholder={placeholder} />;
};

export default InputNumber;
