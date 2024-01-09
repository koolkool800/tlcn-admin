import { CheckboxProps } from 'antd';
import * as S from './style';

type Props = CheckboxProps;

const Checkbox = ({ children, ...restProps }: Props) => {
  return <S.CheckboxAnt {...restProps}>{children}</S.CheckboxAnt>;
};

export default Checkbox;
