import { Typography } from '@style/DefaultStyled';
import * as S from './style';

const BoxInfoEvent = ({
  eventId,
  eventName,
  eventCategory,
  performanceDate,
  place,
}: {
  eventId: string | number;
  eventName: string;
  eventCategory: string;
  performanceDate: string | null;
  place: string;
}) => {
  return (
    <S.Wrapper>
      <div className="container-box">
        <div>EventID</div>
        <Typography>{eventId}</Typography>
      </div>
      <div className="container-box">
        <div>Event name</div>
        <Typography>{eventName}</Typography>
      </div>
      <div className="container-box">
        <div>Event category</div>
        <Typography>{eventCategory}</Typography>
      </div>
      <div className="container-box">
        <div>Performance time</div>
        <Typography>{performanceDate}</Typography>
      </div>
      <div className="container-box">
        <div>Place</div>
        <Typography>{place}</Typography>
      </div>
    </S.Wrapper>
  );
};

export default BoxInfoEvent;
