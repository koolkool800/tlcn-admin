import { InputProps } from 'antd';
import { Eye, EyeSlash } from 'iconsax-react';
import * as S from './style';

interface Props extends InputProps {
  type?: 'input' | 'password';
  placeholder: string;
}
const Input = ({ type = 'input', placeholder, ...restProps }: Props) => {
  return (
    <>
      {type === 'input' ? (
        <S.InputAnt {...restProps} placeholder={placeholder} />
      ) : (
        <S.InputPassAnt
          {...restProps}
          placeholder={placeholder}
          iconRender={(visible: boolean) =>
            visible ? (
              <Eye size="20" style={{ cursor: 'pointer' }} />
            ) : (
              <EyeSlash size="20" style={{ cursor: 'pointer' }} />
            )
          }
        />
      )}
    </>
  );
};

export default Input;
