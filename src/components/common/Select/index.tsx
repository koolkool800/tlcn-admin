import { SelectProps } from 'antd';
import { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import { ArrowDown2, CloseCircle } from 'iconsax-react';
import * as S from './style';

export interface PropsSelect extends SelectProps<any, BaseOptionType> {
  width?: number | string | undefined;
  options?: (BaseOptionType | DefaultOptionType)[];
}
const Select = ({ width, options = [], ...restProps }: PropsSelect) => {
  return (
    <S.AntSelect
      {...restProps}
      width={width}
      options={options}
      suffixIcon={<ArrowDown2 size="20" />}
      clearIcon={<CloseCircle size="20" />}
    />
  );
};

export default Select;
