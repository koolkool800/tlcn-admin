const adminPrefix = '/admin';
const filePrefix = '/files';
export const ROUTES = {
  ALL: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  CREATE: 'create',
  SIGN_UP_WITH_EMAIL: '/sign-up-email',
  SIGN_UP_WITH_SNS: '/sign-up-sns',
  FORGOT_PASSWORD: '/forgot-password',
  EVENT_MANAGEMENT: '/event-management',
  DETAIL_MANAGEMENT: '/event-management/:id',
  USER_MANAGEMENT: '/user-management',
  USER_MANAGEMENT_DETAIL: '/user-management/:id',
  TOP_EVENT_SET_UP: '/top-event-set-up',
  WITHDRAW_REQUEST_MANAGEMENT: '/withdraw-request-management/list',
  WITHDRAW_REQUEST_DETAIL_PATTERN: '/withdraw-request-management/detail/:id',
  WITHDRAW_REQUEST_DETAIL: '/withdraw-request-management/detail',
  REGISTER_SELL_MANAGEMENT: '/register-sell-management',
  REGISTER_SELL_MANAGEMENT_DETAIL: '/register-sell-management/:id',
  COUPON_MANAGEMENT: '/coupon-management',
  FAQ_MANAGEMENT: '/faq-management',
  FAQ_MANAGEMENT_DETAIL: '/faq-management/:id',
  COUPON_MANAGEMENT_CREATE: '/coupon-management/create',
  COUPON_MANAGEMENT_VIEW: '/coupon-management/:id/view',
  COUPON_MANAGEMENT_UPDATE: (id: string) => `/coupon-management/${id}/update`,
  EVENT_MANAGEMENT_CREATE: '/event-management/create',
  EVENT_MANAGEMENT_UPDATE: '/event-management/update/:id',
  ORDER_MANAGEMENT: '/order-management',
  NAVIGATION_SET_UP_LIST: '/navigation-set-up/list',
  NAVIGATION_SET_UP_DETAIL: '/navigation-set-up/detail',
  NAVIGATION_SET_UP_DETAIL_PATTERN: '/navigation-set-up/detail/:id',
  ORDER_MANAGEMENT_DETAIL: '/order-management/:id',
  BANNER_MANAGEMENT: '/banner-management',
  BANNER_MANAGEMENT_DETAIL: '/banner-management/:id',
  BANNER_MANAGEMENT_CREATE: '/banner-management/create',
  CLEARANCE_FEE_SETUP: '/clearance-fee-setup',
  SHIPPING_FEE_SETUP: '/shipping-fee-setup',
  INQUIRY_MANAGEMENT: '/inquiry-management',
  INQUIRY_MANAGEMENT_VIEW: '/inquiry-management/:id/view',
  INQUIRY_MANAGEMENT_REPLY: '/inquiry-management/:id/reply',
  REPORT_MANAGEMENT: '/report-management',
  DASHBOARD: '/',
  REGISTER_SELLER_MANAGEMENT: '/register-seller-management',
};

export const ROUTE_API = {
  LOGIN: '/auth/sign-in',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  SIGN_UP: '/auth/sign-up',
  GET_INFO_KAKAO: '/auth/get-info-by-auth-code',
  CHANGE_PASSWORD: '/auth/change-password',
  LOGIN_SNS: '/auth/sign-in-sns',
  TOP_EVENT: `${adminPrefix}/events/list-top-event`,
  GET_EVENTS_FOR_TOP_EVENTS: `${adminPrefix}/events/for-select-top`,
  CONFIG_TOP_EVENT: `${adminPrefix}/events/config-top-event`,

  FAQ: `${adminPrefix}/faqs`,
  FAQ_CATEGORIES: `faqs/categories`,
  BANNER: `${adminPrefix}/banners`,
  BANNER_DETAIL: `banners`,
  BANNER_UPDATE_LIST: `${adminPrefix}/banners/many`,

  USERS: `${adminPrefix}/users`,
  VOUCHER: `${adminPrefix}/voucher`,
  EVENT: `${adminPrefix}/events`,
  UPDATE_EVENT: `${adminPrefix}/events/:id`,
  EVENT_DETAIL: `${adminPrefix}/events/:id`,
  TRADING_VOLUME: `${adminPrefix}/events/:id/trading-volume`,
  PURCHASE_ORDER: (userId: string) =>
    `${adminPrefix}/users/${userId}/purchase-orders`,
  SOLD_ORDER: (userId: string) => `${adminPrefix}/users/${userId}/sold-orders`,

  ORDER: '/admin/orders/get-all',
  ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,
  ORDER_FILTER: '/admin/orders/filter-for-get-all',

  FILE_BANNER: `${filePrefix}/banner/upload-picture`,
  REGISTER_TO_SELL: '/admin/tickets',
  REGISTER_TO_SELL_FILTER: '/admin/tickets/filter-options',
  PLATFORM_FEE: '/shipping-fee',
  CLEARANCE_FEE: '/fee-clearance',
  SHIPPING_FEE: '/shipping-fee',
  EVENT_FILTER: '/events/filters',
  GET_NAVIGATION: '/navigation-categories/get-list',
  UPDATE_NAVIGATION: '/admin/navigation-categories/update',
  NAVIGATION_DETAIL: (id: string) => `/admin/navigation-categories/${id}`,
  GET_LIST_EVENT_NAVIGATION_DETAIL: '/admin/events/get-list-for-nav-cate',
  WITHDRAW_GET_LIST: '/admin/withdrawal-requests/get-list',
  WITHDRAW_APPROVE: (withDrawId: string) =>
    `admin/withdrawal-requests/${withDrawId}/approve`,
  WITHDRAW_DETAIL: (withDrawId: string) =>
    `admin/withdrawal-requests/${withDrawId}`,
  INQUIRY: '/admin/inqueries/get-list',
  INQUIRY_DETAIL: '/admin/inqueries',
  REPORT_ORDER: '/admin/report-order',
  TICKET_DETAIL: (ticketId: string | number) =>
    `/admin/tickets/register-sell-detail/${ticketId}`,

  VOUCHER_DETAIL: '/admin/voucher',

  REQUEST_PENDING: '/admin/dashboard/statistics/general-data',
  GET_HIGHEST_REVENUE: '/admin/dashboard/statistics/revenue-by-event',
  GET_REVENUE_DASHBOARD: '/admin/dashboard/statistics/revenue-by-day',
  GET_REGISTER_SELLER: '/admin/users/business-registration-requests',
  UPDATE_REGISTER_SELLER: (requestId: string) =>
    `/admin/users/business-registration-requests/${requestId}`,
};
