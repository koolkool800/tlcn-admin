import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import {
  FilterWithdraw,
  ResultWithdrawTable,
  WithdrawDetailType,
} from 'interface/withdraw';

const withdrawService = {
  getWithdraw: async (params?: FilterWithdraw) => {
    return axiosInstance().get<
      ResultWithdrawTable,
      ResponseListModel<ResultWithdrawTable>
    >(ROUTE_API.WITHDRAW_GET_LIST, {
      params: params || {},
    });
  },
  getWithdrawDetail: async (id: string) => {
    return axiosInstance().get<never, ResponseModel<WithdrawDetailType>>(
      ROUTE_API.WITHDRAW_DETAIL(id)
    );
  },
  approvalWithdraw: async (id: string) => {
    return axiosInstance().post<never, ResponseModel<WithdrawDetailType>>(
      ROUTE_API.WITHDRAW_APPROVE(id)
    );
  },
};

export default withdrawService;
