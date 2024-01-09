import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import {
  PurchaseOrderType,
  ResponseListModelPurchaseOrder,
  UserResponseType,
  UserType,
} from 'interface/user';

const userService = {
  get: async (params: ObjectLiteral) => {
    return axiosInstance().get<never, ResponseListModel<UserType>>(
      ROUTE_API.USERS,
      {
        params,
      }
    );
  },

  getDetail: async (id: string) => {
    return axiosInstance().get<never, ResponseModel<UserResponseType>>(
      `${ROUTE_API.USERS}/${id}`
    );
  },

  getPurchaseOrder: async (id: string, filter: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModelPurchaseOrder>(
      `${ROUTE_API.PURCHASE_ORDER(id)}`,
      {
        params: filter,
      }
    );
  },

  getSoldOrder: async (id: string, filter: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModelPurchaseOrder>(
      `${ROUTE_API.SOLD_ORDER(id)}`,
      {
        params: filter,
      }
    );
  },
};

export default userService;
