/* eslint-disable import/no-extraneous-dependencies */
import { Typography, Divider } from 'antd';
import {
  YoutubeOutlined,
  InstagramOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { useTheme } from 'styled-components';
import * as S from './style';
import ItemInfoCompany from './ItemInfoCompany';

const { Text } = Typography;

const Footer = () => {
  const theme = useTheme();
  return (
    <S.WrapperFooter>
      <S.WrapperActions>
        <div className="container-navigate-left">
          <Text>회사소개</Text>
          <Text>회사소개</Text>
          <Text>제휴제안</Text>
          <Text>제휴제안</Text>
        </div>
        <div className="container-navigate-right">
          <YoutubeOutlined />
          <InstagramOutlined />
          <WechatOutlined />
        </div>
      </S.WrapperActions>
      <Divider
        style={{
          minWidth: 1200,
          width: 1200,
          background: theme?.colors?.white,
        }}
      />
      <S.WrapperInfo>
        <ItemInfoCompany
          title="COMPANY"
          content={
            <div className="test-text">
              <Text style={{ color: theme?.colors?.white }}>
                Yeoljae Company
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Representative : Kim Jae-wook
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Address: 407, Yeongdong-daero, Gangnam-gu, Seoul, 06182, 4th
                floor, Cony Building
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                405, 45-11, Hope-ro 46beon-gil, Baebang-eup, Asan-si,
                Chungcheongnam-do, Republic of Korea, 31470
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Business registration number: 664-88-00573
              </Text>
            </div>
          }
        />
        <ItemInfoCompany
          title="BANK INFO"
          content={
            <div>
              <Text style={{ color: theme?.colors?.white }}>
                Mail-order business report number : 2021- Chungnam Asan-0558
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Personal information management manager: Kim Jae-wook
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Deposit account for group purchase : Kookmin Bank
                033201-04-177604
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Account Holder: Fruit Company Co., Ltd.
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Art Market deposit account : Kookmin Bank 350401-04-149344
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                Account Holder: Fruit Company Co., Ltd.
              </Text>
            </div>
          }
        />

        <ItemInfoCompany
          title="CONTACT"
          content={
            <div>
              <Text style={{ color: theme?.colors?.white }}>
                Company Mail (business partnership / company inquiry)
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                info@artnguide.com
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                CS Mail (customer CS inquiry)
              </Text>
              <br />
              <Text style={{ color: theme?.colors?.white }}>
                cs@artnguide.com
              </Text>
            </div>
          }
        />
      </S.WrapperInfo>
    </S.WrapperFooter>
  );
};

export default Footer;
