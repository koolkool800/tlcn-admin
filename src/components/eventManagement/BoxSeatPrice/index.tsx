import { Typography } from '@style/DefaultStyled';
import useState from 'react';
import * as S from './style';

function BoxSeatPrice({
  dataMap,
}: {
  dataMap: { groupName: string; sections: any[]; color?: string };
}) {
  const { groupName, sections } = dataMap;
  return (
    <S.Wrapper isShown>
      <div className="container-header-box">
        <Typography>
          Class: <span>{groupName}</span>
        </Typography>
        <Typography>
          Original Price: <span>10000$</span>
        </Typography>
        <Typography>
          Min Price: <span>5000$</span>
        </Typography>
        <Typography>Restricted view seat</Typography>
      </div>
      <div className="container-zone">
        <span>zone: </span>
      </div>
      <div className="container-floor">
        {sections.map((item) => (
          <div key={item}>
            <div className="container-title-floor">
              <Typography>{`${item.name}`}</Typography>
            </div>
          </div>
        ))}
      </div>
    </S.Wrapper>
  );
}

export default BoxSeatPrice;
