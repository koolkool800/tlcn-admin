import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { REGEX } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import authService from '@services/authService';
import { Form, message } from 'antd';
import { ResetPasswordType, ResponseModel } from 'interface';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const email = Form.useWatch('email', form);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hasSend, setHasSend] = useState(false);

  const theme = useTheme() as DefaultTheme;

  const onFinish = async (values: ResetPasswordType) => {
    setLoading(true);
    try {
      await authService.resetPassword(values);
      message.success(t('auth.changePasswordSuccess'));
      navigate(ROUTES.LOGIN);
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(error.errorCode as string));
    }

    setLoading(false);
  };

  const disableOtp = useMemo(() => {
    return !REGEX.EMAIL.test(email);
  }, [email]);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      await authService.forgotPassword({
        email,
      });
      setHasSend(true);
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(error.errorCode as string));
      setHasSend(false);
    }
    setLoading(false);
  };

  return (
    <S.Container>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, minWidth: 384 }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>{t('auth.forgotPasswordTitle')}</h3>
        </S.LogoWrapper>
        <Form.Item
          label={t('auth.emailLabel')}
          name="email"
          required
          rules={[
            {
              required: true,
              type: 'email',
              message: t('auth.emailRequired'),
            },
          ]}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              allowClear
              type="input"
              placeholder={t('auth.emailPlaceholder')}
            />
            <S.BtnOTP
              onClick={handleForgotPassword}
              disabled={disableOtp}
              loading={loading}
            >
              {hasSend ? t('auth.resend') : t('auth.sendOTP')}
            </S.BtnOTP>
          </div>
        </Form.Item>

        <Form.Item
          label={t('auth.otpLabel')}
          name="otp"
          required
          rules={[
            {
              required: true,
              message: t('auth.otpRequired'),
            },
          ]}
        >
          <Input
            allowClear
            type="input"
            placeholder={t('auth.otpPlaceholder')}
          />
        </Form.Item>
        <S.Password>
          <span className="label">{t('auth.passwordLabel')}</span>
          <span className="description">{t('auth.passwordDesc')}</span>
        </S.Password>
        <Form.Item
          name="newPassword"
          required
          rules={[
            {
              required: true,
              pattern: new RegExp(REGEX.PASSWORD),
              message: t('auth.passwordInvalid'),
            },
          ]}
        >
          <Input
            allowClear
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
          />
        </Form.Item>
        <Form.Item
          label={t('auth.confirmPasswordLabel')}
          name="confirmPassword"
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !(value === '' || value === undefined) &&
                  getFieldValue('newPassword') === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('auth.confirmPasswordInvalid'))
                );
              },
            }),
          ]}
        >
          <Input
            allowClear
            type="password"
            placeholder={t('auth.confirmPasswordLabel')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 20 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            loading={loading}
          >
            {t('auth.changePassword')}
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
};

export default ForgotPassword;
