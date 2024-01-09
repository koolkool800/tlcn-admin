import { ROUTES } from '@constants/routes';
import faqService from '@services/faqServices';
import { message } from 'antd';
import { FaqType } from 'interface';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CreateFaq from '../CreateFaq';
// import CreateFaq from '../CreateFaq';

const FaqDetail = () => {
  const params = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [currentFaq, setCurrentFaq] = useState<FaqType>();
  const loadFaq = async (id: string) => {
    try {
      const res = await faqService.getDetailFAQ(id);
      setCurrentFaq(res.data);
    } catch (error: any) {
      message.error(error?.message);
      navigate(ROUTES.FAQ_MANAGEMENT);
    }
  };

  useEffect(() => {
    if (params?.id) {
      loadFaq(params?.id);
    }
  }, []);
  return (
    <CreateFaq
      status={search.replace('?', '') ? 'update' : 'details'}
      currentFaq={currentFaq}
    />
  );
};

export default FaqDetail;
