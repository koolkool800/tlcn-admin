import { ObjectLiteral } from 'interface/general';

// TODO: listTransaction
export const LIST_TRANSACTION_MAP: { value: string; label: string }[] = [
  { label: 'PIN Transaction 1', value: '1' },
  { label: 'PIN Transaction 2', value: '2' },
  { label: 'PIN Transaction 3', value: '3' },
  { label: 'PIN Transaction 4', value: '4' },
];
export const TRANSACTION_CODE: { [value: string]: string } = {
  '1': 'PIN Transaction 1',
  '2': 'PIN Transaction 2',
  '3': 'PIN Transaction 3',
  '4': 'PIN Transaction 4',
};
// TODO: listDelivery
export const LIST_DELIVERY_MAP: { value: string; label: string }[] = [
  { label: 'Payment completed 1', value: '1' },
  { label: 'Payment completed 2', value: '2' },
  { label: 'Payment completed 3', value: '3' },
  { label: 'Payment completed 4', value: '4' },
];
export const DELIVERY_CODE: { [value: string]: string } = {
  '1': 'Payment completed 1',
  '2': 'Payment completed 2',
  '3': 'Payment completed 3',
  '4': 'Payment completed 4',
};

export const LOCAL_STORE = {
  LANG: 'language',
  LANG_DEFAULT: 'en',
};

export const REGEX = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE_NUMBER: /^(?!0)\d{1,9}$/,
};

export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
};

export const BrowserStore = {
  token: 'token',
};

export const DELIVERY_METHOD: {
  SELLER_SHIPMENT: 'SELLER_SHIPMENT';
  PIN_TRANSACTION: 'PIN_TRANSACTION';
  // ONSITE_TRANSACTION: 'ONSITE_TRANSACTION';
} = {
  SELLER_SHIPMENT: 'SELLER_SHIPMENT',
  PIN_TRANSACTION: 'PIN_TRANSACTION',
  // ONSITE_TRANSACTION: 'ONSITE_TRANSACTION',
};

export const TRANSACTION_METHOD: ObjectLiteral = {
  PIN_TRANSACTION: 'PIN Transaction',
  SELLER_SHIPMENT: 'Seller Shipment',
  ONSITE_TRANSACTION: 'Onsite Transaction',
};

export enum PaymentMethodLabel {
  CREDIT_CARD = 'Credit card',
  VIRTUAL_ACCOUNT = 'Virtual account',
  KAKAO_PAY = 'Kakao pay',
  NAVER_PAY = 'Naver pay',
  PAYPAL = 'Paypal',
}

export const SNS_STATE = {
  SIGN_IN_NAVER: '1000',
  SIGN_UP_NAVER: '1001',
  SIGN_IN_KAKAO: '1002',
  SIGN_UP_KAKAO: '1003',
  SIGN_IN_APPLE: '1004',
  SIGN_UP_APPLE: '1005',
};

export enum UserManagementTableType {
  PURCHASE = 'purchase',
  SOLD = 'sold',
}

export const ConcertType = [
  { value: 'CONCERT', label: 'Concert' },
  { value: 'SPORT', label: 'Sport' },
  { value: 'ARTGALLERY', label: 'Art gallery' },
  { value: 'OTHER', label: 'Other' },
];
export enum OrderStatusLabel {
  PAYMENT_PENDING = 'Payment pending',
  PAYMENT_COMPLETED = 'Payment completed',
  SENT_PIN = 'Sent PIN',
  SENT_DELIVERY_UNIT = 'Sent delivery unit',
  DELIVERY_UNIT_RECEIVED = 'Delivery unit received',
  DELIVERY_UNIT_COMPLETED_CHECKING = 'Delivery unit completed checking',
  DELIVERY_COMPLETED = 'Delivery completed',
  TRANSACTION_COMPLETED = 'Transaction completed',
  CANCEL = 'Cancel',
}

export enum EventTypeLabel {
  CONCERT = 'Concert',
  SPORT = 'Sport',
  CLEARANCE = 'Clearance',
  ARTGALLERY = 'Art gallery',
  OTHER = 'Other',
}

export enum VoucherConditionLabel {
  MAX_VALUE_DISCOUNT = 'Max value discount',
  ORDER_VALUE = 'Order value',
  AMOUNT_PURCHASE_USER = 'Amount purchase user',
}

export enum VoucherTypeLabel {
  PERCENT = 'Percent',
  MONEY = 'money',
}

export enum VoucherCategoryLabel {
  DISCOUNT_DELIVERY_FREE = 'Discount delivery free',
  DISCOUNT_COMMISSION = 'Discount commission',
  DISCOUNT_TOTAL_ORDER_VALUE = 'Discount total order value',
  DISCOUNT_UNIT_PRICE = 'Discount unit price',
  DISCOUNT_FIXED_VALUE = 'Discount fixed value',
}

export const ConditionOperator = ['=', '>', '<', '<=', '>='] as const;

export enum TicketStatusLabel {
  PENDING = 'Pending',
  IS_LISTING = 'Listing',
  CANCEL = 'Cancel',
  EXPIRED = 'Expired',
  HOLD = 'Hold',
  PAYMENT_COMPLETED = 'Payment completed',
  PAYMENT_FAILED = 'Payment failed',
  TRANSACTION_COMPLETED = 'Transaction completed',
}
export const ROLE = {
  ADMIN: 'ADMIN',
};

export enum CategoryBanner {
  PRIMARY = 'PRIMARY',
  SUB = 'SUB',
}
export enum EventStatusLabel {
  ACTIVE = 'Active',
  ENDED = 'Ended',
}

export const EVENT_TYPE: { [value: string]: string } = {
  CONCERT: 'CONCERT',
  SPORT: 'SPORT',
  FREEMARKET: 'FREEMARKET',
  ART_GALLERY: 'ARTGALLERY',
  OTHER: 'OTHER',
};
export const STATUS: { [key: string]: string } = {
  APPROVED: 'Success',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
};
export const STATUS_KEY: { [key: string]: string } = {
  Success: 'APPROVED',
  Pending: 'PENDING',
  Rejected: 'REJECTED',
};
export const STATUS_COLOR: { [key: string]: string } = {
  APPROVED: 'success',
  PENDING: 'pending',
  REJECTED: 'rejected',
};
export enum InquiryStatus {
  PENDING = 'PENDING',
  REPLY = 'REPLY',
}

export enum InquiryStatusLabel {
  PENDING = 'Pending',
  REPLIED = 'Replied',
}
