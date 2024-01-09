import InputNumber from '@components/common/InputNumber';
import Select from '@components/common/Select';
import TextAreaCustom from '@components/common/TextArea';
import {
  ConditionOperator,
  VoucherConditionLabel,
} from '@constants/codeConstants';
import { H6, PrimaryButton } from '@style/DefaultStyled';
import { Col, Form, Row } from 'antd';
import { StoreValue } from 'antd/es/form/interface';
import { Add, TicketDiscount, Trash } from 'iconsax-react';
import { initialValueCondition } from 'interface/coupon';
import * as S from './style';

type Props = {
  loading: boolean;
  isView?: boolean;
};

const FormCondition = ({ loading, isView }: Props) => {
  const handleOnAddItem = (
    add: (defaultValue?: StoreValue, insertIndex?: number) => void,
    index: number
  ) => {
    add({ ...initialValueCondition }, index);
  };

  return (
    <>
      <H6>Applied condition</H6>

      <Row>
        <Col md={24}>
          <TextAreaCustom
            disabled={isView}
            label="Description"
            name="description"
            style={{ marginBottom: 0 }}
          />
        </Col>
      </Row>
      <Form.List name="conditions">
        {(fields, { add, remove }, { errors }) => (
          <>
            <S.HeaderWrapper>
              {!isView && (
                <S.ButtonCreate
                  loading={loading}
                  icon={<Add />}
                  onClick={() => handleOnAddItem(add, fields.length)}
                >
                  Add condition
                </S.ButtonCreate>
              )}
            </S.HeaderWrapper>
            <S.ConditionWrapper>
              <H6>Condition 1</H6>
              {fields.map((field, index) => (
                <Row
                  gutter={[24, 24]}
                  key={String(`key_${index}`)}
                  style={{ marginBottom: 8 }}
                >
                  <Col md={8}>
                    <Form.Item
                      label=""
                      name={[index, 'name']}
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        disabled={isView}
                        placeholder="Enter coupon name"
                        options={Object.entries(VoucherConditionLabel).map(
                          ([value, label]) => ({
                            label,
                            value,
                          })
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item
                      label=""
                      name={[index, 'operator']}
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        disabled={isView}
                        placeholder="Select category"
                        options={Object.values(ConditionOperator).map(
                          (value) => ({
                            label: value,
                            value,
                          })
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item
                      label=""
                      name={[index, 'value']}
                      style={{ marginBottom: 0 }}
                      rules={[
                        {
                          required: true,
                          message: 'Condition value is required',
                          type: 'number',
                          min: 1,
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder=""
                        disabled={isView}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />
                    </Form.Item>
                  </Col>
                  {!isView && (
                    <Col md={2}>
                      <div
                        className="delete"
                        aria-hidden
                        onClick={() => remove(index)}
                      >
                        <Trash />
                      </div>
                    </Col>
                  )}
                </Row>
              ))}

              {!isView && (
                <S.WrapperFooter>
                  <PrimaryButton
                    htmlType="submit"
                    icon={<TicketDiscount />}
                    loading={loading}
                  >
                    Create Coupon
                  </PrimaryButton>
                </S.WrapperFooter>
              )}
            </S.ConditionWrapper>
          </>
        )}
      </Form.List>
    </>
  );
};

export default FormCondition;
