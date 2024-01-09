import {
  ConditionOperator,
  VoucherCategoryLabel,
  VoucherConditionLabel,
  VoucherTypeLabel,
} from '@constants/codeConstants';
import { Dayjs } from 'dayjs';

export type CouponResponseType = {
  id: number;
  name: string;
  quantity: number;
  remainQuantity: number;
  code: string;
  voucherCategory: keyof typeof VoucherCategoryLabel;
  type: keyof typeof VoucherTypeLabel;
  discount: number;
  startDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  conditions: Condition[];
  description: string;
  amountPurchaseUser: number;
  orderValue: number;
  maxDiscount: number;
  applyForSeller?: boolean;
};

export type Condition = {
  name: keyof typeof VoucherConditionLabel;
  operator: (typeof ConditionOperator)[number];
  value: number | null;
};

export type FormCouponType = Pick<
  CouponResponseType,
  'name' | 'quantity' | 'voucherCategory' | 'type' | 'discount' | 'conditions'
> & {
  startDate: Dayjs | null | string;
  expiredDate: Dayjs | null | string;
};

export const initialValueCondition: Condition = {
  name: 'ORDER_VALUE',
  operator: '=',
  value: 0,
};

export const initialValueFormCoupon: FormCouponType = {
  name: '',
  quantity: 0,
  voucherCategory: 'DISCOUNT_COMMISSION',
  type: 'MONEY',
  discount: 0,
  startDate: null,
  expiredDate: null,
  conditions: [
    {
      ...initialValueCondition,
    },
  ],
};
