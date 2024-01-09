import logo from '@assets/images/logo.png';
import { ROUTES } from '@constants/routes';
import usePatternCurrentPath, { Route } from '@hooks/usePatternCurrentPath';
import { Button, Menu, MenuProps } from 'antd';
import {
  ArchiveBook,
  Buildings,
  Car,
  CardSend,
  Category,
  Celsius,
  Chart,
  DirectUp,
  Gallery,
  GalleryEdit,
  Graph,
  LampCharge,
  Money4,
  Moneys,
  ShoppingCart,
  SidebarLeft,
  SidebarRight,
  User,
  HambergerMenu,
  CloseSquare,
} from 'iconsax-react';
import { Link } from 'react-router-dom';
import CustomLink from '../CustomLink';
import * as S from './style';

interface Props {
  collapsed?: boolean;
  setCollapsed: (arg0: boolean) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string | number | string[],
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const sidebars = [
  {
    label: 'Dashboard',
    icon: <Category size="16" />,
    route: ROUTES.DASHBOARD,
    routePattern: [ROUTES.ALL],
  },
  // {
  //   label: 'User Management',
  //   icon: <User size="16" />,
  //   route: ROUTES.USER_MANAGEMENT,
  //   routePattern: [ROUTES.USER_MANAGEMENT, ROUTES.USER_MANAGEMENT_DETAIL],
  // },
  {
    label: 'Event Management',
    icon: <ArchiveBook size="16" />,
    route: ROUTES.EVENT_MANAGEMENT,
    routePattern: [ROUTES.EVENT_MANAGEMENT, ROUTES.EVENT_MANAGEMENT_CREATE],
  },
  // {
  //   label: 'Top Event set up',
  //   icon: <CardSend size="16" />,
  //   route: ROUTES.TOP_EVENT_SET_UP,
  //   routePattern: [ROUTES.TOP_EVENT_SET_UP],
  // },
  {
    label: 'Register Sell Management',
    icon: <Celsius size="16" />,
    route: ROUTES.REGISTER_SELL_MANAGEMENT,
    routePattern: [
      ROUTES.REGISTER_SELL_MANAGEMENT,
      ROUTES.REGISTER_SELL_MANAGEMENT_DETAIL,
    ],
  },
  {
    label: 'Coupon Management',
    icon: <Money4 size="16" />,
    route: ROUTES.COUPON_MANAGEMENT,
    routePattern: [
      ROUTES.COUPON_MANAGEMENT,
      ROUTES.COUPON_MANAGEMENT_CREATE,
      ROUTES.COUPON_MANAGEMENT_VIEW,
      ROUTES.COUPON_MANAGEMENT_UPDATE(':id'),
    ],
  },
  {
    label: 'Withdraw Management',
    icon: <Moneys size="16" />,
    route: ROUTES.WITHDRAW_REQUEST_MANAGEMENT,
    routePattern: [
      ROUTES.WITHDRAW_REQUEST_MANAGEMENT,
      ROUTES.WITHDRAW_REQUEST_DETAIL_PATTERN,
    ],
  },
  {
    label: 'Order Management',
    icon: <ShoppingCart size="16" />,
    route: ROUTES.ORDER_MANAGEMENT,
    routePattern: [ROUTES.ORDER_MANAGEMENT, ROUTES.ORDER_MANAGEMENT_DETAIL],
  },
  // {
  //   label: 'Q&A',
  //   icon: <LampCharge size="16" />,
  //   route: ROUTES.FAQ_MANAGEMENT,
  //   routePattern: [ROUTES.FAQ_MANAGEMENT, ROUTES.FAQ_MANAGEMENT_DETAIL],
  // },
  // {
  //   label: 'Banner Management',
  //   icon: <GalleryEdit size="16" />,
  //   route: ROUTES.BANNER_MANAGEMENT,
  //   routePattern: [
  //     ROUTES.BANNER_MANAGEMENT,
  //     ROUTES.BANNER_MANAGEMENT_CREATE,
  //     ROUTES.BANNER_MANAGEMENT_DETAIL,
  //   ],
  // },
  // {
  //   label: 'Navigation set up',
  //   icon: <DirectUp size="16" />,
  //   route: ROUTES.NAVIGATION_SET_UP_LIST,
  //   routePattern: [
  //     ROUTES.NAVIGATION_SET_UP_LIST,
  //     ROUTES.NAVIGATION_SET_UP_DETAIL_PATTERN,
  //   ],
  // },
  {
    label: 'Shipping fee set up',
    icon: <Car size="16" />,
    route: ROUTES.SHIPPING_FEE_SETUP,
    routePattern: [ROUTES.SHIPPING_FEE_SETUP],
  },
  {
    label: 'Clearance Fee Set Up',
    icon: <Gallery size="16" />,
    route: ROUTES.CLEARANCE_FEE_SETUP,
    routePattern: [ROUTES.CLEARANCE_FEE_SETUP],
  },
  // {
  //   label: '1:1 Inquiry',
  //   icon: <Graph size="16" />,
  //   route: ROUTES.INQUIRY_MANAGEMENT,
  //   routePattern: [
  //     ROUTES.INQUIRY_MANAGEMENT,
  //     ROUTES.INQUIRY_MANAGEMENT_REPLY,
  //     ROUTES.INQUIRY_MANAGEMENT_VIEW,
  //   ],
  // },
  {
    label: 'Report management',
    icon: <Chart size="16" />,
    route: ROUTES.REPORT_MANAGEMENT,
    routePattern: [ROUTES.REPORT_MANAGEMENT],
  },
  {
    label: 'Register seller Management',
    icon: <Buildings size="16" />,
    route: ROUTES.REGISTER_SELLER_MANAGEMENT,
    routePattern: [ROUTES.REGISTER_SELLER_MANAGEMENT],
  },
];

const menuList: MenuItem[] = sidebars.map((item) =>
  getItem(
    <Link to={item.route}>{item.label}</Link>,
    item.routePattern,
    item.icon
  )
);

function SideBar({ collapsed, setCollapsed }: Props) {
  const patternCurrentPath: Route | undefined | null =
    usePatternCurrentPath(sidebars);

  return (
    <S.Sidebar>
      {collapsed && (
        <S.SidebarHead>
          <Button
            type="text"
            color="#fff"
            icon={
              collapsed ? (
                <HambergerMenu size="32" color="#fff" />
              ) : (
                <CloseSquare size="32" color="#fff" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </S.SidebarHead>
      )}
      {!collapsed && (
        <S.SidebarHead>
          <CustomLink to={ROUTES.ALL}>
            <img src={logo} alt={logo} />
          </CustomLink>
          <Button
            type="text"
            icon={
              collapsed ? (
                <HambergerMenu size="32" color="#fff" />
              ) : (
                <CloseSquare size="32" color="#fff" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </S.SidebarHead>
      )}

      <S.SidebarBody>
        <Menu
          mode="inline"
          items={menuList}
          selectedKeys={
            patternCurrentPath
              ? [patternCurrentPath?.routePattern?.join(',')]
              : []
          }
        />
      </S.SidebarBody>
    </S.Sidebar>
  );
}

export default SideBar;
