import { SNS_STATE } from './codeConstants';

const queryParamsNaverSignup = new URLSearchParams({
  response_type: 'code',
  client_id: 'vydLi5Uz0MtdZr2tTQkr',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  state: SNS_STATE.SIGN_UP_NAVER,
});
const queryParamsKakaoSignup = new URLSearchParams({
  response_type: 'code',
  client_id: 'e0dca47fba1b32db1a2e6a395590ea62',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  state: SNS_STATE.SIGN_UP_KAKAO,
});
const queryParamsNaverLogin = new URLSearchParams({
  response_type: 'code',
  client_id: 'vydLi5Uz0MtdZr2tTQkr',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  state: SNS_STATE.SIGN_IN_NAVER,
});
const queryParamsKakaoLogin = new URLSearchParams({
  response_type: 'code',
  client_id: 'e0dca47fba1b32db1a2e6a395590ea62',
  redirect_uri: 'http://localhost:3000/api/auth/callback',
  state: SNS_STATE.SIGN_IN_KAKAO,
});

const queryParamsAppleSignUp = new URLSearchParams({
  response_type: 'code',
  scope: 'name email',
  response_mode: 'form_post',
  client_id: 'api.resellticket.co.kr.sid',
  redirect_uri:
    'https://api.resellticket.co.kr/api/v1/auth/apple/sign-in-return-url',
  state: SNS_STATE.SIGN_UP_APPLE,
});
const queryParamsAppleLogin = new URLSearchParams({
  response_type: 'code',
  scope: 'name email',
  response_mode: 'form_post',
  client_id: 'api.resellticket.co.kr.sid',
  redirect_uri:
    'https://api.resellticket.co.kr/api/v1/auth/apple/sign-in-return-url',
  state: SNS_STATE.SIGN_IN_APPLE,
});

// url sign up
export const kakaoAuthUrlSignup = `https://kauth.kakao.com/oauth/authorize?${queryParamsKakaoSignup.toString()}`;
export const naverAuthUrlSignup = `https://nid.naver.com/oauth2.0/authorize?${queryParamsNaverSignup.toString()}`;
export const appleAuthUrlSignup = `https://appleid.apple.com/auth/authorize?${queryParamsAppleSignUp.toString()}`;

// url login
export const kakaoAuthUrlLogin = `https://kauth.kakao.com/oauth/authorize?${queryParamsKakaoLogin.toString()}`;
export const naverAuthUrlLogin = `https://nid.naver.com/oauth2.0/authorize?${queryParamsNaverLogin.toString()}`;
export const appleAuthUrlLogin = `https://appleid.apple.com/auth/authorize?${queryParamsAppleLogin.toString()}`;
