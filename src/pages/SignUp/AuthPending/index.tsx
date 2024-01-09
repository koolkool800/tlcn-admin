import { SNS_STATE } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useParam from '@hooks/useParam';
import { infoUserBySNS, loginSNS } from '@redux/reducer/authReducer';
import authService from '@services/authService';
import { App, Spin } from 'antd';
import { Auth, AuthQueryParams } from 'interface';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const AuthPending = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  // Get the query parameters from the callback URL
  const urlParams = useParam() as any as AuthQueryParams;
  const { code, state } = urlParams;
  /**
   * used to get info user by authentication
   * @returns {Promise<void>}
   */
  const getInfoUser = async (): Promise<void> => {
    try {
      const requestParams: AuthQueryParams = {
        code,
        state,
      };

      const response = await authService.getInfoUserThirdParty(requestParams);
      const { data } = response;
      const convertData: Auth = {
        name: data?.name,
        email: data?.email,
        state,
        accessToken: null,
      };

      dispatch(infoUserBySNS(convertData));
      navigate(
        {
          pathname: ROUTES.SIGN_UP_WITH_SNS,
        },
        { replace: true }
      );
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
  /**
   * used to handle login
   * @returns {Promise<void>}
   */
  const handleLoginSNS = async (): Promise<void> => {
    try {
      const requestParams: AuthQueryParams = {
        code,
        state,
      };
      const response = await authService.loginSNS(requestParams);
      const accessToken = response.data?.accessToken;
      dispatch(loginSNS({ accessToken }));
      message.success(t(`HTTP_STATUS.${response.message}`));
      navigate(ROUTES.ALL, { replace: true });
    } catch (error: any) {
      message.info(t(`HTTP_STATUS.${error.errorCode}`));
      navigate(
        {
          pathname: ROUTES.LOGIN,
        },
        { replace: true }
      );
    }
  };

  const handleSignUpApple = () => {
    dispatch(
      infoUserBySNS({
        email: urlParams.email,
        name: urlParams?.name,
        state: urlParams.state,
        accessToken: null,
      })
    );
    navigate(
      {
        pathname: ROUTES.SIGN_UP_WITH_SNS,
      },
      { replace: true }
    );
  };
  useEffect(() => {
    switch (state) {
      case SNS_STATE.SIGN_UP_KAKAO:
        getInfoUser();
        break;
      case SNS_STATE.SIGN_UP_NAVER:
        getInfoUser();
        break;
      case SNS_STATE.SIGN_UP_APPLE:
        handleSignUpApple();
        break;
      default:
        handleLoginSNS();
        break;
    }
  }, []);

  return (
    <S.Container>
      <Spin />
    </S.Container>
  );
};

export default AuthPending;
