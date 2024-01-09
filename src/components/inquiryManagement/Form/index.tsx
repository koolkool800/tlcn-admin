import Input from '@components/common/Input';
import TextAreaCustom from '@components/common/TextArea';
import { ROUTES } from '@constants/routes';
import inquiryService from '@services/inquiryService';
import { PrimaryButton } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { ObjectLiteral } from 'interface/general';
import { InquiryType } from 'interface/inquiry';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  model: InquiryType;
  isView: boolean;
};

const FormInquiry = ({ model, isView }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      title: model?.title,
      question: model?.question,
      answer: model?.answer,
    });
  }, [model]);

  const onFinish = async (values: ObjectLiteral) => {
    setLoading(true);
    try {
      const res = await inquiryService.reply(Number(model?.id), values?.answer);
      if (res?.data) {
        message.success('Replied successful');
        navigate(ROUTES.INQUIRY_MANAGEMENT);
      }
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Title" name="title">
          <Input placeholder="" disabled />
        </Form.Item>

        <TextAreaCustom
          name="question"
          placeholder=""
          label="Question"
          disabled
          style={{ minHeight: '50px' }}
        />

        <TextAreaCustom
          rules={[
            {
              required: true,
              message: 'Answer is required',
            },
          ]}
          disabled={isView}
          name="answer"
          placeholder=""
          label="Answer"
          required
          style={{ minHeight: '50px' }}
        />
        {!isView && (
          <PrimaryButton
            loading={loading}
            htmlType="submit"
            style={{ width: 'fit-content' }}
          >
            Reply
          </PrimaryButton>
        )}
      </Form>
    </>
  );
};

export default FormInquiry;
