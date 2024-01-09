import Button from '@components/common/Button';
import { H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Candle2, Eye } from 'iconsax-react';
import * as S from './style';

export type CardTopEventProps = {
  totalViews: string;
  title: string;
  performPlace: string;
  coverImg: string;
  id: string;
};

const CardTopEvent = ({
  performPlace,
  title,
  totalViews,
  coverImg,
  id,
}: CardTopEventProps) => {
  return (
    <S.CardTopEventContainer>
      <div className="image-cover">
        <img src={coverImg} alt={title} />
      </div>
      <div className="event-info">
        <Typography>
          <Eye size="20" color={theme.colors.surfaceMedium} />
          {totalViews}
        </Typography>
        <H6>{title}</H6>
        <Typography>{performPlace}</Typography>
      </div>
    </S.CardTopEventContainer>
  );
};

export default CardTopEvent;
