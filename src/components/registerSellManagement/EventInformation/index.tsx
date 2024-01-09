import { H6, Information } from '@style/DefaultStyled';
import { RegisterToSellDetailType } from 'interface/registerToSell';
import { dateTimeFormat } from '@utils/format';
import { EventTypeLabel } from '@constants/codeConstants';
import * as S from './style';

type Props = {
  item: RegisterToSellDetailType;
};

const EventInformation = ({ item }: Props) => {
  return (
    <>
      <S.Wrapper>
        <H6>EVENT INFORMATION</H6>
        <Information>
          {/* Row 1  */}
          <div className="item">
            <div className="title">Event ID</div>
            <div className="value">{item?.eventInformation?.eventId}</div>
          </div>
          <div className="item">
            <div className="title">Event name</div>
            <div className="value">{item?.eventInformation?.eventName}</div>
          </div>
          <div className="item">
            <div className="title">Event category</div>
            <div className="value">
              {EventTypeLabel[item?.eventInformation?.eventCategory]}
            </div>
          </div>
          <div className="item">
            <div className="title">Performance time</div>
            <div className="value">
              {dateTimeFormat(item?.eventInformation?.performanceTime)}
            </div>
          </div>

          <div className="item">
            <div className="title">Place</div>
            <div className="value">{item?.eventInformation?.place}</div>
          </div>
        </Information>
      </S.Wrapper>
    </>
  );
};

export default EventInformation;
