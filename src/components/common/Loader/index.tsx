import Logo from '@assets/images/logo.png';
import * as S from './styles';
import { Spin } from 'antd';

function Loader() {
  return (
    <S.Loader>
      {/* <div className="spinner">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div> */}
      {/* <img src={Logo} alt="logo" /> */}
      <Spin size="large" />
    </S.Loader>
  );
}

export default Loader;
