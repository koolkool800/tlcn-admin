import * as S from './style';

const Status = ({ type, label }: { type: string; label: string }) => {
  return (
    <S.Status type={type}>
      <div className="dot" />
      <div className="label">{label}</div>
    </S.Status>
  );
};

export default Status;
