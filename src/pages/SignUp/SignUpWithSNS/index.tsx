import Button from '@components/common/Button';
import FormSearchAddress from '@components/common/FormSearchAddress';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import TermAndCondition from '@components/signUp/TermAndCondition';
import { ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import authService from '@services/authService';
import { App, Form } from 'antd';
import { AuthSignUp } from 'interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as S from './style';

interface FormValue extends AuthSignUp {
  term: boolean;
}

const SignUpWithSNS = () => {
  const { t } = useTranslation();
  const theme: any = useTheme();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [openModal, setOpenModal] = useState(false);
  const auth = useAuth();
  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  /**
   * event when clicking submit form
   * @param values value of form
   * @returns {Promise<void>}
   */
  const onFinish = async (values: FormValue): Promise<void> => {
    try {
      const { term, ...restValues } = values;
      const authSignUpParams: AuthSignUp = {
        ...restValues,
        state: auth.state,
      };
      const response = await authService.signUp(authSignUpParams);

      if (response.result) {
        handleOpenModal();
      }
    } catch (error: any) {
      message.info(t(`HTTP_STATUS.${error.errorCode}`));
      navigate(
        {
          pathname: ROUTES.SIGN_UP,
        },
        { replace: true }
      );
    }
  };

  return (
    <S.Container>
      <Form
        form={form}
        name="sign-up-sns"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, minWidth: 384 }}
        initialValues={{ name: auth.name, email: auth.email }}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>Sign Up Account</h3>
        </S.LogoWrapper>

        <Form.Item label="Name" name="name" required>
          <Input
            disabled={Boolean(auth.name)}
            type="input"
            placeholder="Enter your name"
          />
        </Form.Item>
        <Form.Item label="Email" name="email" required>
          <Input disabled type="input" placeholder="Enter your email" />
        </Form.Item>

        <FormSearchAddress />

        <Form.Item
          name="term"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Please agree to all terms and conditions!')
                );
              },
            }),
          ]}
        >
          <TermAndCondition />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
          >
            Sign up
          </Button>
        </Form.Item>

        <Modal
          isOpen={openModal}
          onCancel={() => {
            handleCloseModal();
          }}
        >
          <>
            <div className="content-modal ">
              <h5>Sign up account successfully</h5>
              <p>
                Congratulations that you have successfully registered for a
                Resell Ticket account
              </p>
            </div>

            <Button
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
              onClick={() => {
                handleCloseModal();
                navigate(
                  {
                    pathname: ROUTES.LOGIN,
                  },
                  { replace: true }
                );
              }}
            >
              Login
            </Button>
          </>
        </Modal>
      </Form>
    </S.Container>
  );
};

export default SignUpWithSNS;
