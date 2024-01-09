import email from '@assets/images/email.png';
import kakao from '@assets/images/kakao.png';
import naver from '@assets/images/naver.png';
import os from '@assets/images/os.png';
import BtnSocial from '@components/login/BtnSocial';
import {
  appleAuthUrlSignup,
  kakaoAuthUrlSignup,
  naverAuthUrlSignup,
} from '@constants/snsConstant';
import { Form } from 'antd';
import * as S from './style';

const socialList = [
  {
    icon: email,
    content: 'Sign up with Email',
    type: 'email',
  },
  {
    icon: os,
    content: 'Sign up with Apple',
    type: 'apple',
  },
  {
    icon: kakao,
    content: 'Sign up with Kakao',
    type: 'kakao',
  },
  {
    icon: naver,
    content: 'Sign up with Naver',
    type: 'naver',
  },
];

const SignUp = () => {
  /**
   * the event sign up sns
   * @param type type sign up email/apple/kakao/naver
   * @returns {void}
   */
  const handleSignUPSNS = (type: string): void => {
    switch (type) {
      case 'kakao':
        window.location.replace(kakaoAuthUrlSignup);
        break;
      case 'naver':
        window.location.replace(naverAuthUrlSignup);
        break;
      case 'apple':
        window.location.replace(appleAuthUrlSignup);
        break;
      default:
        break;
    }
  };

  return (
    <S.Container>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, minWidth: 384 }}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>Sign Up</h3>
        </S.LogoWrapper>

        <S.Social>
          {socialList.map((social) => {
            return (
              <BtnSocial
                key={social.type}
                icon={social.icon}
                text={social.content}
                onClick={() => handleSignUPSNS(social.type)}
              />
            );
          })}
        </S.Social>
      </Form>
    </S.Container>
  );
};

export default SignUp;
