import GeneralForm from '@components/couponManagement/GeneralForm';
import { ROUTES } from '@constants/routes';
import couponService from '@services/couponService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { FormCouponType } from 'interface/coupon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';

const CouponUpdate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: FormCouponType | any) => {
    setLoading(true);
    if (values?.startDate instanceof dayjs) {
      values.startDate = dayjs(values.startDate).format('YYYY-MM-DD');
    }

    if (values?.expiredDate instanceof dayjs) {
      values.expiredDate = dayjs(values.expiredDate).format('YYYY-MM-DD');
    }

    values.applyForSeller = !!values?.applyForSeller;

    try {
      const res = await couponService.put(String(params?.id), values);
      message.success('Update coupon successful');
      navigate(ROUTES.COUPON_MANAGEMENT);
    } catch (err: any) {
      message.error(t(`HTTP_STATUS.${err.errorCode}`));
    }

    setLoading(false);
  };

  const fetchData = async () => {
    try {
      const res = await couponService.getDetail(String(params?.id));

      if (res?.data) {
        const data = res?.data;
        form.setFieldsValue({
          ...data,
          applyForSeller: !!data?.applyForSeller,
          startDate: data?.startDate ? dayjs(data?.startDate) : null,
          expiredDate: data?.expiredDate ? dayjs(data?.expiredDate) : null,
        });
      }
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.id]);

  return (
    <S.Wrapper>
      <H5>COUPON MANAGEMENT UPDATE</H5>
      <GeneralForm loading={loading} onFinish={onFinish} form={form} />
    </S.Wrapper>
  );
};

export default CouponUpdate;
