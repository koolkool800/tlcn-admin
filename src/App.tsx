import Loader from '@components/common/Loader';
import { ROUTES } from '@constants/routes';
import RegisterSellerManagement from '@pages/RegisterSellerManagement/List';

import { PrivateRoutes } from '@routes';
import GlobalStyles from '@style/GlobalStyle';
import theme from '@style/themes/default';
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// -----------  COMPONENTS IMPORT --------------------------
const MainTemplate = lazy(() => import('@pages/MainTemplate'));
const Login = lazy(() => import('@pages/Login'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));
const SignUp = lazy(() => import('@pages/SignUp'));
const SignUpWithEmail = lazy(() => import('@pages/SignUp/SignUpWithEmail'));
const SignUpWithSNS = lazy(() => import('@pages/SignUp/SignUpWithSNS'));
const NotFound = lazy(() => import('@pages/NotFound'));
const UserManagement = lazy(() => import('@pages/UserManagement/List'));
const UserManagementDetail = lazy(() => import('@pages/UserManagement/Detail'));
const EventManagement = lazy(() => import('@pages/EventManagement'));
const CreateEvent = lazy(() => import('@pages/EventManagement/create'));

const WithdrawDetail = lazy(
  () => import('@pages/WithdrawRequestManagement/detail')
);

const TopEventSetUp = lazy(() => import('@pages/TopEventSetUp'));
const WithdrawRequestManagement = lazy(
  () => import('@pages/WithdrawRequestManagement/list')
);
const RegisterSellManagement = lazy(
  () => import('@pages/RegisterSellManagement')
);
const FaqManagement = lazy(() => import('@pages/FaqManagement'));
const FaqDetail = lazy(() => import('@pages/FaqManagement/FaqDetail'));

const CreateFaq = lazy(() => import('@pages/FaqManagement/CreateFaq'));
const CouponManagement = lazy(() => import('@pages/CouponManagement/List'));
const CreateCouponManagement = lazy(
  () => import('@pages/CouponManagement/Create')
);
const OrderManagement = lazy(() => import('@pages/OrderManagement/List'));
const OrderDetailManagement = lazy(
  () => import('@pages/OrderManagement/Detail')
);
const BannerManagement = lazy(() => import('@pages/BannerManagement/'));
const CreateBanner = lazy(() => import('@pages/BannerManagement/CreateBanner'));
const BannerDetail = lazy(() => import('@pages/BannerManagement/BannerDetail'));
const ShippingFeeSetUp = lazy(() => import('@pages/ShippingFeeSetUp'));
const ClearanceFeeSetUp = lazy(() => import('@pages/ClearanceFeeSetUp'));
const InquiryManagement = lazy(() => import('@pages/InquiryManagement/List'));
const InquiryManagementReply = lazy(
  () => import('@pages/InquiryManagement/Reply')
);
const InquiryManagementView = lazy(
  () => import('@pages/InquiryManagement/View')
);

const ReportManagement = lazy(() => import('@pages/ReportManagement/List'));
const RegisterSellManagementDetail = lazy(
  () => import('@pages/RegisterSellManagement/Detail')
);
const CouponManagementView = lazy(() => import('@pages/CouponManagement/View'));
const DetailEvent = lazy(() => import('@pages/EventManagement/Detail'));
const NavigationSetupDetail = lazy(
  () => import('@pages/NavigationSetupManagement/detail')
);
const NavigationSetupList = lazy(
  () => import('@pages/NavigationSetupManagement/list')
);

const Dashboard = lazy(() => import('@pages/Dashboard'));
const CouponUpdate = lazy(() => import('@pages/CouponManagement/Update'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route element={<MainTemplate />}>
              <Route element={<PrivateRoutes />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route
                  path={ROUTES.USER_MANAGEMENT}
                  element={<UserManagement />}
                />
                <Route
                  path={ROUTES.USER_MANAGEMENT_DETAIL}
                  element={<UserManagementDetail />}
                />
                <Route
                  path={ROUTES.EVENT_MANAGEMENT}
                  element={<EventManagement />}
                />
                <Route
                  path={ROUTES.DETAIL_MANAGEMENT}
                  element={<DetailEvent />}
                />
                <Route
                  path={ROUTES.TOP_EVENT_SET_UP}
                  element={<TopEventSetUp />}
                />
                <Route
                  path={ROUTES.COUPON_MANAGEMENT}
                  element={<CouponManagement />}
                />
                <Route
                  path={ROUTES.WITHDRAW_REQUEST_MANAGEMENT}
                  element={<WithdrawRequestManagement />}
                />
                <Route
                  path={`${ROUTES.WITHDRAW_REQUEST_DETAIL}/:id`}
                  element={<WithdrawDetail />}
                />
                <Route
                  path={ROUTES.REGISTER_SELL_MANAGEMENT}
                  element={<RegisterSellManagement />}
                />
                <Route
                  path={ROUTES.COUPON_MANAGEMENT}
                  element={<CouponManagement />}
                />
                <Route path={ROUTES.FAQ_MANAGEMENT}>
                  <Route
                    path={ROUTES.CREATE}
                    element={<CreateFaq status="create" />}
                  />
                  <Route path=":id" element={<FaqDetail />} />

                  <Route index element={<FaqManagement />} />
                </Route>

                <Route
                  path={ROUTES.COUPON_MANAGEMENT_CREATE}
                  element={<CreateCouponManagement />}
                />
                <Route
                  path={ROUTES.EVENT_MANAGEMENT_CREATE}
                  element={<CreateEvent />}
                />
                <Route
                  path={ROUTES.EVENT_MANAGEMENT_UPDATE}
                  element={<CreateEvent />}
                />
                <Route
                  path={ROUTES.ORDER_MANAGEMENT}
                  element={<OrderManagement />}
                />
                <Route
                  path={ROUTES.NAVIGATION_SET_UP_LIST}
                  element={<NavigationSetupList />}
                />
                <Route
                  path={`${ROUTES.NAVIGATION_SET_UP_DETAIL}/:id`}
                  element={<NavigationSetupDetail />}
                />
                <Route
                  path={ROUTES.ORDER_MANAGEMENT_DETAIL}
                  element={<OrderDetailManagement />}
                />

                <Route path={ROUTES.BANNER_MANAGEMENT}>
                  <Route element={<CreateBanner />} path={ROUTES.CREATE} />
                  <Route
                    path={ROUTES.BANNER_MANAGEMENT_DETAIL}
                    element={<BannerDetail />}
                  />

                  <Route index element={<BannerManagement />} />
                </Route>
                <Route
                  path={ROUTES.SHIPPING_FEE_SETUP}
                  element={<ShippingFeeSetUp />}
                />
                <Route
                  path={ROUTES.CLEARANCE_FEE_SETUP}
                  element={<ClearanceFeeSetUp />}
                />

                <Route
                  path={ROUTES.INQUIRY_MANAGEMENT}
                  element={<InquiryManagement />}
                />

                <Route
                  path={ROUTES.INQUIRY_MANAGEMENT_REPLY}
                  element={<InquiryManagementReply />}
                />
                <Route
                  path={ROUTES.INQUIRY_MANAGEMENT_VIEW}
                  element={<InquiryManagementView />}
                />
                <Route
                  path={ROUTES.REPORT_MANAGEMENT}
                  element={<ReportManagement />}
                />

                <Route
                  path={`${ROUTES.REGISTER_SELL_MANAGEMENT}/:id`}
                  element={<RegisterSellManagementDetail />}
                />
                <Route
                  path={`${ROUTES.COUPON_MANAGEMENT}/:id/view`}
                  element={<CouponManagementView />}
                />
                <Route
                  path={`${ROUTES.COUPON_MANAGEMENT_UPDATE(':id')}`}
                  element={<CouponUpdate />}
                />

                <Route
                  path={`${ROUTES.REGISTER_SELLER_MANAGEMENT}`}
                  element={<RegisterSellerManagement />}
                />
              </Route>
            </Route>

            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route
              path={ROUTES.SIGN_UP_WITH_EMAIL}
              element={<SignUpWithEmail />}
            />
            <Route path={ROUTES.SIGN_UP_WITH_SNS} element={<SignUpWithSNS />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
}
