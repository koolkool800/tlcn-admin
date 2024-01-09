import { ROUTES } from '@constants/routes';
import dashboardService from '@services/dashboardService';
import { H5 } from '@style/DefaultStyled';
import { avatarGenerator, currencyFormat } from '@utils/format';
import { Spin } from 'antd';
import { TopHighestRevenue as TopHighestRevenueType } from 'interface/dashboard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import Rank1 from '../SvgRanks/Rank1';
import Rank2 from '../SvgRanks/Rank2';
import Rank3 from '../SvgRanks/Rank3';
import Rank4 from '../SvgRanks/Rank4';
import Rank5 from '../SvgRanks/Rank5';

type BoxItemProps = {
  id: number;
  index: number;
  name: string;
  price: number;
};

//dynamic import svg rank
const Rank = (rank: number) => {
  switch (rank) {
    case 1:
      return <Rank1 />;
    case 2:
      return <Rank2 />;
    case 3:
      return <Rank3 />;
    case 4:
      return <Rank4 />;
    case 5:
      return <Rank5 />;
    default:
      return <Rank5 />;
  }
};

const BoxItem = ({ name, price, id, index }: BoxItemProps) => {
  return (
    <div className="item-top">
      {Rank(index)}
      <div className="left">
        <span aria-hidden className="link">
          {name}
        </span>
      </div>
      <div className="right" style={{ color: 'white', fontWeight: 'bold' }}>
        {currencyFormat(price || 0)}
      </div>
    </div>
  );
};

const TopHighestRevenue = () => {
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<TopHighestRevenueType[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dashboardService.getHighestRevenue();
      setResources(Array.isArray(res?.data) ? res?.data : [res?.data]);
    } catch (err) {
      /* empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <S.Wrapper>
        <Spin spinning={loading}>
          <H5>Top highest revenue</H5>

          {resources?.map((item: TopHighestRevenueType, index: number) => {
            return (
              <BoxItem
                index={index + 1}
                id={item.id}
                key={`${item?.eventName}_${String(index)}`}
                name={item?.eventName}
                price={item?.revenue}
              />
            );
          })}
        </Spin>
      </S.Wrapper>
    </>
  );
};

export default TopHighestRevenue;
