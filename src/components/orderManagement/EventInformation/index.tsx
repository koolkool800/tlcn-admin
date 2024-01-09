import { H6 } from '@style/DefaultStyled';
import { dateTimeFormat } from '@utils/format';
import { EventType } from 'interface/event';
import * as S from './style';

type Props = {
  item: EventType;
};

const EventInformation = ({ item }: Props) => {
  return item ? (
    <S.Wrapper>
      <H6>EVENT INFORMATION</H6>
      <S.Information>
        <div className="item">
          <div className="title">Event ID</div>
          <div className="value">{item?.id}</div>
        </div>
        <div className="item">
          <div className="title">Event name</div>
          <div className="value">{item?.title}</div>
        </div>
        <div className="item">
          <div className="title">Event Category</div>
          <div className="value">{item?.eventType}</div>
        </div>
        <div className="item">
          <div className="title">Performance time</div>
          <div className="value">{dateTimeFormat(item?.performanceDate)}</div>
        </div>
        <div className="item">
          <div className="title">Place</div>
          <div className="value">{item?.place}</div>
        </div>
      </S.Information>
    </S.Wrapper>
  ) : null;
};

export default EventInformation;
