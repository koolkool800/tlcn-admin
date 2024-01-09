import { OrderStatusLabel, PaymentMethodLabel } from '@constants/codeConstants';
import { EventType } from './event';
import { AddressType } from './address';

export type OrderBaseCategoryType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  email: string;
  accountType: string;
  role: string;
  avatar: string;
  phoneCode: any;
  phone: string;
  dob: any;
  addressDefault: AddressType;
};

export type OrderTicketCategoryType = OrderBaseCategoryType & {
  seatQuantity: number;
};

export type OrderType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  status: keyof typeof OrderStatusLabel;
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
  event: EventType;
  seller: OrderBaseCategoryType;
  buyer: OrderBaseCategoryType;
  ticket: OrderTicketCategoryType;
  commissionFee: number;

  deliveryUnitSellerToResellInfor: {
    unitName: string;
    deliveryCode: string;
  };
  deliveryUnitResellToBuyer: {
    unitName: string;
    deliveryCode: string;
  };
};

export type OrderResponseType = OrderType;

export type FilterOrderResponseType = {
  [key: string]: string[];
};
