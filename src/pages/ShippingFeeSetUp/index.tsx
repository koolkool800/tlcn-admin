import Button from '@components/common/Button';
import Input from '@components/common/Input';
import feeService from '@services/feeService';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { dateTimeFormat } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { ShippingCurrentFee } from 'interface/fee';
import { useEffect, useState } from 'react';
import * as S from './style';

export type FormValue = { currentFee: string | undefined };

const ShippingFeeSetUp = () => {
  const [form] = Form.useForm();

  const [currentFee, setCurrentFee] = useState<ShippingCurrentFee | null>(null);
  const [active, setActive] = useState<boolean>(false);

  const showActiveBtn = () => setActive(true);
  const hiddenActiveBtn = () => setActive(false);

  /**
   * used to get current fee
   * @returns {Promise<void>}
   */
  const getCurrentFee = async (): Promise<void> => {
    try {
      const res = await feeService.getCurrentShippingFee();
      setCurrentFee({ ...res.data });
    } catch (error) {
      /** ERROR */
    }
  };

  useEffect(() => {
    getCurrentFee();
  }, []);

  /**
   *
   * @param values value form
   */
  const handleFinish = async (values: FormValue) => {
    try {
      const requestParam = {
        currentFee: values.currentFee
          ? Number(values.currentFee?.replace(/[^0-9.]/g, ''))
          : undefined,
      };
      const res = await feeService.createCurrentShippingFee(requestParam);
      hiddenActiveBtn();
      form.setFieldsValue({ currentFee: undefined });
      setCurrentFee(res.data);
      message.success('Successfully');
    } catch (error) {
      //   message.warning('currentFee should not be empty');
    }
  };

  return (
    <S.Layout>
      <H5>SHIPPING FEE SET UP</H5>
      <Form
        form={form}
        name="ClearanceFeeSetUp"
        layout="vertical"
        style={{ maxWidth: 335 }}
        onFinish={handleFinish}
      >
        <S.Gap40>
          {currentFee && (
            <S.Gap12>
              <Form.Item
                label="Current shipping fee"
                style={{ marginBottom: 0 }}
              >
                <Input
                  disabled
                  type="input"
                  placeholder="Current shipping fee"
                  value={formatNumberWithCommas(currentFee.currentFee ?? 0)}
                  suffix="$"
                />
              </Form.Item>
              <Typography>
                Apply from {dateTimeFormat(currentFee.applyDate)}
              </Typography>
            </S.Gap12>
          )}

          {active && (
            <S.Gap12>
              <Form.Item
                name="currentFee"
                label="New shipping fee"
                style={{ marginBottom: 0 }}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, valCurrent: string) {
                      const inputValue = valCurrent?.replace(/\D/g, '');

                      if (!valCurrent) {
                        return Promise.reject(
                          new Error('Please input platform fee!')
                        );
                      }

                      if (!Number(inputValue) || inputValue.length > 10) {
                        return Promise.reject(
                          new Error('Platform fee invalid')
                        );
                      }
                      return Promise.resolve('Please input platform fee!');
                    },
                  }),
                ]}
                getValueFromEvent={(event) => {
                  const inputValue = event.target.value;
                  const numericValue = parseFloat(
                    inputValue.replace(/[^0-9.]/g, '')
                  );

                  if (!Number.isNaN(numericValue)) {
                    return formatNumberWithCommas(numericValue);
                  }
                  return event.target.value;
                }}
              >
                <Input
                  type="input"
                  placeholder="Enter new platform fee"
                  suffix="$"
                />
              </Form.Item>
              <Typography>
                Apply from: {dayjs().format('DD.MM.YYYY')}
              </Typography>
            </S.Gap12>
          )}
        </S.Gap40>

        <div style={{ marginTop: 24, marginBottom: 0 }}>
          {active && (
            <Button
              maxwidth="160"
              bgcolor={theme.colors.primarySolid500}
              color="#000"
              htmlType="submit"
            >
              Save
            </Button>
          )}
          {!active && (
            <Button
              maxwidth="160"
              bgcolor={theme.colors.primarySolid500}
              color="#000"
              onClick={showActiveBtn}
            >
              Set new shipping fee
            </Button>
          )}
        </div>
      </Form>
    </S.Layout>
  );
};

export default ShippingFeeSetUp;
