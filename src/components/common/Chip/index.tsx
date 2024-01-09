import { TagProps } from 'antd';
import { ReactNode } from 'react';
import * as S from './style';

interface ChipProps extends TagProps {
  clearAll?: boolean;
  children: ReactNode;
}

const Chip = ({ clearAll = false, children, ...restProps }: ChipProps) => {
  return (
    <S.TagAnt
      {...restProps}
      className={clearAll ? 'clear' : ''}
      closable={!clearAll}
    >
      {children}
    </S.TagAnt>
  );
};

export default Chip;
