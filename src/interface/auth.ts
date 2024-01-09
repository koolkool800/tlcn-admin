import { UserType } from './user';

export type LoginType = {
  email: string;
  password: string;
};

export type FormLogin = LoginType & {
  remember: boolean;
};

export type Auth = {
  email: string | undefined;
  name: string | undefined;
  accessToken: string | null;
  state?: string;
  user?: UserType | null;
};

export type ForgotPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  email: string;
  otp: string;
  newPassword: string;
};

export interface AuthQueryParams {
  code: string | undefined;
  state: string | undefined;
  email?: string;
  name?: string;
}

export interface AuthSignUp {
  email: string | undefined;
  name: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  address?: string | undefined;
  detailAddress?: string | undefined;
  state?: string | undefined;
}
export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
};
