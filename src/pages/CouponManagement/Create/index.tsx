import GeneralForm from '@components/couponManagement/GeneralForm';
import { ROUTES } from '@constants/routes';
import couponService from '@services/couponService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { FormCouponType } from 'interface/coupon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current.isBefore(dayjs().subtract(1, 'day'));
};

const CouponManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      const res = await couponService.post(values);
      message.success('Create coupon successful');
      navigate(ROUTES.COUPON_MANAGEMENT);
    } catch (err: any) {
      message.error(t(`HTTP_STATUS.${err.errorCode}`));
    }

    setLoading(false);
  };

  return (
    <S.Wrapper>
      <H5>COUPON MANAGEMENT</H5>
      <GeneralForm loading={loading} onFinish={onFinish} form={form} />
    </S.Wrapper>
  );
};

export default CouponManagement;
