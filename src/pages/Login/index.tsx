import logo from '@assets/images/logo.png';
import Checkbox from '@components/common/Checkbox';
import FlashMessage from '@components/common/FlashMessage';
import Input from '@components/common/Input';
import { ROLE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useParam from '@hooks/useParam';
import { login } from '@redux/reducer/authReducer';
import authService from '@services/authService';
import { PrimaryButton } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { FormLogin, ResponseModel } from 'interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as S from './style';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme: any = useTheme();
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);
  const [loading, setLoading] = useState(false);
  // check message from url
  const { flashMessage } = useParam();

  /**
   * the event click submit button
   * @param values value form
   * @returns {Promise<void>}
   */
  const onFinish = async (values: FormLogin) => {
    setLoading(true);
    try {
      const { remember, ...restValue } = values;
      const response: ResponseModel<{
        accessToken: string;
        user: { role: string };
      }> = await authService.login(restValue);

      if (response?.data?.user?.role !== ROLE.ADMIN) {
        message.error('You can not access this page');
        setLoading(false);
        return;
      }

      const convertData = {
        accessToken: response.data.accessToken,
        user: response?.data?.user,
        remember,
      };
      dispatch(login(convertData));
      message.success(t(`HTTP_STATUS.${response.message}`));
      navigate(ROUTES.ALL, { replace: true });
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  return (
    <S.Container>
      <FlashMessage
        type="warning"
        open={!!flashMessage}
        messageContent={t(`HTTP_STATUS.${flashMessage}`)}
      />

      <Form
        form={form}
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, minWidth: 384 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          <img src={logo} alt="logo" />
        </S.LogoWrapper>
        <Form.Item
          label={t('auth.emailLabel')}
          name="email"
          rules={[
            { required: true, type: 'email', message: 'Email is required' },
          ]}
        >
          <Input
            allowClear
            type="input"
            placeholder={t('auth.emailPlaceholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('auth.passwordLabel')}
          name="password"
          style={{ marginBottom: 12 }}
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input
            allowClear
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ marginBottom: 20 }}
        >
          <Checkbox>{t('auth.rememberMe')}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 20 }}>
          <PrimaryButton
            loading={loading}
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.solid500}
            disabled={!(!!email && !!password)}
          >
            {t('auth.buttonLogin')}
          </PrimaryButton>
        </Form.Item>
        {/* <S.Extend>
          <CustomLink to={ROUTES.SIGN_UP} style={{ textAlign: 'right' }}>
            <span>{t('auth.buttonSignUp')}</span>
          </CustomLink>
          <S.Line />
          <CustomLink to={ROUTES.FORGOT_PASSWORD} style={{ textAlign: 'left' }}>
            <span>{t('auth.buttonForgotPassword')}</span>
          </CustomLink>
        </S.Extend> */}
      </Form>
    </S.Container>
  );
};

export default Login;
