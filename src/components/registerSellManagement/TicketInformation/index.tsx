import ViewAttachment from '@components/common/ViewAttachment';
import { H6, Information } from '@style/DefaultStyled';
import { RegisterToSellDetailType } from 'interface/registerToSell';
import * as S from './style';

type Props = {
  item: RegisterToSellDetailType;
};

const TicketInformation = ({ item }: Props) => {
  return (
    <>
      <S.Wrapper>
        <H6>TICKET INFORMATION</H6>
        <Information col={7}>
          {/* Row 1  */}
          <div className="item">
            <div className="title">Class</div>
            <div className="value">{item?.ticketInformation?.class}</div>
          </div>
          <div className="item">
            <div className="title">Zone</div>
            <div className="value">{item?.ticketInformation?.section}</div>
          </div>
          <div className="item">
            <div className="title">Floor</div>
            <div className="value">{item?.ticketInformation?.floor}</div>
          </div>
          <div className="item">
            <div className="title">Row</div>
            <div className="value">{item?.ticketInformation?.row}</div>
          </div>

          <div className="item">
            <div className="title">More information</div>
            <div className="value">
              {item?.ticketInformation?.moreInformation?.join(', ')}
            </div>
          </div>

          <div className="item">
            <div className="title">Quantity</div>
            <div className="value">{item?.ticketInformation?.quantity}</div>
          </div>

          <div className="item">
            <div className="title">Proof of owner </div>
            <div className="value">
              {item?.ticketInformation?.proofOfOwner?.length ? (
                <ViewAttachment
                  attachments={
                    Array.isArray(item?.ticketInformation?.proofOfOwner)
                      ? item?.ticketInformation?.proofOfOwner
                      : [item?.ticketInformation?.proofOfOwner]
                  }
                />
              ) : null}
            </div>
          </div>
        </Information>
      </S.Wrapper>
    </>
  );
};

export default TicketInformation;
