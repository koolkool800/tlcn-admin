import { H6, Information } from '@style/DefaultStyled';
import {
  RegisterToSellDetailType,
  RegisterToSellType,
} from 'interface/registerToSell';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import {
  TRANSACTION_METHOD,
  TicketStatusLabel,
} from '@constants/codeConstants';
import * as S from './style';

type Props = {
  item: RegisterToSellDetailType;
};

const OrderInformation = ({ item }: Props) => {
  return (
    <>
      <S.Wrapper>
        <H6>REGISTER INFORMATION</H6>
        <Information col={5}>
          {/* Row 1  */}
          <div className="item">
            <div className="title">Register ID</div>
            <div className="value">{item?.registerInformation?.id}</div>
          </div>
          <div className="item">
            <div className="title">Register time</div>
            <div className="value">
              {dateTimeFormat(item?.registerInformation?.registerTime)}
            </div>
          </div>
          <div className="item">
            <div className="title">Instant sale price</div>
            <div className="value">
              {currencyFormat(item?.registerInformation?.instantSalePrice || 0)}
            </div>
          </div>
          <div className="item">
            <div className="title">Delivery method</div>
            <div className="value">
              {item?.registerInformation?.deliveryMethod?.map(
                (method) => TRANSACTION_METHOD[method]
              )}
            </div>
          </div>

          <div className="item">
            <div className="title">Order status</div>
            <div className="value">
              {item?.registerInformation?.orderStatus
                ? TicketStatusLabel[item?.registerInformation.orderStatus]
                : null}
            </div>
          </div>
        </Information>
      </S.Wrapper>
    </>
  );
};

export default OrderInformation;
