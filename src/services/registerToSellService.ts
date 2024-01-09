import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import {
  RegisterToSellDetailType,
  RegisterToSellType,
} from 'interface/registerToSell';

const registerToSellService = {
  get: async (params: ObjectLiteral = {}, headers: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModel<RegisterToSellType>>(
      ROUTE_API.REGISTER_TO_SELL,
      {
        params,
        headers,
      }
    );
  },

  getFilter: async () => {
    return axiosInstance().get<never, ResponseModel<{ performers: string[] }>>(
      ROUTE_API.REGISTER_TO_SELL_FILTER
    );
  },

  approve: async (id: string) => {
    return axiosInstance().put(`${ROUTE_API.REGISTER_TO_SELL}/${id}`);
  },

  getDetail: async (id: string) => {
    return axiosInstance().get<
      never,
      ResponseModel<{ response: RegisterToSellDetailType }>
    >(ROUTE_API.TICKET_DETAIL(id));
  },
};

export default registerToSellService;
