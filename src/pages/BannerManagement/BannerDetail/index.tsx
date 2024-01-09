import { ROUTES } from '@constants/routes';
import bannerService from '@services/bannerService';
import { message } from 'antd';
import { BannerResponseResult } from 'interface/banner';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CreateBanner from '../CreateBanner';

const BannerDetail = () => {
  const params = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState<BannerResponseResult>();
  const fetchData = async () => {
    if (params?.id) {
      try {
        const detailBanner = await bannerService.getDetailBanner(params?.id);
        setCurrentBanner(detailBanner.data);
      } catch (error: any) {
        navigate(ROUTES.BANNER_MANAGEMENT);
        message.error(error?.message);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CreateBanner
      isView={!search.includes('edit')}
      currentBanner={currentBanner}
    />
  );
};

export default BannerDetail;
