import {
  OrderStatusLabel,
  PaymentMethodLabel,
  TRANSACTION_METHOD,
} from '@constants/codeConstants';
import { H6 } from '@style/DefaultStyled';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import { OrderResponseType } from 'interface/order';
import * as S from './style';

type Props = {
  item: OrderResponseType;
};

const OrderInformation = ({ item }: Props) => {
  return (
    <S.Wrapper>
      <H6>ORDER INFORMATION</H6>
      <S.Information>
        {/* Row 1  */}
        <div className="item">
          <div className="title">User ID</div>
          <div className="value">{item?.id}</div>
        </div>
        <div className="item">
          <div className="title">Order created time</div>
          <div className="value">{dateTimeFormat(item?.createdAt)}</div>
        </div>
        <div className="item">
          <div className="title">Total order value</div>
          <div className="value">{currencyFormat(item?.totalPayment || 0)}</div>
        </div>
        <div className="item">
          <div className="title">Delivery method</div>
          <div className="value">
            {Object.keys(TRANSACTION_METHOD).includes(item?.deliveryMethod)
              ? TRANSACTION_METHOD[item?.deliveryMethod]
              : null}
          </div>
        </div>
        <div className="item">
          <div className="title">Payment method</div>
          <div className="value">
            {Object.keys(PaymentMethodLabel).includes(item?.paymentMethod)
              ? PaymentMethodLabel[item?.paymentMethod]
              : null}
          </div>
        </div>
        <div className="item">
          <div className="title">Order Status</div>
          <div className="value">
            {Object.keys(OrderStatusLabel).includes(item?.status)
              ? OrderStatusLabel[item?.status]
              : null}
          </div>
        </div>

        {/* Row 2  */}
        <div className="item">
          <div className="title">Ticket Price</div>
          <div className="value">{currencyFormat(item?.totalPrice || 0)}</div>
        </div>
        <div className="item">
          <div className="title">Quantity</div>
          <div className="value">{item?.event?.seatQuantity || 0}</div>
        </div>
        <div className="item">
          <div className="title">
            Platform fee <div>(Buyer pay)</div>
          </div>
          <div className="value">{currencyFormat(item?.platformFee || 0)}</div>
        </div>
        <div className="item">
          <div className="title">
            Delivery fee <div>(Buyer pay)</div>
          </div>
          <div className="value">{currencyFormat(item?.deliveryFee || 0)}</div>
        </div>
        <div className="item">
          <div className="title">
            Commission fee <div>(Seller pay)</div>
          </div>
          <div className="value">
            {currencyFormat(item?.event?.commissionFee || 0)}
          </div>
        </div>
        {/* <div className="item">
          <div className="title">
            Shipping fee <div>(Seller pay)</div>
          </div>
          <div className="value">{item?.id}</div>
        </div> */}
      </S.Information>
    </S.Wrapper>
  );
};

export default OrderInformation;
