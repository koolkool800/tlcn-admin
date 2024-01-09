import { PrimaryButton } from '@style/DefaultStyled';
import money from '@assets/images/money.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import Notification from '../Notification';
import UserInfo from '../UserInfo';
import * as S from './style';

const MyHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreatePage = location.pathname.endsWith('/create');

  return (
    <S.Navbar>
      <div>
        <PrimaryButton
          icon={<img src={money} alt="money" />}
          onClick={() => {
            window.location.href = ROUTES.EVENT_MANAGEMENT_CREATE;
          }}
          disabled={isCreatePage}
        >
          Create
        </PrimaryButton>
      </div>
      {/* <Notification /> */}
      <UserInfo />
    </S.Navbar>
  );
};

export default MyHeader;
