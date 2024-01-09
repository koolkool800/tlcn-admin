import Button from '@components/common/Button';
import Input from '@components/common/Input';
import SelectCategory from '@components/faqManagement/SelectCategory';
import { ROUTES } from '@constants/routes';
import faqService from '@services/faqServices';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FaqCreateType, FaqType } from 'interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const StatusPageFaq = {
  create: 'Create FAQ',
  update: 'Update FAQ',
  details: 'FAQ Detail',
};
type CreateFaqProp = {
  currentFaq?: FaqType;
  status: keyof typeof StatusPageFaq;
};
const CreateFaq = ({ currentFaq, status }: CreateFaqProp) => {
  const [form] = useForm<FaqCreateType>();
  const navigate = useNavigate();
  const handleOnFinish = async (values: FaqCreateType) => {
    if (status === 'create') {
      try {
        const res = await faqService.createFaq(values);
        if (res.result) {
          message.success(res.message);
          navigate(ROUTES.FAQ_MANAGEMENT);
        }
      } catch (error) {
        /** ERROR */
      }
    }
    if (status === 'update') {
      if (currentFaq) {
        try {
          const res = await faqService.updateFaq({
            id: currentFaq.faqId,
            categoryId: values.categoryId,
            engQuestion: values.engQuestion,
            engAnswer: values.engAnswer,
            korAnswer: values.korAnswer,
            korQuestion: values.korQuestion,
          });
          if (res.result) {
            message.success(res.message);
            navigate(ROUTES.FAQ_MANAGEMENT);
          }
        } catch (error) {
          /** ERROR */
        }
      }
    }
  };

  useEffect(() => {
    if (currentFaq) {
      form.setFieldsValue({
        engAnswer: currentFaq.engAnswer,
        engQuestion: currentFaq.engQuestion,
        korAnswer: currentFaq.korAnswer,
        korQuestion: currentFaq.korQuestion,
        categoryId: currentFaq.categoryId,
      });
    }
  }, [currentFaq]);

  const isView = StatusPageFaq[status] === 'FAQ Detail';

  return (
    <S.NewFaqContainer>
      <H5>{StatusPageFaq[status]}</H5>
      <Form form={form} layout="vertical" onFinish={handleOnFinish}>
        <div className="form-wrap">
          <SelectCategory disabled={isView} />
          <div className="form-input-wrap">
            <Form.Item
              name="korQuestion"
              label="Question (Kor)"
              rules={[{ required: true, message: 'This field is required!' }]}
            >
              <Input
                type="input"
                placeholder="Enter question"
                disabled={isView}
              />
            </Form.Item>
            <Form.Item
              name="korAnswer"
              label="Answer (Kor)"
              rules={[{ required: true, message: 'This field is required!' }]}
            >
              <Input
                type="input"
                placeholder="Enter answer"
                disabled={isView}
              />
            </Form.Item>
            <Form.Item
              name="engQuestion"
              label="Question (Eng)"
              rules={[{ required: true, message: 'This field is required!' }]}
            >
              <Input
                type="input"
                placeholder="Enter question"
                disabled={isView}
              />
            </Form.Item>
            <Form.Item
              name="engAnswer"
              label="Answer (Eng)"
              rules={[{ required: true, message: 'This field is required!' }]}
            >
              <Input
                type="input"
                placeholder="Enter answer"
                disabled={isView}
              />
            </Form.Item>
          </div>
          {(status === 'create' || status === 'update') && (
            <Button
              htmlType="submit"
              className="btn-submit"
              bgcolor={theme.colors.primarySolid500}
              color="#000"
            >
              {status === 'create' && 'Create'}
              {status === 'update' && 'Update'}
            </Button>
          )}
          {StatusPageFaq[status] === 'update' && (
            <Button
              htmlType="submit"
              className="btn-submit"
              bgcolor={theme.colors.primarySolid500}
              color="#000"
            >
              {StatusPageFaq[status] === 'update' && 'Update'}
            </Button>
          )}
        </div>
      </Form>
    </S.NewFaqContainer>
  );
};

export default CreateFaq;
