import { STATUS } from '@constants/codeConstants';
import { ObjectLiteral } from './general';

export type FilterWithdraw =
  | {
      offset: number;
      limit: number;
      createdAt: string;
      keyword: string;
      statuses: keyof typeof STATUS;
    }
  | ObjectLiteral;

export interface ResultWithdrawTable {
  id: number;
  userId: number;
  currentBalance: number;
  withdrawalAmount: number;
  requestDate: string;
  bank: string;
  accountNumber: string;
  status: string;
}
export type FormWithdraw = Omit<FilterWithdraw, 'offset' | 'limit'>;

export type WithdrawDetailType = {
  requestId: string;
  requestTime: string;
  withdrawAmount: string;
  bankName: string;
  accountNumber: string;
  userId: string;
  userName: string;
  phoneNumber: string;
  email: string;
  address: string;
  currentBalance: string;
  status: string;
};
