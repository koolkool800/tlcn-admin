import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import {
  AuthQueryParams,
  AuthSignUp,
  ChangePasswordType,
  ForgotPasswordType,
  LoginType,
  ResetPasswordType,
  ResponseModel,
  ResponseResult,
} from 'interface';

const authService = {
  login: async (model: LoginType) => {
    return axiosInstance().post<
      never,
      ResponseModel<{
        accessToken: string;
        user: { role: string };
      }>
    >(ROUTE_API.LOGIN, model);
  },
  forgotPassword: async (model: ForgotPasswordType) => {
    return axiosInstance().post(ROUTE_API.FORGOT_PASSWORD, model);
  },
  resetPassword: async (model: ResetPasswordType) => {
    return axiosInstance().post(ROUTE_API.RESET_PASSWORD, model);
  },
  signUp: async (params: AuthSignUp): Promise<ResponseResult> => {
    return axiosInstance().post(ROUTE_API.SIGN_UP, params);
  },
  getInfoUserThirdParty: async (
    params: AuthQueryParams
  ): Promise<ResponseResult> => {
    return axiosInstance().get(ROUTE_API.GET_INFO_KAKAO, {
      params,
    });
  },
  changePassword: async (model: ChangePasswordType) => {
    return axiosInstance().post(ROUTE_API.CHANGE_PASSWORD, model);
  },
  loginSNS: async (params: AuthQueryParams): Promise<ResponseResult> => {
    return axiosInstance().post(ROUTE_API.LOGIN_SNS, params);
  },
};

export default authService;
