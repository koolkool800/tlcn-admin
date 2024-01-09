import MyHeader from '@components/common/MyHeader';
import SideBar from '@components/common/SideBar';
import { Layout } from 'antd';
import { memo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as S from './styles';

const { Header, Content, Sider } = Layout;

const MainTemplate = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <S.Wrapper className="giabao">
      <Layout className="ant-layout">
        <Sider
          className="sider"
          width="280px"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Sider>

        <Layout style={{ background: 'rgb(13,17,23)' }}>
          <Header>
            <MyHeader />
          </Header>

          <Content
            style={{
              padding: '18px 24px 24px 24px',
              minHeight: '100vh',
            }}
            className="giabao2"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </S.Wrapper>
  );
};

export default memo(MainTemplate);
