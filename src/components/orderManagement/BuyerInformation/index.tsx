import { H6, Information } from '@style/DefaultStyled';
import { phoneFormat } from '@utils/format';
import { OrderResponseType } from 'interface/order';
import * as S from './style';

type Props = {
  item: OrderResponseType;
};

const BuyerInformation = ({ item }: Props) => {
  const buyer = item?.buyer;
  return (
    <S.Wrapper>
      <H6>BUYER INFORMATION</H6>
      <Information>
        {/* Row 1 */}
        <div className="item">
          <div className="title">User ID</div>
          <div className="value">{buyer?.id}</div>
        </div>
        <div className="item">
          <div className="title">Name</div>
          <div className="value">{buyer?.name}</div>
        </div>
        <div className="item">
          <div className="title">Phone number</div>
          <div className="value">{phoneFormat(buyer?.phone)}</div>
        </div>
        <div className="item">
          <div className="title">Email</div>
          <div className="value">{buyer?.email}</div>
        </div>
        <div className="item">
          <div className="title">Default Address</div>
          <div className="value">
            {[
              buyer?.addressDefault?.address,
              buyer?.addressDefault?.detailAddress,
            ]
              ?.filter((s) => s?.trim())
              ?.join(', ')}
          </div>
        </div>

        {/* Row 2 */}
        {/* <div className="item">
          <div className="title">Cash receipt category</div>
          <div className="value">{item?.cashReceiptType}</div>
        </div>

        <div className="item">
          <div className="title">Cash receipt information</div>
          <div className="value">{item?.cashReceipt}</div>
        </div> */}
      </Information>
    </S.Wrapper>
  );
};

export default BuyerInformation;
