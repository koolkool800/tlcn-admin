import { H6, Information } from '@style/DefaultStyled';
import { RegisterToSellDetailType } from 'interface/registerToSell';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import {
  TRANSACTION_METHOD,
  TicketStatusLabel,
} from '@constants/codeConstants';
import * as S from './style';

type Props = {
  item: RegisterToSellDetailType;
};

const SellInformation = ({ item }: Props) => {
  return (
    <>
      <S.Wrapper>
        <H6>SELLER INFORMATION</H6>
        <Information col={5}>
          {/* Row 1  */}
          <div className="item">
            <div className="title">User ID</div>
            <div className="value">{item?.sellerInformation?.userID}</div>
          </div>
          <div className="item">
            <div className="title">Name</div>
            <div className="value">{item?.sellerInformation?.name}</div>
          </div>
          <div className="item">
            <div className="title">Phone number</div>
            <div className="value">{item?.sellerInformation?.phoneNumber}</div>
          </div>
          <div className="item">
            <div className="title">Email</div>
            <div className="value">{item?.sellerInformation?.email}</div>
          </div>

          <div className="item">
            <div className="title">Default Address</div>
            <div className="value">
              {item?.sellerInformation?.defaultAddress}
            </div>
          </div>
        </Information>
      </S.Wrapper>
    </>
  );
};

export default SellInformation;
