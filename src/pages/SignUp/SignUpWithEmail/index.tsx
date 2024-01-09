import TermAndCondition from '@components/signUp/TermAndCondition';
import { REGEX } from '@constants/codeConstants';
import { H5 } from '@style/DefaultStyled';
import { Form } from 'antd';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import * as S from './style';

type FormData = {
  phoneNumber: string | undefined;
  name: string | undefined;
  email: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  detailAddress: string | undefined;
  address: string | undefined;
  term: string | undefined;
};

const SignUpWithEmail = () => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [openDaum, setOpenDaum] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleShowDaumComponent = () => {
    setOpenDaum(true);
  };

  const handleHideDaumComponent = () => {
    setOpenDaum(false);
  };

  const onFinish = (values: FormData) => {
    const { newPassword, term, ...restValues } = values;
    console.log('Success:', restValues);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleComplete = (data: any) => {
    form.setFieldsValue({
      address: data.address,
    });
  };

  useEffect(() => {
    function handleClickOutsideSignOut(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDaum(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsideSignOut);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutsideSignOut);
    };
  }, [wrapperRef]);

  return (
    <S.Container>
      <Form
        form={form}
        name="register"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, minWidth: 384 }}
        initialValues={{ phoneNumber: '0376123456', name: 'Hạo Duy' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <S.LogoWrapper>
          <H5>Sign Up Account</H5>
        </S.LogoWrapper>
        <Form.Item label="Phone number" name="phoneNumber">
          <Input disabled type="input" placeholder="XX XXXX YYY" />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input disabled type="input" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid e-mail!',
            },
            {
              required: true,
              message: 'Please input your e-mail!',
            },
          ]}
        >
          <Input allowClear type="input" placeholder="Enter your email" />
        </Form.Item>
        <S.Label>
          <span className="label">New password</span>
          <span className="description">
            Password is between 8-20 characters, including both letters,
            <br />
            number and symbols
          </span>
        </S.Label>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              pattern: new RegExp(REGEX.PASSWORD),
              message: 'Password is required',
            },
          ]}
        >
          <Input
            allowClear
            type="password"
            placeholder="Enter your new password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
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
                  new Error(
                    t('forgotPassword.form.confirmPassword.rules.incorrect')
                  )
                );
              },
            }),
          ]}
        >
          <Input
            allowClear
            type="password"
            placeholder="Re-enter your new password"
          />
        </Form.Item>

        <Form.Item>
          <S.Label>
            <span className="label">Address</span>
          </S.Label>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            }}
          >
            <>
              {openDaum && (
                <S.WrapperDaumCode ref={wrapperRef}>
                  <DaumPostcode
                    onComplete={handleComplete}
                    onClose={handleHideDaumComponent}
                  />
                  <CloseCircle
                    size="32"
                    className="icon"
                    onClick={handleHideDaumComponent}
                  />
                </S.WrapperDaumCode>
              )}

              <Input
                type="input"
                placeholder="Search address"
                suffix={<SearchNormal1 size="20" color="#FFFFFF" />}
                onClick={handleShowDaumComponent}
              />
            </>
            <Form.Item
              name="address"
              style={{ margin: 0, width: '100%' }}
              rules={[
                {
                  required: true,
                  message: 'Please input your address!',
                },
              ]}
            >
              <Input allowClear type="input" placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="detailAddress"
              style={{ margin: 0, width: '100%' }}
            >
              <Input allowClear type="input" placeholder="Detailed address" />
            </Form.Item>
          </div>
        </Form.Item>

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

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: 40 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
};

export default SignUpWithEmail;
