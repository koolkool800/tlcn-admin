import { H6, Information } from '@style/DefaultStyled';
import { OrderResponseType } from 'interface/order';
import * as S from './style';

type Props = {
  item: OrderResponseType;
};

const DeliveryInformation = ({ item }: Props) => {
  return (
    <S.Wrapper>
      <H6>DELIVERY INFORMATION</H6>
      <Information col={2}>
        <div className="item">
          <div className="title">{`Seller -> Resell Ticket`}</div>
        </div>
        <div className="item">
          <div className="title">{`Resell Ticket -> Buyer`}</div>
        </div>
      </Information>
      <Information col={4}>
        {/* Row 1  */}
        <div className="item">
          <div className="title">Delivery unit</div>
          <div className="value">
            {item?.deliveryUnitSellerToResellInfor?.unitName}
          </div>
        </div>
        <div className="item">
          <div className="title">Transaction code</div>
          <div className="value">
            {item?.deliveryUnitSellerToResellInfor?.deliveryCode}
          </div>
        </div>
        <div className="item">
          <div className="title">Delivery unit</div>
          <div className="value">
            {item?.deliveryUnitResellToBuyer?.deliveryCode}
          </div>
        </div>
        <div className="item">
          <div className="title">Transaction code</div>
          <div className="value">
            {item?.deliveryUnitResellToBuyer?.deliveryCode}
          </div>
        </div>
      </Information>
    </S.Wrapper>
  );
};

export default DeliveryInformation;
