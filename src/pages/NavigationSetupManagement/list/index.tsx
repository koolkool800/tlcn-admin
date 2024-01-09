import Button from '@components/common/Button';
import { ROUTES } from '@constants/routes';
import navigationService from '@services/navigationService';
import { H5, H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { List, message } from 'antd';
import { NavigationData } from 'interface/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const NavigationSetupList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [dataHeader, setDataHeader] = useState<NavigationData[]>([]);
  const [dataHome, setDataHome] = useState<NavigationData[]>([]);

  const fetchNavigation = async () => {
    try {
      const res = await navigationService.get();
      const data = res?.data || [];
      const convertDataHeader = data.filter((item) => item.inTopBar);
      const convertDataHome = data.filter((item) => !item.inTopBar);
      setDataHeader(convertDataHeader);
      setDataHome(convertDataHome);
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  return (
    <S.Layout>
      <H5>NAVIGATION SET UP</H5>
      <S.LayoutItem>
        <List
          size="small"
          header={<H6>Header</H6>}
          bordered
          dataSource={dataHeader}
          renderItem={(item) => (
            <List.Item>
              <Typography>{item.name}</Typography>
              {item === dataHeader[0] && (
                <span>
                  <Button
                    className="btn-create"
                    bgcolor={theme.colors.primarySolid500}
                    color="#000"
                    onClick={() =>
                      navigate(`${ROUTES.NAVIGATION_SET_UP_DETAIL}/${item.id}`)
                    }
                  >
                    Set up
                  </Button>
                </span>
              )}
            </List.Item>
          )}
        />

        <List
          size="small"
          header={<H6>Home</H6>}
          bordered
          dataSource={dataHome}
          renderItem={(item) => (
            <List.Item>
              <Typography>{item.name}</Typography>
              <span>
                <Button
                  className="btn-create"
                  bgcolor={theme.colors.primarySolid500}
                  color="#000"
                  onClick={() =>
                    navigate(`${ROUTES.NAVIGATION_SET_UP_DETAIL}/${item.id}`)
                  }
                >
                  Set up
                </Button>
              </span>
            </List.Item>
          )}
        />
      </S.LayoutItem>
    </S.Layout>
  );
};

export default NavigationSetupList;
