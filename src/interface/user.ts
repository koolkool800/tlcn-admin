import { PaymentMethodLabel } from '@constants/codeConstants';
import { AddressType } from './address';
import { ResponseModel } from './response';

/** User type */
export type UserType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  email: string;
  accountType: string;
  role: string;
  avatar: string;
  phoneCode: string;
  phone: string;
  dob: string;
  level: number;

  addressDefault: AddressType;
};

export type UserResponseType = {
  user: UserType;
};

/** * Purchase order type  */
export type UserBuyerType = {
  createdAt: string;
  updatedAt: string;
  id: number;
};

export type UserEventType = Omit<UserBuyerType, 'id'> & {
  title: string;
};

export type PurchaseOrderType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  status: string;
  deliveryFee: number;
  totalPrice: number;
  totalDiscount: number;
  totalPayment: number;
  platformFee: number;
  paymentMethod: keyof typeof PaymentMethodLabel;
  cashReceiptType: string;
  cashReceipt: any;
  deliveryMethod: string;
  deliveryInformation: any;
  deliveryUnitInformation: any;
  paymentChannel: any;
  paymentRefId: any;
  buyer: UserBuyerType;
  seller: UserBuyerType;
  event: UserEventType;
};

export type ResponseListModelPurchaseOrder = Omit<
  ResponseModel<PurchaseOrderType>,
  'data'
> & {
  data: {
    data: PurchaseOrderType[];
    length: number;
    totalOrdersPrice: number;
  };
};
