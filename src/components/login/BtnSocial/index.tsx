import * as S from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string | undefined;
  text: string;
}
const BtnSocial = ({ icon, text, ...restProps }: Props) => {
  return (
    <S.Btn {...restProps}>
      {icon && <img src={icon} alt={text} />}
      <div className="content">{text}</div>
    </S.Btn>
  );
};

export default BtnSocial;
