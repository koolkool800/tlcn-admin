import RequestTotal from '@components/Dashboard/RequestTotal';
import RevenueTrend from '@components/Dashboard/RevenueTrend';
import TopHighestRevenue from '@components/Dashboard/TopHighestRevenue';
import { ArrowRight2 } from 'iconsax-react';
import { NavLink } from 'react-router-dom';
import * as S from './style';

type BoxItemProps = {
  count: number;
  desc: string;
  link: string;
};
const BoxItem = ({ count, desc, link }: BoxItemProps) => {
  return (
    <div className="item">
      <div className="link">
        <NavLink to={link}>
          <span>Detail</span>
          <ArrowRight2 size={16} />
        </NavLink>
      </div>
      <div className="item-content">
        <div className="count">{count}</div>
        <div className="desc">{desc}</div>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <>
      <S.BoxWrapper>
        <RequestTotal />
      </S.BoxWrapper>
      <S.WrapperRevenue>
        <TopHighestRevenue />
        <RevenueTrend />
      </S.WrapperRevenue>
    </>
  );
}

export default Dashboard;
