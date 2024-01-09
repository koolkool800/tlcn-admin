import PurchaseInformation from '@components/userManagement/PurchaseInformation';
import UserInformation from '@components/userManagement/UserInfomation';
import { UserManagementTableType } from '@constants/codeConstants';
import { H5 } from '@style/DefaultStyled';
import * as S from './style';

const UserManagementDetail = () => {
  return (
    <S.Wrapper>
      <H5>USER DETAIL</H5>
      <UserInformation />
      <PurchaseInformation
        title="PURCHASED INFORMATION (Last 6 months)"
        type={UserManagementTableType.PURCHASE}
      />
      <PurchaseInformation
        title="SOLD INFORMATION (Last 6 months)"
        type={UserManagementTableType.SOLD}
      />
    </S.Wrapper>
  );
};

export default UserManagementDetail;
