import Checkbox from '@components/common/Checkbox';
import DatePickerCustom from '@components/common/Datepicker';
import Input from '@components/common/Input';
import InputNumber from '@components/common/InputNumber';
import Select from '@components/common/Select';
import FormCondition from '@components/couponManagement/FormCondition';
import {
  VoucherCategoryLabel,
  VoucherTypeLabel,
} from '@constants/codeConstants';

import { Typography } from '@style/DefaultStyled';
import { Col, Form, Row } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import { FormCouponType, initialValueFormCoupon } from 'interface/coupon';
import * as S from './style';

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current.isBefore(dayjs().subtract(1, 'day'));
};

type Props = {
  onFinish: (values: FormCouponType | any) => void;
  loading: boolean;
  form: any;
  isView?: boolean;
};

const GeneralForm = ({ onFinish, loading, form, isView }: Props) => {
  const applyForSeller = Form.useWatch('applyForSeller', form);

  return (
    <S.Wrapper>
      <S.CustomForm
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ ...initialValueFormCoupon }}
      >
        {/* Coupon name, quantity */}
        <Row gutter={[24, 24]}>
          <Col md={8}>
            <Form.Item
              label="Coupon Name"
              name="name"
              rules={[{ required: true, message: 'Coupon name is required' }]}
            >
              <Input disabled={isView} placeholder="Enter coupon name" />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: 'Quantity cannot be less than 1',
                  type: 'number',
                  min: 1,
                },
              ]}
            >
              <InputNumber
                disabled={isView}
                min={1}
                placeholder="Enter quantity"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Item label="Category coupon" name="voucherCategory">
              <Select
                disabled={isView}
                options={Object.entries(VoucherCategoryLabel).map(
                  ([value, label]) => ({
                    label,
                    value,
                  })
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* Discount value, type */}
        <Row gutter={[24, 24]}>
          <Col md={4}>
            <Form.Item
              label="Discount value"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Coupon discount value is required',
                  type: 'number',
                  min: 1,
                },
              ]}
            >
              <InputNumber
                disabled={isView}
                placeholder="Enter discount value"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
              />
            </Form.Item>
          </Col>
          <Col md={4}>
            <Form.Item label=" " className="hidden-label" name="type">
              <Select
                disabled={isView}
                placeholder="Type"
                options={Object.entries(VoucherTypeLabel).map(
                  ([value, label]) => ({
                    label,
                    value,
                  })
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={24}>
            <Form.Item name="applyForSeller">
              <Checkbox
                onChange={(e) =>
                  form.setFieldValue('applyForSeller', e.target.checked)
                }
                disabled={isView}
                checked={applyForSeller}
              >
                Apply For Seller{' '}
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        {/* Start Date, Expired Date */}
        <Typography>Applied time</Typography>

        <Row gutter={[24, 24]}>
          <Col md={6}>
            <DatePickerCustom
              disabledDate={disabledDate}
              label="Start Date"
              name="startDate"
              placeholder="Select time"
              rules={[{ required: true, message: 'From date is required' }]}
              disabled={isView}
            />
          </Col>
          <Col md={6}>
            <DatePickerCustom
              label="Expired Date"
              disabled={isView}
              name="expiredDate"
              placeholder="Select time"
              rules={[
                { required: true, message: 'Expire date is required' },
                ({ getFieldValue }) => ({
                  validator(_, value: Dayjs | string | null) {
                    if (
                      value instanceof dayjs &&
                      dayjs(value).isBefore(getFieldValue('startDate'))
                    ) {
                      return Promise.reject(
                        new Error(
                          'The expiration date must be greater than the start date.'
                        )
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            />
          </Col>
        </Row>

        {/* Conditions  */}
        <Row>
          <Col md={24}>
            <FormCondition loading={loading} isView={isView} />
          </Col>
        </Row>
      </S.CustomForm>
    </S.Wrapper>
  );
};

export default GeneralForm;
