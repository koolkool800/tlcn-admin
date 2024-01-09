import { ROUTES } from '@constants/routes';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { resetState } from '@redux/reducer/authReducer';
import { Dropdown, MenuProps } from 'antd';
import { avatarGenerator } from '@utils/format';
import useUser from '@hooks/useUser';
import * as S from './style';

const menuItems = [{ title: 'Log out', key: 'log-out' }];

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const user = useUser();
  const items: MenuProps['items'] = menuItems.map((item) => ({
    label: (
      <S.NavLinkMenu
        to={ROUTES.LOGIN}
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          dispatch(resetState());
        }}
      >
        {item.title}
      </S.NavLinkMenu>
    ),
    key: item.key,
  }));

  return (
    <Dropdown
      placement="bottomRight"
      menu={{ items }}
      dropdownRender={(node) => (
        <S.DropdownContainer>{node}</S.DropdownContainer>
      )}
    >
      <S.Avatar color={avatarGenerator(String(user?.name || ''))}>
        <div>{String(user?.name || '')?.charAt(0)}</div>
      </S.Avatar>
    </Dropdown>
  );
};

export default UserInfo;
