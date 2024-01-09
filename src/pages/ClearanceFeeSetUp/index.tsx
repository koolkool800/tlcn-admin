import Button from '@components/common/Button';
import Input from '@components/common/Input';
import feeService from '@services/feeService';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { dateTimeFormat } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { ClearanceCurrentFee } from 'interface/fee';
import { useEffect, useState } from 'react';
import * as S from './style';

export type FormValueClearance = {
  platformFee: string | undefined;
  commissionFee: string | undefined;
};

const ClearanceFeeSetUp = () => {
  const [form] = Form.useForm();

  const [clearanceFee, setClearanceFee] = useState<ClearanceCurrentFee | null>(
    null
  );
  const [active, setActive] = useState<boolean>(false);

  const showActiveBtn = () => setActive(true);
  const hiddenActiveBtn = () => setActive(false);

  /**
   * used to get current fee
   * @returns {Promise<void>}
   */
  const getCurrentFee = async (): Promise<void> => {
    try {
      const res = await feeService.getCurrentClearanceFee();
      setClearanceFee({ ...res.data });
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
  const handleFinish = async (values: FormValueClearance) => {
    try {
      const requestParam = {
        platformFee: values.platformFee
          ? values.platformFee?.replace(/[^0-9.]/g, '')
          : undefined,
        commissionFee: values.commissionFee
          ? values.commissionFee?.replace(/[^0-9.]/g, '')
          : undefined,
      };
      const res = await feeService.createCurrentClearanceFee(requestParam);
      setClearanceFee(res?.data);
      hiddenActiveBtn();
      form.setFieldsValue({ platformFee: undefined, commissionFee: undefined });
      message.success('Successfully');
    } catch (error) {
      //   message.warning('currentFee should not be empty');
    }
  };

  return (
    <S.Layout>
      <H5>CLEARANCE FEE SET UP</H5>
      <Form
        form={form}
        name="ClearanceFeeSetUp"
        layout="vertical"
        style={{ maxWidth: 335 }}
        onFinish={handleFinish}
      >
        <S.Gap40>
          {clearanceFee && (
            <S.Gap20>
              <Form.Item
                label="Current clearance platform fee"
                style={{ marginBottom: 0 }}
              >
                <Input
                  disabled
                  type="input"
                  placeholder="Current clearance platform fee"
                  suffix="%"
                  value={formatNumberWithCommas(clearanceFee.platformFee ?? 0)}
                />
              </Form.Item>
              <Form.Item
                label="Current clearance commission fee"
                style={{ marginBottom: 0 }}
              >
                <Input
                  disabled
                  type="input"
                  placeholder="Current clearance commission fee"
                  suffix="$"
                  value={formatNumberWithCommas(
                    clearanceFee.commissionFee ?? 0
                  )}
                />
              </Form.Item>
              <Typography>
                Apply from {dateTimeFormat(clearanceFee.applyDate)}
              </Typography>
            </S.Gap20>
          )}

          {active && (
            <S.Gap20>
              <Form.Item
                name="platformFee"
                label="New clearance platform fee"
                style={{ marginBottom: 0 }}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, valCurrent: string) {
                      const inputValue = valCurrent?.replace(/\D/g, '');

                      if (!valCurrent) {
                        return Promise.reject(
                          new Error('Please input clearance platform fee!')
                        );
                      }

                      if (!Number(inputValue) || inputValue.length > 10) {
                        return Promise.reject(
                          new Error('Platform clearance platform fee invalid!')
                        );
                      }
                      return Promise.resolve(
                        'Please input clearance platform fee!'
                      );
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
                  placeholder="Enter new clearance platform fee"
                  suffix="%"
                />
              </Form.Item>
              <Form.Item
                name="commissionFee"
                label="New clearance commission fee"
                style={{ marginBottom: 0 }}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, valCurrent: string) {
                      const inputValue = valCurrent?.replace(/\D/g, '');

                      if (!valCurrent) {
                        return Promise.reject(
                          new Error('Please input clearance commission fee!')
                        );
                      }

                      if (!Number(inputValue) || inputValue.length > 10) {
                        return Promise.reject(
                          new Error('clearance commission fee invalid!')
                        );
                      }
                      return Promise.resolve(
                        'Please input clearance commission fee!'
                      );
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
                  placeholder="Enter new clearance commission fee"
                  suffix="$"
                />
              </Form.Item>
              <Typography>
                Apply from: {dayjs().format('DD.MM.YYYY')}
              </Typography>
            </S.Gap20>
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
              Set new clearance fee
            </Button>
          )}
        </div>
      </Form>
    </S.Layout>
  );
};

export default ClearanceFeeSetUp;
