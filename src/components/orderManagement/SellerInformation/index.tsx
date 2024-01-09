import { H6 } from '@style/DefaultStyled';
import { phoneFormat } from '@utils/format';
import { OrderBaseCategoryType } from 'interface/order';
import * as S from './style';

type Props = {
  item: OrderBaseCategoryType;
};

const SellerInformation = ({ item }: Props) => {
  return (
    <S.Wrapper>
      <H6>SELLER INFORMATION</H6>
      <S.Information>
        <div className="item">
          <div className="title">User ID</div>
          <div className="value">{item?.id}</div>
        </div>
        <div className="item">
          <div className="title">Name</div>
          <div className="value">{item?.name}</div>
        </div>
        <div className="item">
          <div className="title">Phone number</div>
          <div className="value">{phoneFormat(item?.phone)}</div>
        </div>
        <div className="item">
          <div className="title">Email</div>
          <div className="value">{item?.email}</div>
        </div>
        <div className="item">
          <div className="title">Defaul Address</div>
          <div className="value">
            {[
              item?.addressDefault?.address,
              item?.addressDefault?.detailAddress,
            ]
              ?.filter((s) => s?.trim())
              ?.join(', ')}
          </div>
        </div>
      </S.Information>
    </S.Wrapper>
  );
};

export default SellerInformation;
