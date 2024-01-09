import { DropDownProps, Dropdown } from 'antd';
import { ArrowDown2 } from 'iconsax-react';
import * as S from './style';

interface Props extends DropDownProps {
  placeholder: string;
  items: any;
}
const CustomDropdown = ({ placeholder, items, ...restProps }: Props) => {
  return (
    <Dropdown {...restProps} dropdownRender={() => items} placement="bottom">
      <S.Container role="button">
        {placeholder}
        <ArrowDown2 size="20" className="arrow" />
      </S.Container>
    </Dropdown>
  );
};

export default CustomDropdown;
