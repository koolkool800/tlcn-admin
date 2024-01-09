import userService from '@services/userService';
import { H6, Information } from '@style/DefaultStyled';
import { phoneFormat } from '@utils/format';
import { ObjectLiteral } from 'interface/general';
import { UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';

const UserInformation = () => {
  const params: ObjectLiteral = useParams();
  const [user, setUser] = useState<UserType | null>(null);

  /** * Fetch user detail */
  const fetchUser = async () => {
    try {
      const res = await userService.getDetail(String(params?.id));
      setUser(res?.data?.user || null);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchUser();
    }
  }, [params?.id]);

  return (
    <S.Wrapper>
      <H6>USER INFORMATION</H6>
      <Information col={6}>
        <div className="item">
          <div className="title">User ID</div>
          <div className="value">{user?.id}</div>
        </div>
        <div className="item">
          <div className="title">Name</div>
          <div className="value">{user?.name}</div>
        </div>
        <div className="item">
          <div className="title">Level</div>
          <div className="value">{user?.level}</div>
        </div>
        <div className="item">
          <div className="title">Phone number</div>
          <div className="value">{phoneFormat(user?.phone)}</div>
        </div>
        <div className="item">
          <div className="title">Email</div>
          <div className="value" style={{ wordBreak: 'break-all' }}>
            {user?.email}
          </div>
        </div>
        <div className="item">
          <div className="title">Default Address</div>
          <div className="value">
            {[
              user?.addressDefault?.address,
              user?.addressDefault?.detailAddress,
            ]
              ?.filter((s) => s?.trim())
              ?.join(', ')}
          </div>
        </div>
      </Information>
    </S.Wrapper>
  );
};

export default UserInformation;
