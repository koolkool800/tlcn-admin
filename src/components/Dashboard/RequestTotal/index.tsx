import { ROUTES } from '@constants/routes';
import dashboardService from '@services/dashboardService';
import { Spin } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import { ObjectLiteral } from 'interface/general';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

type BoxItemProps = {
  count: number;
  desc: string;
  link: string;
  loading: boolean;
};
const BoxItem = ({ count, desc, link, loading }: BoxItemProps) => {
  return (
    <Spin spinning={loading}>
      <div className="item">
        <div className="link">
          <NavLink to={link}>
            <span>Detail</span>
            <ArrowRight2 size={16} />
          </NavLink>
        </div>
        <div className="item-content">
          <div className="count" style={{ color: 'white' }}>
            {count}
          </div>
          <div className="desc">{desc}</div>
        </div>
      </div>
    </Spin>
  );
};

const RequestTotal = () => {
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<ObjectLiteral>({});
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dashboardService.getRequestPending();
      setResource(res.data);
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
      <BoxItem
        loading={loading}
        link={ROUTES.REGISTER_SELL_MANAGEMENT}
        desc="Sell registrations request"
        count={resource?.sellRegistrationRequests || 0}
      />
      <BoxItem
        loading={loading}
        link={ROUTES.WITHDRAW_REQUEST_MANAGEMENT}
        desc="Withdrawal request"
        count={resource?.withdrawalRequests || 0}
      />
      <BoxItem
        loading={loading}
        link={ROUTES.INQUIRY_MANAGEMENT}
        desc="1:1 Inquiry"
        count={resource?.inquery || 0}
      />
      <BoxItem
        loading={loading}
        link={ROUTES.ORDER_MANAGEMENT}
        desc="Orders on shipping"
        count={resource?.ordersOnShipping || 0}
      />
    </>
  );
};

export default RequestTotal;
